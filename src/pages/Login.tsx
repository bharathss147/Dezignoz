import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight, ArrowLeft, Lock, Loader2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

const Login = () => {
    const navigate = useNavigate();
    const { signInWithGoogle, signInWithEmail } = useAuth();
    const [step, setStep] = useState<"login" | "forgot">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [resetEmail, setResetEmail] = useState("");

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        try {
            await signInWithGoogle();
            toast.success("Welcome back! Signed in successfully.");
            navigate("/");
        } catch (error: any) {
            console.error("Google login error:", error);
            if (error.code === "auth/popup-closed-by-user") {
                toast.error("Sign-in cancelled. Please try again.");
            } else if (error.code === "auth/popup-blocked") {
                toast.error("Popup blocked by browser. Please allow popups and try again.");
            } else if (error.code === "auth/account-exists-with-different-credential") {
                toast.error("An account already exists with this email using a different sign-in method.");
            } else {
                toast.error(error.message || "Google sign-in failed. Please try again.");
            }
        } finally {
            setIsGoogleLoading(false);
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmail(email, password);
            toast.success("Welcome back! Signed in successfully.");
            navigate("/");
        } catch (error: any) {
            console.error("Login error:", error);
            if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
                toast.error("Invalid email or password. Please try again.");
            } else if (error.code === "auth/wrong-password") {
                toast.error("Incorrect password. Try again or reset your password.");
            } else if (error.code === "auth/too-many-requests") {
                toast.error("Too many failed attempts. Please try again later or reset your password.");
            } else if (error.code === "auth/user-disabled") {
                toast.error("This account has been disabled. Contact support.");
            } else {
                toast.error(error.message || "Login failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error("Please enter your email address");
            return;
        }

        setIsLoading(true);
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            toast.success("Password reset email sent! Check your inbox.");
            setStep("login");
            setResetEmail("");
        } catch (error: any) {
            console.error("Reset error:", error);
            if (error.code === "auth/user-not-found") {
                toast.error("No account found with this email.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email address.");
            } else {
                toast.error(error.message || "Failed to send reset email. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
            <AnimatedBackground />

            <div className="absolute top-8 left-8">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft size={18} />
                    <span className="text-sm font-medium">Back to Home</span>
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="glass-card p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Interior Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/20 rounded-full blur-[80px]" />

                    <div className="relative z-20">
                        <div className="flex justify-center mb-8">
                            <motion.div
                                className="w-16 h-16 rounded-full border-[2px] border-white/20 flex items-center justify-center bg-transparent backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.5)", boxShadow: "0 0 30px rgba(255, 255, 255, 0.1)" }}
                            >
                                <img src="/logo.png" alt="DEZIGNO Logo" className="w-10 h-10 object-contain invert opacity-90" />
                            </motion.div>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === "login" ? (
                                <motion.div
                                    key="login-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h1>
                                        <p className="text-muted-foreground">Log in to your DEZIGNO account</p>
                                    </div>

                                    <div className="space-y-4">
                                        <button
                                            onClick={handleGoogleLogin}
                                            disabled={isGoogleLoading || isLoading}
                                            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group disabled:opacity-50"
                                        >
                                            {isGoogleLoading ? (
                                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                            ) : (
                                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path
                                                        fill="#4285F4"
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                                                    />
                                                    <path
                                                        fill="#34A853"
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                    />
                                                    <path
                                                        fill="#FBBC05"
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                    />
                                                    <path
                                                        fill="#EA4335"
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                    />
                                                </svg>
                                            )}
                                            <span className="font-medium text-white">
                                                {isGoogleLoading ? "Connecting to Google..." : "Continue with Google"}
                                            </span>
                                        </button>

                                        <div className="relative flex items-center py-2">
                                            <div className="flex-grow border-t border-white/5"></div>
                                            <span className="flex-shrink mx-4 text-xs font-medium text-muted-foreground uppercase tracking-widest">or</span>
                                            <div className="flex-grow border-t border-white/5"></div>
                                        </div>

                                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                                <input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setResetEmail(email);
                                                        setStep("forgot");
                                                    }}
                                                    className="text-xs text-primary hover:underline font-medium"
                                                >
                                                    Forgot password?
                                                </button>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isLoading || isGoogleLoading}
                                                className="w-full btn-glow text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 group disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Authenticating...
                                                    </>
                                                ) : (
                                                    <>
                                                        Log In
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="forgot-pwd"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="text-center">
                                        <h1 className="text-2xl font-display font-bold text-white mb-2">Reset Password</h1>
                                        <p className="text-muted-foreground text-sm">Enter your email and we'll send you a link to reset your password.</p>
                                    </div>
                                    <form onSubmit={handleResetPassword} className="space-y-6">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                            <input
                                                type="email"
                                                placeholder="Enter your email"
                                                required
                                                value={resetEmail}
                                                onChange={(e) => setResetEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full btn-glow text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    "Send Reset Link"
                                                )}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setStep("login")}
                                                className="w-full text-sm text-muted-foreground hover:text-white transition-colors"
                                            >
                                                Back to Login
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-primary font-semibold hover:underline"
                        >
                            Sign up for free
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
