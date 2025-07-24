import loginBg from "@/assets/image/login_bg.jpg";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";

export default function FormLogin() {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [loading, setLoading] = useState(false);

	// Get user role-based redirect URL
	const getRoleBasedRedirect = async (user) => {
		try {
			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);
			
			if (userDoc.exists()) {
				const userData = userDoc.data();
				// Redirect based on user role
				switch (userData.role) {
					case "admin":
						return "/admin/dashboard";
					case "instructor":
						return "/"; // Could be instructor dashboard in future
					default:
						return "/"; // Regular user to home page
				}
			}
			return "/"; // Default to home if no user data found
		} catch (error) {
			console.error("Error getting user role:", error);
			return "/"; // Default to home on error
		}
	};

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
			
			// Check email verification
			if (!userCredential.user.emailVerified) {
				await auth.signOut();
				toast.error("Please verify your email before logging in.");
				return;
			}
			
			// Get role-based redirect
			const redirectUrl = await getRoleBasedRedirect(userCredential.user);
			navigate(redirectUrl);
		} catch (e) {
			console.error("Login error:", e);
			form.setError("email", { message: "Invalid email or password" });
			form.setError("password", { message: "Invalid email or password" });
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			
			// Get role-based redirect
			const redirectUrl = await getRoleBasedRedirect(result.user);
			navigate(redirectUrl);
		} catch (e) {
			toast.error(e.message || "Google sign-in failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div
				className="fixed inset-0 w-full h-full z-0"
				style={{
					backgroundImage: `url(${loginBg})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
				}}
			>
				<div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
			</div>
			<div className="relative z-10 flex items-center justify-center min-h-screen">
				<Card className="bg-red w-full max-w-lg md:min-w-[25vw] backdrop-blur-lg bg-black/60 dark:bg-[#181a20]/70 shadow-2xl transition-all duration-300 border-0">
					<CardHeader className="flex flex-wrap items-center justify-center">
						<CardTitle className="w-full flex justify-center text-white dark:text-white text-2xl font-extrabold drop-shadow-lg">
							Admin Login
						</CardTitle>
						<CardDescription className="w-full flex justify-center text-gray-200 dark:text-gray-300 text-base font-medium drop-shadow">
							Login to dashboard admin
						</CardDescription>
					</CardHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<CardContent>
								<div className="flex flex-col gap-6">
									<FormField
										control={form.control}
										name="email"
										rules={{ required: "Email is required" }}
										render={({ field, fieldState }) => (
											<FormItem>
												<FormLabel className="text-white dark:text-white font-semibold text-lg drop-shadow">
													Email
												</FormLabel>
												<FormControl>
													<Input
														placeholder="m@example.com"
														className="rounded-none bg-white/20 dark:bg-gray-900/30 text-white dark:text-white placeholder-gray-200 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all border-0"
														{...field}
													/>
												</FormControl>
												<FormMessage>
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										rules={{ required: "Password is required" }}
										render={({ field, fieldState }) => (
											<FormItem>
												<div className="flex items-center justify-between">
													<FormLabel className="text-white dark:text-white font-semibold text-lg drop-shadow">
														Password
													</FormLabel>
												</div>
												<FormControl>
													<Input
														type="password"
														placeholder="••••••••"
														className="rounded-none bg-white/20 dark:bg-gray-900/30 text-white dark:text-white placeholder-gray-200 dark:placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-pink-400 focus:outline-none transition-all border-0"
														{...field}
													/>
												</FormControl>
												<FormMessage>
													{fieldState.error?.message}
												</FormMessage>
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
							<CardFooter className="flex-col gap-2 pt-6 ">
								<Button
									type="submit"
									className="rounded-none w-full cursor-pointer bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold shadow-md hover:scale-105 transition-transform border-0 py-3 text-lg drop-shadow-lg"
									disabled={loading}
								>
									{loading && <Loader2Icon className="animate-spin" />}
									Login
								</Button>
								<Button
									type="button"
									className="rounded-none w-full cursor-pointer bg-white/20 dark:bg-gray-900/30 text-white dark:text-white border-0 shadow hover:bg-pink-100/30 dark:hover:bg-pink-900/30 py-3 text-lg flex items-center justify-center gap-2 drop-shadow"
									onClick={handleGoogleSignIn}
									disabled={loading}
								>
									<img
										src="https://www.svgrepo.com/show/475656/google-color.svg"
										alt="Google"
										className="w-5 h-5 mr-2"
									/>
									Sign in with Google
								</Button>
							</CardFooter>
						</form>
					</Form>
				</Card>
			</div>
		</>
	);
}
