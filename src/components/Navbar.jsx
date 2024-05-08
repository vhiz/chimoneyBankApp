import { CiBellOn, CiSearch } from "react-icons/ci";
import Toggle from "./Toogle";
import { auth } from "../lib/firebase";
import useUserStore from "../store/useUserStore";
import AddImage from "./AddImage";

export default function Navbar() {
  const { userInfo, setCurrentUser } = useUserStore();

  return (
    <div className="navbar bg-base-200 sticky top-0 z-50 h-16">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Chimoney</a>
      </div>
      <div className="flex-none">
        <Toggle />
        <button className="btn btn-ghost btn-circle">
          <CiSearch className="text-xl" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <CiBellOn className="text-xl" />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={userInfo.img} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button
                onClick={() => document.getElementById("addImage").showModal()}
                className="justify-between"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => document.getElementById("setPin").showModal()}
              >
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  auth.signOut();
                  setCurrentUser(null);
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <dialog id="addImage" className="modal">
        <AddImage />
        <form method="dialog" className="modal-backdrop glass">
          <button>Esc</button>
        </form>
      </dialog>
    </div>
  );
}
