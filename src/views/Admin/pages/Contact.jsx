import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
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
					<h1 className="text-2xl font-bold">Contact Management</h1>
					<p className="text-muted-foreground">Manage contact information and messages</p>
				</div>
			</motion.div>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid gap-6 md:grid-cols-2"
			>
				<motion.div
					initial={{ x: -20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Contact Information</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<motion.div
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.4 }}
								className="flex items-center gap-2"
							>
								<Mail className="h-4 w-4 text-muted-foreground" />
								<span>contact@t2soft.com</span>
							</motion.div>
							<motion.div
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.5 }}
								className="flex items-center gap-2"
							>
								<Phone className="h-4 w-4 text-muted-foreground" />
								<span>+84 123 456 789</span>
							</motion.div>
							<motion.div
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.3, delay: 0.6 }}
								className="flex items-center gap-2"
							>
								<MapPin className="h-4 w-4 text-muted-foreground" />
								<span>
									Keangnam Landmark 72, Pham Hung, Me Tri, Nam Tu Liem, Hanoi
								</span>
							</motion.div>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					initial={{ x: 20, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.3 }}
				>
					<Card>
						<CardHeader>
							<CardTitle>Send Message</CardTitle>
						</CardHeader>
						<CardContent>
							<form className="space-y-4">
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.4 }}
								>
									<label className="text-sm font-medium">Name</label>
									<Input placeholder="Enter your name" />
								</motion.div>
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.5 }}
								>
									<label className="text-sm font-medium">Email</label>
									<Input
										type="email"
										placeholder="Enter your email"
									/>
								</motion.div>
								<motion.div
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.6 }}
								>
									<label className="text-sm font-medium">Message</label>
									<Textarea
										placeholder="Enter your message"
										rows={4}
									/>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Button className="w-full">
										<Send className="mr-2 h-4 w-4" />
										Send Message
									</Button>
								</motion.div>
							</form>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className="mt-6"
			>
				<Card>
					<CardHeader>
						<CardTitle>Recent Messages</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{/* Mock data for recent messages */}
							{[1, 2, 3].map((_, index) => (
								<motion.div
									key={index}
									initial={{ y: 20, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
									className="flex items-start justify-between p-4 border rounded-lg"
								>
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<span className="font-medium">John Doe</span>
											<span className="text-sm text-muted-foreground">
												john@example.com
											</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Interested in your services. Would like to schedule a
											meeting to discuss potential collaboration.
										</p>
										<span className="text-xs text-muted-foreground">
											Received 2 hours ago
										</span>
									</div>
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<Button
											variant="outline"
											size="sm"
										>
											Reply
										</Button>
									</motion.div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>
		</motion.div>
	);
}
