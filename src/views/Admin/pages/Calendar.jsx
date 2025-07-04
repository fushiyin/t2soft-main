import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Clock,
	MapPin,
	Plus,
	Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

// Constants for event types
const EVENT_TYPES = ["Technical Interview", "HR Interview", "Team Meeting", "Assessment"];

// Mock data for events
const INITIAL_EVENTS = [
	{
		id: 1,
		title: "Interview with John Doe",
		type: "Interview",
		date: new Date().toISOString().split("T")[0], // Today
		time: "10:00",
		location: "Conference Room A",
		participants: ["John Doe", "HR Manager"],
		position: "Senior Developer",
		status: "Scheduled",
	},
	{
		id: 2,
		title: "Team Meeting",
		type: "Meeting",
		date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
		time: "14:00",
		location: "Main Office",
		participants: ["Team Lead", "Development Team"],
		position: "",
		status: "Scheduled",
	},
	{
		id: 3,
		title: "Project Review",
		type: "Meeting",
		date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0], // Day after tomorrow
		time: "15:30",
		location: "Virtual Meeting",
		participants: ["Project Manager", "Stakeholders"],
		position: "",
		status: "In Progress",
	},
	{
		id: 4,
		title: "New Hire Orientation",
		type: "Training",
		date: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0], // 3 days from now
		time: "09:00",
		location: "Training Room",
		participants: ["New Employees", "HR Team"],
		position: "",
		status: "Scheduled",
	},
	{
		id: 5,
		title: "Client Presentation",
		type: "Presentation",
		date: new Date(Date.now() + 4 * 86400000).toISOString().split("T")[0], // 4 days from now
		time: "11:00",
		location: "Client Office",
		participants: ["Sales Team", "Client Representatives"],
		position: "",
		status: "Scheduled",
	},
];

const EVENT_TYPE_COLORS = {
	Interview: "bg-blue-100 text-blue-800",
	Meeting: "bg-purple-100 text-purple-800",
	Training: "bg-green-100 text-green-800",
	Presentation: "bg-orange-100 text-orange-800",
};

const EventBadge = ({ type }) => (
	<span
		className={`px-2 py-0.5 rounded-full text-xs ${EVENT_TYPE_COLORS[type] || "bg-gray-100 text-gray-800"}`}
	>
		{type}
	</span>
);

const EventCard = ({ event }) => (
	<Card className="mb-4">
		<CardHeader className="pb-2">
			<div className="flex justify-between items-start">
				<div>
					<CardTitle className="text-lg">{event.title}</CardTitle>
					{event.position && (
						<p className="text-sm text-muted-foreground">{event.position}</p>
					)}
				</div>
				<span
					className={`px-2 py-1 rounded-full text-xs ${
						event.status === "Scheduled"
							? "bg-green-100 text-green-800"
							: "bg-yellow-100 text-yellow-800"
					}`}
				>
					{event.status}
				</span>
			</div>
		</CardHeader>
		<CardContent>
			<div className="space-y-2">
				<div className="flex items-center text-sm">
					<Clock className="h-4 w-4 mr-2 text-muted-foreground" />
					{event.date} at {event.time}
				</div>
				<div className="flex items-center text-sm">
					<MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
					{event.location}
				</div>
				<div className="flex items-center text-sm">
					<Users className="h-4 w-4 mr-2 text-muted-foreground" />
					{event.participants.join(", ")}
				</div>
			</div>
		</CardContent>
	</Card>
);

const EventDetailDialog = ({ isOpen, onClose, event }) => {
	if (!event) return null;

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
						<DialogTitle>{event.title}</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="flex justify-between items-start">
							<div>
								<p className="font-medium">{event.type}</p>
								{event.position && (
									<p className="text-sm text-muted-foreground">
										{event.position}
									</p>
								)}
							</div>
							<span
								className={`px-2 py-1 rounded-full text-xs ${
									event.status === "Scheduled"
										? "bg-green-100 text-green-800"
										: "bg-yellow-100 text-yellow-800"
								}`}
							>
								{event.status}
							</span>
						</div>
						<div className="space-y-2">
							<div className="flex items-center text-sm">
								<Clock className="h-4 w-4 mr-2 text-muted-foreground" />
								{event.date} at {event.time}
							</div>
							<div className="flex items-center text-sm">
								<MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
								{event.location}
							</div>
							<div className="flex items-center text-sm">
								<Users className="h-4 w-4 mr-2 text-muted-foreground" />
								{event.participants.join(", ")}
							</div>
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
							<Button>Edit Event</Button>
						</motion.div>
					</DialogFooter>
				</motion.div>
			</DialogContent>
		</Dialog>
	);
};

export default function Calendar() {
	const [events, setEvents] = useState(INITIAL_EVENTS);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedEvent, setSelectedEvent] = useState(null);

	const form = useForm({
		defaultValues: {
			title: "",
			type: "",
			date: "",
			time: "",
			location: "",
			participants: "",
			position: "",
		},
	});

	const onSubmit = (data) => {
		const newEvent = {
			id: events.length + 1,
			...data,
			participants: data.participants.split(",").map((p) => p.trim()),
			status: "Scheduled",
		};
		setEvents([...events, newEvent]);
		setIsFormOpen(false);
		form.reset();
	};

	const handlePreviousMonth = () => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() - 1);
			return newDate;
		});
	};

	const handleNextMonth = () => {
		setCurrentDate((prev) => {
			const newDate = new Date(prev);
			newDate.setMonth(prev.getMonth() + 1);
			return newDate;
		});
	};
	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const getEventsForDate = (date) => {
		console.log("Checking events for date:", date);
		const dayEvents = events.filter((event) => event.date === date);
		console.log("Found events:", dayEvents);
		return dayEvents;
	};

	const renderCalendarDays = () => {
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);
		const days = [];
		const today = new Date().toISOString().split("T")[0];

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDay; i++) {
			days.push(
				<div
					key={`empty-${i}`}
					className="aspect-square p-2 border rounded-lg bg-muted/50"
				/>,
			);
		}

		// Add cells for each day of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
			const dayEvents = getEventsForDate(date);
			const hasEvents = dayEvents.length > 0;
			const isToday = date === today;

			days.push(
				<motion.div
					key={day}
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.3, delay: 0.5 + day * 0.02 }}
					className={`aspect-square p-2 border rounded-lg relative hover:bg-accent/50 transition-colors ${
						isToday
							? "bg-primary text-primary-foreground"
							: hasEvents
								? "bg-primary/5"
								: ""
					}`}
				>
					<div className="flex justify-between items-start">
						<span
							className={`text-sm font-medium ${isToday ? "text-primary-foreground" : ""}`}
						>
							{day}
						</span>
						{hasEvents && (
							<span className="text-xs text-muted-foreground">
								{dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}
							</span>
						)}
					</div>
					{hasEvents && (
						<div className="mt-2 space-y-1">
							{dayEvents.map((event) => (
								<motion.div
									key={event.id}
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									className={`text-xs p-1.5 rounded cursor-pointer ${
										isToday ? "bg-primary-foreground/20" : "bg-primary/10"
									}`}
									title={`${event.title} - ${event.time}`}
									onClick={() => setSelectedEvent(event)}
								>
									<div className="flex items-center gap-1.5">
										<EventBadge type={event.type} />
										<span className="truncate">{event.title}</span>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>,
			);
		}

		return days;
	};

	const getUpcomingEvents = () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		return events
			.filter((event) => {
				const eventDate = new Date(event.date);
				eventDate.setHours(0, 0, 0, 0);
				return eventDate >= today;
			})
			.sort((a, b) => new Date(a.date) - new Date(b.date))
			.slice(0, 3);
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
					<h1 className="text-2xl font-bold">Calendar</h1>
					<p className="text-muted-foreground">Manage your schedule and events</p>
				</div>
				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<Button onClick={() => setIsFormOpen(true)}>
						<Plus className="mr-2 h-4 w-4" />
						Add Event
					</Button>
				</motion.div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
				{/* Calendar */}
				<Card className="col-span-3">
					<CardHeader>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handlePreviousMonth}
									className="p-2 hover:bg-accent rounded-lg transition-colors"
								>
									<ChevronLeft className="h-5 w-5" />
								</motion.button>
								<h2 className="text-2xl font-bold">
									{currentDate.toLocaleString("default", {
										month: "long",
										year: "numeric",
									})}
								</h2>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={handleNextMonth}
									className="p-2 hover:bg-accent rounded-lg transition-colors"
								>
									<ChevronRight className="h-5 w-5" />
								</motion.button>
							</div>
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => {
									setCurrentDate(new Date());
								}}
								className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
							>
								Today
							</motion.button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-7 gap-2 mb-2">
							{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
								<div
									key={day}
									className="text-center text-sm font-medium text-muted-foreground"
								>
									{day}
								</div>
							))}
						</div>
						<div className="grid grid-cols-7 gap-2">{renderCalendarDays()}</div>
					</CardContent>
				</Card>

				{/* Upcoming Events */}
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle>Upcoming Events</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{getUpcomingEvents().map((event) => (
								<motion.div
									key={event.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.3 }}
									className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
									onClick={() => setSelectedEvent(event)}
								>
									<div className="flex justify-between items-start mb-2">
										<div>
											<h4 className="font-medium">{event.title}</h4>
											<EventBadge type={event.type} />
										</div>
										<span
											className={`px-2 py-1 rounded-full text-xs ${
												event.status === "Scheduled"
													? "bg-green-100 text-green-800"
													: "bg-yellow-100 text-yellow-800"
											}`}
										>
											{event.status}
										</span>
									</div>
									<div className="space-y-1 text-sm mt-2">
										<div className="flex items-center">
											<CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
											{event.date}
										</div>
										<div className="flex items-center">
											<Clock className="h-4 w-4 mr-2 text-muted-foreground" />
											{event.time}
										</div>
										<div className="flex items-center">
											<MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
											{event.location}
										</div>
									</div>
								</motion.div>
							))}
							{getUpcomingEvents().length === 0 && (
								<div className="text-center py-4 text-muted-foreground">
									No upcoming events
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<Dialog
				open={isFormOpen}
				onOpenChange={setIsFormOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add New Event</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event Title</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter event title"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Event Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select event type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{EVENT_TYPES.map((type) => (
													<SelectItem
														key={type}
														value={type}
													>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Position</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter position"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Date</FormLabel>
											<FormControl>
												<Input
													type="date"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="time"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Time</FormLabel>
											<FormControl>
												<Input
													type="time"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter location"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="participants"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Participants</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter participants (comma-separated)"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">Add Event</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>

			{/* Add EventDetailDialog */}
			<AnimatePresence>
				{selectedEvent && (
					<EventDetailDialog
						isOpen={!!selectedEvent}
						onClose={() => setSelectedEvent(null)}
						event={selectedEvent}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
