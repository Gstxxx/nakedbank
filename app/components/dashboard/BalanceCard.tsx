import { DollarSign, TrendingUp } from "lucide-react";

export default function BalanceCard() {
    return (
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Balance</p>
                    <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">$24,563.00</h3>
                </div>
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                    <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
                <TrendingUp className="mr-1 h-4 w-4" />
                <span>+2.5% from last month</span>
            </div>
        </div>
    );
}