import { RiVisaLine } from "react-icons/ri";
import useUserStore from "../store/useUserStore";

export default function Atm() {
  const {currentUser} = useUserStore()

  return (
    <div className="p-2 flex flex-col gap-y-2 text-white">
      <h2 className="lg:text-2xl text-lg">My Card</h2>
      <div className="lg:w-[35vw] lg:h-[30vh] h-[25vh] bg-neutral rounded-md p-5 heropattern-topography-slate-600 relative">
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="font-thin text-sm">Name</span>
            <span className="font-semibold">{currentUser?.username}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-thin text-sm">{currentUser.phone}</span>
            <span className="font-semibold">{currentUser.email}</span>
          </div>
        </div>
        <RiVisaLine className="absolute right-7 bottom-5 text-6xl"/>
      </div>
    </div>
  );
}
