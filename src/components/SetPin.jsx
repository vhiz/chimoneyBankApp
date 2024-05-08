import { collection, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";
import { db } from "../lib/firebase";
import bcrypt from "bcryptjs";

export default function SetPin() {
  const [pin, setPin] = useState();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserStore();
  async function handlePin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const userRef = collection(db, "users");
      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(pin, salt);
      await updateDoc(doc(userRef, userInfo.id), {
        pin: hashedPin,
      });
      document.getElementById("setPin").close();
      toast.success("Successfully set pin");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="modal-box">
      {userInfo.pin && (
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      )}
      <h2 className="text-2xl">Set your transaction pin</h2>
      <form
        action=""
        className="flex flex-col gap-3 items-center mt-4"
        onSubmit={handlePin}
      >
        <input
          type="number"
          minLength={4}
          maxLength={4}
          className="input w-full input-bordered input-sm"
          onChange={(e) => setPin(e.target.value)}
          required
        />
        <button className="btn btn-error w-full rounded-sm" disabled={loading}>
          {loading ? (
            <span className="loading loading-bars loading-xs"></span>
          ) : (
            "Set Pin"
          )}
        </button>
      </form>
    </div>
  );
}
