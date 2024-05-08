import { IoLogoIonitron } from "react-icons/io";
import { FaWhatsapp, FaXTwitter, FaYoutube } from "react-icons/fa6";
import SetPin from "./SetPin";
import useUserStore from "../store/useUserStore";
import { useEffect } from "react";
export default function Footer() {
  const { userInfo, isLoading } = useUserStore();
  useEffect(() => {
    if(!userInfo) return
    if (!userInfo.pin && !isLoading) {
      document.getElementById("setPin").showModal();
    }
  }, [isLoading, userInfo]);
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <aside className="items-center grid-flow-col">
        <IoLogoIonitron className="text-4xl" />
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <button className="btn btn-ghost btn-circle">
          <FaXTwitter />
        </button>
        <button className="btn btn-ghost btn-circle">
          <FaYoutube />
        </button>
        <button className="btn btn-ghost btn-circle">
          <FaWhatsapp />
        </button>
        <dialog id="setPin" className="modal">
          <SetPin />
          <div className="modal-backdrop glass"></div>
        </dialog>
      </nav>
    </footer>
  );
}
