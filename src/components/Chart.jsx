import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { GiNetworkBars } from "react-icons/gi";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../axios";
import { count } from "../utils/utils";

export default function Chart() {
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

  return (
    <div className="w-full lg:h-[40vh] h-[20vh] mt-4 animate-fadeInUp animate-delay-[1s]">
      <div className="flex w-full justify-between items-center">
        <h2 className="lg:text-2xl text-lg">Money Flow</h2>
        <div className="">
          <div className="bg-primary text-white w-7 h-7 rounded-md flex items-center justify-center">
            <GiNetworkBars className="" />
          </div>
        </div>
      </div>
      {isLoading || error ? (
        <div className="skeleton mt-4 lg:h-[40vh] h-[30vh] w-full"></div>
      ) : (
        <div className="shadow-md rounded-md mt-4 bg-base-200 w-full h-[90%] p-4">
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <LineChart width={300} height={100} data={count(data, userInfo)}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
              ></Tooltip>
              <XAxis dataKey={"name"} />
              <Line
                type="monotone"
                dataKey={"amount"}
                stroke="gray"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
