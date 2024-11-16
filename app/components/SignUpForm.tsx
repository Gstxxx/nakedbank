import { z } from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { authClient } from "~/lib/authClient";
import { Lock, Mail, User, Upload } from "lucide-react";

const signUpSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        name: z.string().min(2),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function SignUpForm() {
    const [formData, setFormData] = useState<{
        email: string;
        password: string;
        confirmPassword: string;
        name: string;
        image: File | null;
    }>({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        image: null,
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);

    const convertImageToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const result = signUpSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0] || "",
                password: fieldErrors.password?.[0] || "",
                confirmPassword: fieldErrors.confirmPassword?.[0] || "",
                name: fieldErrors.name?.[0] || "",
            });
        } else {
            try {
                setLoading(true);
                const imageBase64 = formData.image ? await convertImageToBase64(formData.image) : undefined;
                await authClient.signUp.email(
                    {
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                        image: imageBase64,
                    },
                    {
                        onRequest: () => {
                            toast.info("Creating your account...");
                        },
                        onSuccess: () => {
                            toast.success("Welcome to NakedBank!");
                            window.location.href = "/dashboard";
                        },
                        onError: (ctx) => {
                            toast.error(ctx.error.message);
                        },
                    }
                );
            } catch (error) {
                toast.error("An unexpected error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                Create Account
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                </div>
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
                <div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-sm text-red-500">{errors.confirmPassword}</span>
                    )}
                </div>
                <div>
                    <div className="relative">
                        <Upload className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white file:mr-4 file:border-0 file:bg-purple-50 file:py-1 file:px-4 file:text-sm file:font-semibold file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900 dark:file:text-purple-300"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-600"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}