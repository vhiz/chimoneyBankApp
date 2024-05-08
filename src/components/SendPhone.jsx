import { PlusIcon } from "@heroicons/react/16/solid";
import { collection, getDocs, query, where } from "firebase/firestore";
import { BiSend } from "react-icons/bi";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";
import { useState } from "react";
import useUserStore from "../store/useUserStore";
import useTransferStore from "../store/useTransferStore";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function SendPhone() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();
  const { setDetails } = useTransferStore();
  const [phone, setPhone] = useState();

  function handleSend(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get("amount");
    if (userInfo.balance < parseInt(amount)) {
      toast.error("Insufficient Balance");
      return;
    }
    setDetails({ ...user, amount });
    document.getElementById("inputPin").showModal();
    setUser(null);
  }

  async function handleSearch(e) {
    e.preventDefault();
    if (!phone) {
      toast.error("Enter phone number");
      return;
    }
    setUser(null);
    try {
      setLoading(true);
      const userRef = collection(db, "users");
      const users = query(userRef, where("phone", "==", phone));
      const querySnapShot = await getDocs(users);
      if (!querySnapShot.empty) {
        if (querySnapShot.docs[0].data().id === userInfo.id) {
          toast.error("You cant send money to yourself");
          return;
        }
        const { img, username, id } = querySnapShot.docs[0].data();
        setUser({ username, img, id });
        setPhone("");
      } else {
        toast.error("no user found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-5 rounded-md">
      <div className="shadow-md bg-base-200 p-4 ml-2">
        <h2 className="lg:text-xl my-2 text-lg">Search with Phone Number</h2>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 w-full items-center"
        >
          <label className="form-control w-full">
            <PhoneInput
              placeholder="E.g. '+234....'"
              value={phone}
              onChange={setPhone}
            />
          </label>
          <button
            className="btn btn-circle btn-info text-white btn-sm lg:btn-md"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-bars loading-xs"></span>
            ) : (
              <PlusIcon className="size-4" />
            )}
          </button>
        </form>
        <div className="my-5 flex flex-col gap-4">
          {user && (
            <form className="flex items-center gap-3" onSubmit={handleSend}>
              <div className="avatar">
                <div className="w-9 rounded-full">
                  <img src={user.img} />
                </div>
              </div>
              <div className="flex flex-col justify-center gap-1 w-full">
                <span className="text-xs">{user.username}</span>
                <div className="w-full flex items-center">
                  <input
                    type="number"
                    className="input w-full  input-sm"
                    placeholder="Enter Amount"
                    name="amount"
                    min={100}
                    required
                  />
                  <button className="btn btn-sm btn-ghost btn-circle">
                    <BiSend />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
