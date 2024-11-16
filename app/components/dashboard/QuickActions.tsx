import { QrCode, Receipt, CreditCard, Send } from "lucide-react";

const actions = [
    { icon: QrCode, label: "Pix Transfer", color: "text-blue-600" },
    { icon: Receipt, label: "Pay Bill", color: "text-green-600" },
    { icon: CreditCard, label: "Cards", color: "text-purple-600" },
    { icon: Send, label: "Send Money", color: "text-orange-600" },
];

export default function QuickActions() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {actions.map(({ icon: Icon, label, color }) => (
                <button
                    key={label}
                    className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
                >
                    <div className={`rounded-full bg-opacity-20 p-3 ${color.replace("text", "bg")}`}>
                        <Icon className={`h-6 w-6 ${color}`} />
                    </div>
                    <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                </button>
            ))}
        </div>
    );
}