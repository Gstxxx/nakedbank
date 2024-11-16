import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "~/lib/authClient";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function SignInForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = signInSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
            });
        } else {
            await authClient.signIn.email(
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    onRequest: () => {
                        setLoading(true);
                        toast.info("Signing in...");
                    },
                    onSuccess: () => {
                        setLoading(false);
                        navigate("/dashboard");
                    },
                    onError: (ctx) => {
                        setLoading(false);
                        toast.error(ctx.error.message);
                    },
                }
            );
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                </div>
                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}