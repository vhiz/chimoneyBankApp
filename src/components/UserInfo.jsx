import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUserStore from "../store/useUserStore";

export default function UserInfo({ transaction }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserStore();

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        if (userInfo.id === transaction.receiver) {
          const res = await getDoc(doc(db, "users", transaction.issuer));
          if (res.exists()) {
            const { username, img } = res.data();
            setUser({ username, img });
            setLoading(false);
          } else {
            setUser({
              username: "Admin",
              img: "https://avatar.iran.liara.run/username?username=Admin",
            });
            setLoading(false);
          }
        } else {
          const res = await getDoc(doc(db, "users", transaction.receiver));
          if (res.exists()) {
            const { username, img } = res.data();
            setUser({ username, img });
            setLoading(false);
          } else {
            setUser({
              username: "Admin",
              img: "https://avatar.iran.liara.run/username?username=Admin",
            });
            setLoading(false);
          }
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    getUser();
  }, [transaction, userInfo]);

  return (
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          {loading ? (
            <div className="mask mask-squircle w-6 h-6 skeleton"></div>
          ) : (
            <div className="mask mask-squircle w-6 h-6">
              <img src={user.img} />
            </div>
          )}
        </div>
        <div>
          {loading ? (
            <div className="skeleton h-3 w-9"></div>
          ) : (
            <div className="font-bold text-xs">{user.username}</div>
          )}
        </div>
      </div>
    </td>
  );
}
