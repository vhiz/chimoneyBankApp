import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import AllTransactions from "./AllTransactions";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../axios";
import useUserStore from "../store/useUserStore";
import moment from "moment";
import UserInfo from "./UserInfo";
import { addCommas } from "../utils/utils";

export default function Transactions() {
  const { userInfo } = useUserStore();

  const { isLoading, error, data } = useQuery({
    queryKey: ["transactions", userInfo],
    queryFn: async () =>
      await apiRequest
        .post(`/accounts/transactions`, { subAccount: userInfo.id })
        .then((res) => {
          return res.data.data;
        }),
  });
  const calculateIncomeAndOutcome = (transactions) => {
    let income = 0;
    let outcome = 0;

    transactions.forEach((transaction) => {
      if (transaction.receiver === userInfo.id) {
        income += parseInt(transaction.valueInUSD);
      } else {
        outcome += parseInt(transaction.valueInUSD);
      }
    });

    return { income:addCommas(income), outcome:addCommas(outcome) };
  };
  return (
    <div className="mt-9 animate-fadeInUp animate-delay-[1.2s]">
      <div className="flex items-center justify-between w-full">
        <h2 className="lg:text-2xl text-lg">Recent Transactions</h2>
        <button
          className="btn-link btn"
          onClick={() => document.getElementById("allTransactions").showModal()}
        >
          view all
        </button>
      </div>
      {isLoading ? (
        <div className="skeleton w-full h-[40vh]"></div>
      ) : error ? (
        <div className="w-full h-[50vh] flex items-center justify-center">
          <h2 className="text-4xl opacity-70">Something went wrong</h2>
        </div>
      ) : (
        <div className="bg-base-200 shadow-md w-full p-3">
          {data.length < 1 ? (
            <div className="w-full h-[40vh]  items-center justify-center">
              <img
                src="/noTransaction.png"
                alt=""
                className="w-full h-full object-contain opacity-70"
              />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="p-2 flex items-center gap-5">
                  <div className="flex gap-2 items-center text-green-500">
                    <span className="lg:text-lg text-xs">Income</span>
                    <GiReceiveMoney className="lg:text-2xl" />
                    <p className="text-xs lg:text-base">
                      ${calculateIncomeAndOutcome(data).income}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-red-600">
                    <span className="lg:text-lg text-xs">Outcome</span>
                    <GiPayMoney className="lg:text-2xl" />
                    <p className="text-xs lg:text-base">
                      ${calculateIncomeAndOutcome(data).outcome}
                    </p>
                  </div>
                </div>
                
              </div>
              <div className="overflow-x-auto">
                <table className="table table-sm lg:table-md">
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
                      .sort(
                        (a, b) =>
                          new Date(b.paymentDate) - new Date(a.paymentDate)
                      )
                      .slice(0, 4)
                      .map((transaction) => (
                        <tr key={transaction.id}>
                          <UserInfo transaction={transaction} />
                          <td className="text-xs">
                            {moment(transaction.paymentDate).format(
                              "MMM Do, YY h:mm:ss a"
                            )}
                          </td>
                          <td className="text-xs">
                            {transaction.issuer.slice(0, 5) + "xxxxxxxx"}
                          </td>
                          <td
                            className={`text-xs ${
                              transaction.receiver === userInfo.id
                                ? "text-success"
                                : "text-error"
                            }`}
                          >
                            ${transaction.valueInUSD}
                          </td>
                          <td className="">
                            <span
                              className={`p-1 text-xs  ${
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
      )}
      <dialog id="allTransactions" className="modal">
        <AllTransactions />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
