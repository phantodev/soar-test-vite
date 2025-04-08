import { FC } from "react";

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: "deposit-card" | "paypal" | "money";
  isPositive: boolean;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactionsComponent: FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  const getIconAndBg = (type: Transaction["type"]) => {
    switch (type) {
      case "deposit-card":
        return {
          icon: "/assets/deposit-card-icon-orange.svg",
          bgColor: "bg-orange-100",
        };
      case "paypal":
        return {
          icon: "/assets/paypal-icon-blue.svg",
          bgColor: "bg-blue-100",
        };
      case "money":
        return {
          icon: "/assets/money-icon-green.svg",
          bgColor: "bg-green-100",
        };
      default:
        return {
          icon: "/assets/deposit-card-icon-orange.svg",
          bgColor: "bg-gray-100",
        };
    }
  };

  return (
    <div className="w-full max-w-[350px] bg-white rounded-2xl p-4 sm:p-5 md:p-6 lg:border lg:border-gray-200 h-[180px] sm:h-[200px] md:h-[235px] overflow-y-auto">
      <div className="space-y-3 sm:space-y-4">
        {transactions.map((transaction) => {
          const { icon, bgColor } = getIconAndBg(transaction.type);
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full ${bgColor} flex items-center justify-center`}
                >
                  <img
                    src={icon}
                    alt={transaction.title}
                    width={24}
                    height={24}
                    className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
                  />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-medium">
                    {transaction.title}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <span
                className={`text-sm sm:text-base font-medium ${transaction.isPositive ? "text-green-500" : "text-red-500"}`}
              >
                {transaction.isPositive ? "+" : "-"}
                {transaction.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactionsComponent;
