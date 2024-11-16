import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const transactions = [
    {
        id: 1,
        type: "received",
        description: "Received from John Doe",
        amount: 1500,
        date: "Today, 2:30 PM",
    },
    {
        id: 2,
        type: "sent",
        description: "Netflix Subscription",
        amount: 15.99,
        date: "Yesterday, 9:15 AM",
    },
    {
        id: 3,
        type: "sent",
        description: "Grocery Store",
        amount: 85.50,
        date: "Mar 20, 2024",
    },
    {
        id: 4,
        type: "received",
        description: "Salary Deposit",
        amount: 4500,
        date: "Mar 19, 2024",
    },
];

export default function RecentTransactions() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Recent Transactions
            </h3>
            <div className="space-y-4">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700"
                    >
                        <div className="flex items-center space-x-3">
                            <div
                                className={`rounded-full p-2 ${transaction.type === "received"
                                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                                    : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                    }`}
                            >
                                {transaction.type === "received" ? (
                                    <ArrowDownRight className="h-4 w-4" />
                                ) : (
                                    <ArrowUpRight className="h-4 w-4" />
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {transaction.description}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                            </div>
                        </div>
                        <span
                            className={`font-medium ${transaction.type === "received"
                                ? "text-green-600 dark:text-green-400"
                                : "text-red-600 dark:text-red-400"
                                }`}
                        >
                            {transaction.type === "received" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}