import { ArrowRight, Shield, CreditCard, Smartphone } from "lucide-react";

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Banking for the
                            <span className="text-purple-600 dark:text-purple-400"> Digital Age</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Experience seamless banking with NakedBank. Secure, fast, and always at your fingertips.
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <Shield className="h-6 w-6 text-purple-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Bank-grade security</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-6 w-6 text-purple-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Virtual cards</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Smartphone className="h-6 w-6 text-purple-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Mobile-first</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ArrowRight className="h-6 w-6 text-purple-600" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">Instant transfers</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800"
                            alt="Banking App"
                            className="rounded-lg shadow-2xl transition-transform hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}