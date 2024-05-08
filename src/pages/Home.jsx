import Chart from "../components/Chart";
import Info from "../components/Info";
import Transactions from "../components/Transactions";
import Transfer from "../components/Transfer";
import useUserStore from "../store/useUserStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const { currentUser, isLoading, setUserInfo } = useUserStore();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      onSnapshot(doc(db, "users", user.uid), (res) => {
        setUserInfo(res.data());
      });
    });
    return () => {
      unSub();
    };
  }, [setUserInfo]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="p-2 flex flex-col lg:flex-row gap-6">
        <div className="block lg:hidden">
          <div className="stat my-4 animate-bounceIn">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src={currentUser?.img} />
                </div>
              </div>
            </div>
            <div className="stat-value">{currentUser?.username}</div>
            <div className="stat-title text-base-content text-wrap mt-2">
              Welcome <strong>{currentUser?.username.split(" ")[0]}</strong> how
              can we help you today
            </div>
          </div>
          <Info />
        </div>
        <Transfer />
        <div className="flex-[2] p-2">
          <div className="hidden lg:block">
            <Info />
          </div>
          <Chart />
          <Transactions />
        </div>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}
