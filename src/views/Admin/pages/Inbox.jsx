import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Clock, Filter, Mail, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for messages
const initialMessages = [
	{
		id: 1,
		from: "John Doe",
		email: "john.doe@example.com",
		subject: "Application for Senior Frontend Developer",
		content: "I am writing to express my interest in the Senior Frontend Developer position...",
		date: "2024-04-15 10:30",
		status: "unread",
		priority: "high",
		type: "application",
	},
	{
		id: 2,
		from: "Sarah Smith",
		email: "sarah.smith@example.com",
		subject: "Interview Schedule Confirmation",
		content: "Thank you for scheduling the interview. I confirm my availability...",
		date: "2024-04-14 15:45",
		status: "read",
		priority: "medium",
		type: "interview",
	},
	{
		id: 3,
		from: "Mike Johnson",
		email: "mike.johnson@example.com",
		subject: "Question about the Backend Developer position",
		content: "I have a few questions regarding the technical requirements...",
		date: "2024-04-14 09:15",
		status: "unread",
		priority: "low",
		type: "inquiry",
	},
	{
		id: 4,
		from: "HR Department",
		email: "hr@company.com",
		subject: "New Application Received",
		content: "A new application has been received for the UX/UI Designer position...",
		date: "2024-04-13 16:20",
		status: "read",
		priority: "high",
		type: "notification",
	},
];

const MessageDialog = ({ isOpen, onClose, message }) => {
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent className="max-w-2xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					<DialogHeader>
						<DialogTitle>{message?.subject}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="flex justify-between items-start">
							<div>
								<p className="font-medium">{message?.from}</p>
								<p className="text-sm text-muted-foreground">{message?.email}</p>
							</div>
							<div className="text-sm text-muted-foreground">{message?.date}</div>
						</div>
						<div className="border-t pt-4">
							<p className="whitespace-pre-wrap">{message?.content}</p>
						</div>
					</div>
					<DialogFooter>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								variant="outline"
								onClick={onClose}
							>
								Close
							</Button>
						</motion.div>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button>Reply</Button>
						</motion.div>
					</DialogFooter>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
};

const ComposeDialog = ({ isOpen, onClose }) => {
	const form = useForm({
		defaultValues: {
			to: "",
			subject: "",
			content: "",
		},
	});

	const onSubmit = (data) => {
		console.log(data);
		onClose();
		form.reset();
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ duration: 0.3 }}
				>
					<DialogHeader>
						<DialogTitle>Compose Message</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="to"
								render={({ field }) => (
									<FormItem>
										<FormLabel>To</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter recipient email"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="subject"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Subject</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter subject"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="content"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Message</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Type your message here..."
												className="min-h-[200px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button
										type="button"
										variant="outline"
										onClick={onClose}
									>
										Cancel
									</Button>
								</motion.div>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button type="submit">Send</Button>
								</motion.div>
							</DialogFooter>
						</form>
					</Form>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
};

// Constants for filter options
const STATUS_FILTERS = [
	{ value: "all", label: "All Status" },
	{ value: "read", label: "Read" },
	{ value: "unread", label: "Unread" },
];

const TYPE_FILTERS = [
	{ value: "all", label: "All Types" },
	{ value: "application", label: "Application" },
	{ value: "interview", label: "Interview" },
	{ value: "inquiry", label: "Inquiry" },
	{ value: "notification", label: "Notification" },
];

export default function Inbox() {
	const [messages, setMessages] = useState(initialMessages);
	const [selectedMessage, setSelectedMessage] = useState(null);
	const [showCompose, setShowCompose] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [messageToDelete, setMessageToDelete] = useState(null);

	const filteredMessages = messages.filter((message) => {
		const matchesSearch =
			message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
			message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
			message.email.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesStatus = statusFilter === "all" || message.status === statusFilter;
		const matchesType = typeFilter === "all" || message.type === typeFilter;
		return matchesSearch && matchesStatus && matchesType;
	});

	const handleStatusChange = (id, newStatus) => {
		setMessages(
			messages.map((message) =>
				message.id === id ? { ...message, status: newStatus } : message,
			),
		);
	};

	const handleDelete = (id) => {
		setMessages(messages.filter((message) => message.id !== id));
		setMessageToDelete(null);
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case "read":
				return <CheckCircle2 className="h-4 w-4 text-green-500" />;
			case "unread":
				return <Clock className="h-4 w-4 text-blue-500" />;
			default:
				return <AlertCircle className="h-4 w-4 text-gray-500" />;
		}
	};

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
					<h1 className="text-2xl font-bold">Inbox</h1>
					<p className="text-muted-foreground">Manage your messages and communications</p>
				</div>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button onClick={() => setShowCompose(true)}>
						<Plus className="mr-2 h-4 w-4" /> Compose
					</Button>
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="space-y-4"
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<motion.div
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Button variant="outline">
										<Filter className="mr-2 h-4 w-4" /> Filter
									</Button>
								</motion.div>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								align="start"
								className="w-56"
							>
								<div className="px-2 py-1.5 text-sm font-semibold">Status</div>
								{STATUS_FILTERS.map((status) => (
									<DropdownMenuItem
										key={status.value}
										onClick={() => setStatusFilter(status.value)}
										className={statusFilter === status.value ? "bg-accent" : ""}
									>
										{status.label}
									</DropdownMenuItem>
								))}
								<div className="px-2 py-1.5 text-sm font-semibold mt-2">Type</div>
								{TYPE_FILTERS.map((type) => (
									<DropdownMenuItem
										key={type.value}
										onClick={() => setTypeFilter(type.value)}
										className={typeFilter === type.value ? "bg-accent" : ""}
									>
										{type.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center space-x-2">
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search messages..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-8"
							/>
						</div>
					</div>
				</div>

				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>From</TableHead>
								<TableHead>Subject</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Type</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<AnimatePresence>
								{filteredMessages.map((message, index) => (
									<motion.tr
										key={message.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
										className="cursor-pointer hover:bg-muted/50"
										onClick={() => setSelectedMessage(message)}
									>
										<TableCell>
											<div className="flex items-center space-x-2">
												<Mail className="h-4 w-4 text-muted-foreground" />
												<div>
													<p className="font-medium">{message.from}</p>
													<p className="text-sm text-muted-foreground">
														{message.email}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell>{message.subject}</TableCell>
										<TableCell>{message.date}</TableCell>
										<TableCell>
											<div className="flex items-center gap-2">
												{getStatusIcon(message.status)}
												<span
													className={`px-2 py-1 rounded-full text-xs ${
														message.status === "unread"
															? "bg-blue-100 text-blue-800"
															: "bg-gray-100 text-gray-800"
													}`}
												>
													{message.status}
												</span>
											</div>
										</TableCell>
										<TableCell>
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													message.type === "application"
														? "bg-green-100 text-green-800"
														: message.type === "interview"
															? "bg-purple-100 text-purple-800"
															: message.type === "inquiry"
																? "bg-yellow-100 text-yellow-800"
																: "bg-gray-100 text-gray-800"
												}`}
											>
												{message.type}
											</span>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													onClick={(e) => {
														e.stopPropagation();
														handleStatusChange(
															message.id,
															message.status === "read"
																? "unread"
																: "read",
														);
													}}
													className="p-2 hover:bg-gray-100 rounded-full"
												>
													<Mail className="h-4 w-4" />
												</motion.button>
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													onClick={(e) => {
														e.stopPropagation();
														setMessageToDelete(message.id);
													}}
													className="p-2 hover:bg-gray-100 rounded-full"
												>
													<Trash2 className="h-4 w-4" />
												</motion.button>
											</div>
										</TableCell>
									</motion.tr>
								))}
							</AnimatePresence>
						</TableBody>
					</Table>
				</div>
			</motion.div>

			<AnimatePresence>
				{selectedMessage && (
					<MessageDialog
						isOpen={!!selectedMessage}
						onClose={() => setSelectedMessage(null)}
						message={selectedMessage}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{showCompose && (
					<ComposeDialog
						isOpen={showCompose}
						onClose={() => setShowCompose(false)}
					/>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={!!messageToDelete}
				onOpenChange={() => setMessageToDelete(null)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Delete Message</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						<p>
							Are you sure you want to delete this message? This action cannot be
							undone.
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setMessageToDelete(null)}
						>
							Cancel
						</Button>
						<Button
							variant="destructive"
							onClick={() => handleDelete(messageToDelete)}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</motion.div>
	);
}
