import { useState } from "react";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useTransferStore from "../store/useTransferStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../axios";
import useUserStore from "../store/useUserStore";
import toast from "react-hot-toast";
import bcrypt from "bcryptjs";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Pin() {
  const [password, setPassword] = useState(false);
  const { userInfo } = useUserStore();
  const { details } = useTransferStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return apiRequest.post("/payouts/wallet", {
        subAccount: userInfo.id,
        wallets: [{ receiver: details.id, valueInUSD: details.amount }],
        turnOffNotification: true,
      });
    },
    onSuccess: async (res) => {
      await updateDoc(
        doc(collection(db, "users"), res.data.data.data[0].receiver),
        {
          balance:
            parseInt(userInfo.balance) +
            parseInt(res.data.data.data[0].valueInUSD),
        }
      );
      await updateDoc(
        doc(collection(db, "users"), res.data.data.data[0].issuer),
        {
          balance:
            parseInt(userInfo.balance) -
            parseInt(res.data.data.data[0].valueInUSD),
        }
      );
      queryClient.invalidateQueries({ queryKey: ["transactions", userInfo] });

      document.getElementById("inputPin").close();
      toast.success("Money Sent");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  async function handleTransfer(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const password = formData.get("password");
      const verified = await bcrypt.compare(password, userInfo.pin);
      if (!verified) {
        toast.error("Enter valid pin");
        return;
      } else {
        mutation.mutate();
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="modal-box">
      <h2 className="text-xl font-semibold">Checkout</h2>
      <div className="flex flex-col items-center w-full">
        <h3 className="font-semibold text-lg">
          You are making transfers of <strong>${details?.amount}</strong> to:
        </h3>
        <div className="w-full flex flex-col gap-3 my-4">
          <div className="flex items-center gap-x-2 w-full justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="lg:w-14 w-12 rounded-full">
                  <img src={details?.img} />
                </div>
              </div>
              <span>{details?.username}</span>
            </div>
          </div>

          <form onSubmit={handleTransfer}>
            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaUnlockKeyhole className="opacity-70 w-4 h-4" />
              <input
                type={password ? "text" : "password"}
                placeholder="Type here"
                className="grow"
                name="password"
                required
              />
              <div
                className="btn btn-ghost btn-circle btn-sm opacity-70"
                onClick={() => setPassword((prev) => !prev)}
              >
                {password ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </div>
            </label>
            <button
              disabled={mutation.isPending}
              className="btn btn-error w-full mt-2"
            >
              {mutation.isPending ? (
                <span className="loading loading-bars loading-xs"></span>
              ) : (
                "Send"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
