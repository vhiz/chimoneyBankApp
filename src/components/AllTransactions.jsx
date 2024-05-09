import { useQuery } from "@tanstack/react-query";
import apiRequest from "../axios";
import useUserStore from "../store/useUserStore";
import { IoFilterOutline } from "react-icons/io5";
import moment from "moment";
import { useState } from "react";
import UserInfo from "./UserInfo";

export default function AllTransactions() {
  const { userInfo } = useUserStore();
  const [type, setType] = useState("success");

  const { isLoading, error, data } = useQuery({
    queryKey: ["transactions", userInfo],
    queryFn: async () =>
      await apiRequest
        .post(`/accounts/transactions`, { subAccount: userInfo.id })
        .then((res) => {
          return res.data.data;
        }),
  });
  return (
    <div className="modal-box max-h-[100vh] w-[100vw] min-h-[30vh] max-w-screen-xl animate-fadeInUp">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 lg:hidden">
          ✕
        </button>
      </form>

      {isLoading ? (
        <div className="skeleton w-full h-[50vh]"></div>
      ) : error ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <h2 className="text-4xl opacity-70">Something went wrong</h2>
        </div>
      ) : data.length < 1 ? (
        <div className="w-full h-[50vh]  items-center justify-center">
          <img
            src="/noTransaction.png"
            alt=""
            className="w-full h-full object-contain opacity-70"
          />
        </div>
      ) : (
        <>
          <div className="dropdown dropdown-end absolute right-20 top-0 z-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-md "
            >
              <IoFilterOutline />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <span
                  className="btn mt-2 btn-sm btn-success btn-outline"
                  onClick={() => setType("success")}
                >
                  success
                </span>
              </li>
              <li>
                <span
                  className="btn mt-2 btn-sm btn-warning btn-outline"
                  onClick={() => setType("pending")}
                >
                  pending
                </span>
              </li>
              <li>
                <span
                  className="btn mt-2 btn-sm btn-error btn-outline"
                  onClick={() => setType("failed")}
                >
                  failed
                </span>
              </li>
            </ul>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-xs lg:table-md">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Account No</th>
                  <th>Transaction</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((transaction) => transaction.deliveryStatus === type)
                  .sort(
                    (a, b) => new Date(b.paymentDate) - new Date(a.paymentDate)
                  )
                  .map((transaction) => (
                    <tr key={transaction.id}>
                      <UserInfo transaction={transaction} />
                      <td className="text-sm">
                        {moment(transaction.paymentDate).format(
                          "MMM Do, YY h:mm:ss a"
                        )}
                      </td>
                      <td className="text-sm">
                        {transaction.receiver===userInfo.id?transaction.issuer.slice(0, 5) + "xxxxxxxx": transaction.receiver.slice(0,5)+"xxxxxxxx" }
                      </td>
                      <td
                        className={`text-sm ${
                          transaction.receiver === userInfo.id
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        ${transaction.valueInUSD}
                      </td>
                      <td className="">
                        <span
                          className={`p-1 text-sm  ${
                            transaction.deliveryStatus === "success"
                              ? "bg-success/40 text-success"
                              : transaction.deliveryStatus === "pending"
                              ? "animate-pulse bg-warning/40 text-warning"
                              : "bg-error/40 text-error"
                          } rounded`}
                        >
                          {transaction.deliveryStatus === "success"
                            ? "Success"
                            : transaction.deliveryStatus === "pending"
                            ? "Pending"
                            : "Error"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
