import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import SignInForm from "~/components/SignInForm";
import SignUpForm from "~/components/SignUpForm";
import Hero from "~/components/Hero";
import { Button } from "~/components/ui/button"


export const meta: MetaFunction = () => {
  return [
    { title: "NakedBank - Banking for the Digital Age" },
    { name: "description", content: "Experience seamless banking with NakedBank. Secure, fast, and always at your fingertips." },
  ];
};

export default function Index() {
  const [activeForm, setActiveForm] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-purple-950 dark:to-gray-900">
      <Hero />
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <div className="inline-flex rounded-lg bg-purple-100 p-1 dark:bg-purple-900">
            <button
              onClick={() => setActiveForm("signin")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeForm === "signin"
                ? "bg-white text-purple-700 shadow dark:bg-gray-800 dark:text-purple-400"
                : "text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200"
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveForm("signup")}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${activeForm === "signup"
                ? "bg-white text-purple-700 shadow dark:bg-gray-800 dark:text-purple-400"
                : "text-purple-600 hover:text-purple-700 dark:text-purple-300 dark:hover:text-purple-200"
                }`}
            >
              Sign Up
            </button>
          </div>
          {activeForm === "signin" ? <SignInForm /> : <SignUpForm />}
        </div>
      </div>
    </div>
  );
}