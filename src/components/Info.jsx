import useUserStore from "../store/useUserStore";
import { addCommas } from "../utils/utils";

export default function Info() {
  const { currentUser, userInfo } = useUserStore();
  return (
    <div className="stats bg-base-200 w-full animate-fadeInRight">
      <div className="stat">
        <div className="stat-title">Account balance</div>
        <div className="text-xl lg:text-3xl font-bold">
          ${addCommas(userInfo.balance)}
        </div>
        <div className="stat-actions">
          <button className="btn btn-xs lg:btn-sm btn-success">
            Add funds
          </button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Current balance</div>
        <div className="text-xl lg:text-3xl font-bold">
          ${addCommas(userInfo.balance)}
        </div>
        <div className="flex gap-2">
          <button className="btn btn-xs btn-primary lg:btn-sm">
            Withdrawal
          </button>
          <button className="btn btn-xs btn-primary lg:btn-sm">Deposit</button>
        </div>
      </div>
      <div className="stat hidden lg:inline-grid">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="xl:w-16 w-12 rounded-full">
              <img src={currentUser.img} />
            </div>
          </div>
        </div>
        <div className="xl:stat-value font-bold">{currentUser.username}</div>
        <div className="xl:stat-title text-base-content text-wrap text-xs">
          Welcome <strong>{currentUser?.username.split(" ")[0]}</strong> how can
          we help you today
        </div>
      </div>
    </div>
  );
}
