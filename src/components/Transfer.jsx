import { useState } from "react";
import Atm from "./Atm";
import Pin from "./Pin";
import Send from "./Send";
import SendPhone from "./SendPhone";

export default function Transfer() {
  const [transfer, setTransfer] = useState("email");
  return (
    <div className="flex-1 lg:sticky top-0 lg:h-screen animate-fadeInUp animate-duration-[1s]">
      <Atm />

      <h2 className="lg:text-2xl text-lg">Send Money</h2>
      <div className="w-full">
        <div className="my-2 flex-1 flex">
          <button
            className={`btn ${transfer === "email" ? "btn-active" : ""} `}
            onClick={() => setTransfer("email")}
          >
            Email
          </button>
          <button
            className={`btn ${transfer === "phone" ? "btn-active" : ""} `}
            onClick={() => setTransfer("phone")}
          >
            Phone
          </button>
        </div>
        {transfer === "email" ? <Send /> : <SendPhone />}
      </div>
      <dialog id="inputPin" className="modal">
        <Pin />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
