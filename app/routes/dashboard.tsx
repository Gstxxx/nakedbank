"use client";
import { useState } from "react";
import { Bell, Menu, Search, User } from "lucide-react";
import BalanceCard from "~/components/dashboard/BalanceCard";
import QuickActions from "~/components/dashboard/QuickActions";
import CreditCardInfo from "~/components/dashboard/CreditCardInfo";
import RecentTransactions from "~/components/dashboard/RecentTransactions";
import CreditCard3D from "~/components/dashboard/CreditCard3D";

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform dark:bg-gray-800 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-16 items-center justify-center border-b dark:border-gray-700">
                    <h1 className="text-xl font-bold text-purple-600">NakedBank</h1>
                </div>
            </aside>

            <div className="flex-1">
                <header className="sticky top-0 z-40 flex h-16 items-center justify-between bg-white px-4 shadow dark:bg-gray-800 lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex items-center space-x-4">
                        <div className="relative hidden lg:block">
                            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 rounded-lg border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700"
                            />
                        </div>
                        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <Bell className="h-6 w-6" />
                        </button>
                        <button className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <User className="h-6 w-6" />
                        </button>
                    </div>
                </header>

                <main className="p-4 lg:p-8">
                    <div className="grid gap-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <BalanceCard />
                            <CreditCard3D />
                        </div>

                        <QuickActions />

                        <div className="grid gap-6 lg:grid-cols-2">
                            <CreditCardInfo />
                            <RecentTransactions />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}