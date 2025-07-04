import loginImage from "@/assets/logos/T2_dark_ICon.png";
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
import { ADMIN } from "@/constant/admin";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export default function FormLogin() {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const [loading, setLoading] = useState(false);

	const onSubmit = (values) => {
		try {
			setLoading(true);
			if (values.email === ADMIN.username && values.password === ADMIN.password) {
				console.log("Login success");

				setTimeout(() => {
					setLoading(false);
					navigate("/admin/dashboard");
				}, 1000);
			} else {
				console.log("Login fail");

				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		} finally {
			//
		}
	};

	return (
		<>
			<Card className="w-full max-w-lg">
				<CardHeader className="flex flex-wrap items-center justify-center">
					<img
						className="h-[64px] w-[64px]"
						src={loginImage}
					></img>
					<CardTitle className="w-full flex justify-center">Admin Login</CardTitle>
					<CardDescription className="w-full flex justify-center">
						Login to dashboard admin
					</CardDescription>
					{/* <CardAction>
					<Button variant="link">Sign Up</Button>
				</CardAction> */}
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
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													placeholder="m@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
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
												<FormLabel>Password</FormLabel>
											</div>
											<FormControl>
												<Input
													type="password"
													{...field}
												/>
											</FormControl>
											<FormMessage>{fieldState.error?.message}</FormMessage>
										</FormItem>
									)}
								/>
							</div>
						</CardContent>

						<CardFooter className="flex-col gap-2 pt-6 ">
							<Button
								type="submit"
								className="w-full cursor-pointer"
								disabled={loading}
							>
								{loading && <Loader2Icon className="animate-spin" />}
								Login
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</>
	);
}
