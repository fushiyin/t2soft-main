import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Bell, Globe, Lock, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="p-6"
		>
			<motion.div
				initial={{ y: -20 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.5 }}
				className="flex justify-between items-center mb-6"
			>
				<div>
					<h1 className="text-2xl font-bold">Settings</h1>
					<p className="text-muted-foreground">
						Manage your account settings and preferences
					</p>
				</div>
			</motion.div>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid gap-6"
			>
				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label>Full Name</Label>
									<Input placeholder="Enter your full name" />
								</div>
								<div className="space-y-2">
									<Label>Email</Label>
									<Input
										type="email"
										placeholder="Enter your email"
									/>
								</div>
								<div className="space-y-2">
									<Label>Phone Number</Label>
									<Input placeholder="Enter your phone number" />
								</div>
								<div className="space-y-2">
									<Label>Role</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Select your role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Administrator</SelectItem>
											<SelectItem value="manager">Manager</SelectItem>
											<SelectItem value="user">User</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button>Save Changes</Button>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Preferences</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Dark Mode</Label>
									<p className="text-sm text-muted-foreground">
										Toggle dark mode on or off
									</p>
								</div>
								<Switch />
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Email Notifications</Label>
									<p className="text-sm text-muted-foreground">
										Receive email notifications for updates
									</p>
								</div>
								<Switch defaultChecked />
							</div>
							<div className="flex items-center justify-between">
								<div className="space-y-0.5">
									<Label>Language</Label>
									<p className="text-sm text-muted-foreground">
										Select your preferred language
									</p>
								</div>
								<Select defaultValue="en">
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select language" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="en">English</SelectItem>
										<SelectItem value="vi">Tiếng Việt</SelectItem>
										<SelectItem value="ko">한국어</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Security</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label>Current Password</Label>
								<Input
									type="password"
									placeholder="Enter current password"
								/>
							</div>
							<div className="space-y-2">
								<Label>New Password</Label>
								<Input
									type="password"
									placeholder="Enter new password"
								/>
							</div>
							<div className="space-y-2">
								<Label>Confirm New Password</Label>
								<Input
									type="password"
									placeholder="Confirm new password"
								/>
							</div>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Button>Update Password</Button>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
