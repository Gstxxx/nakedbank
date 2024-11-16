import { CreditCard, DollarSign } from "lucide-react";
import { Progress } from "~/components/ui/progress";

export default function CreditCardInfo() {
    const limit = 10000;
    const used = 3250;
    const percentage = (used / limit) * 100;

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Credit Card</h3>
                <CreditCard className="h-5 w-5 text-purple-600" />
            </div>

            <div className="mt-4 space-y-4">
                <div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Current Bill</span>
                        <span className="font-medium text-gray-900 dark:text-white">$3,250.00</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Due Date</span>
                        <span className="font-medium text-gray-900 dark:text-white">Apr 15, 2024</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Credit Limit</span>
                        <span className="font-medium text-gray-900 dark:text-white">${limit.toLocaleString()}</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Used: ${used.toLocaleString()}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                            Available: ${(limit - used).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}