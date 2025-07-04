import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, Building2, TrendingUp, Clock } from "lucide-react";
import { motion } from "framer-motion";

// Mock data for dashboard
const stats = {
	visitors: {
		total: 1250,
		active: 342,
		new: 89,
	},
	jobs: {
		total: 15,
		open: 12,
		closed: 3,
	},
	applications: {
		total: 98,
		pending: 45,
		reviewed: 53,
	},
	departments: {
		engineering: 6,
		design: 2,
		product: 3,
		marketing: 2,
		other: 2,
	},
	trends: {
		visitors: "+12.5%",
		applications: "+8.3%",
		conversion: "+5.2%",
	},
	recentActivity: [
		{
			id: 1,
			action: "New application received",
			position: "Senior Frontend Developer",
			time: "5 minutes ago",
		},
		{
			id: 2,
			action: "Job position closed",
			position: "Backend Developer",
			time: "1 hour ago",
		},
		{
			id: 3,
			action: "New job posted",
			position: "UX/UI Designer",
			time: "2 hours ago",
		},
	],
};

const StatCard = ({ title, value, icon: Icon, description, trend }) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
	>
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<motion.div
					whileHover={{ scale: 1.1 }}
					transition={{ type: "spring", stiffness: 400, damping: 10 }}
				>
					<Icon className="h-4 w-4 text-muted-foreground" />
				</motion.div>
			</CardHeader>
			<CardContent>
				<motion.div
					initial={{ scale: 0.5 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 200, damping: 10 }}
					className="text-2xl font-bold"
				>
					{value}
				</motion.div>
				{trend && (
					<p className="text-xs text-muted-foreground">
						<span className="text-green-500">{trend}</span> from last month
					</p>
				)}
				{description && <p className="text-xs text-muted-foreground">{description}</p>}
			</CardContent>
		</Card>
	</motion.div>
);

const DepartmentCard = () => (
	<motion.div
		initial={{ opacity: 0, x: -20 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ duration: 0.4 }}
		className="col-span-2"
	>
		<Card>
			<CardHeader>
				<CardTitle>Departments Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{Object.entries(stats.departments).map(([dept, count], index) => (
						<motion.div
							key={dept}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center justify-between"
						>
							<div className="flex items-center space-x-2">
								<Building2 className="h-4 w-4 text-muted-foreground" />
								<span className="capitalize">{dept}</span>
							</div>
							<span className="font-medium">{count} positions</span>
						</motion.div>
					))}
				</div>
			</CardContent>
		</Card>
	</motion.div>
);

const RecentActivityCard = () => (
	<motion.div
		initial={{ opacity: 0, x: 20 }}
		animate={{ opacity: 1, x: 0 }}
		transition={{ duration: 0.4 }}
		className="col-span-2"
	>
		<Card>
			<CardHeader>
				<CardTitle>Recent Activity</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{stats.recentActivity.map((activity, index) => (
						<motion.div
							key={activity.id}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center justify-between"
						>
							<div className="space-y-1">
								<p className="text-sm font-medium">{activity.action}</p>
								<p className="text-sm text-muted-foreground">{activity.position}</p>
							</div>
							<div className="flex items-center space-x-2">
								<Clock className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm text-muted-foreground">
									{activity.time}
								</span>
							</div>
						</motion.div>
					))}
				</div>
			</CardContent>
		</Card>
	</motion.div>
);

export default function Dashboard() {
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
					<h1 className="text-2xl font-bold">Dashboard</h1>
					<p className="text-muted-foreground">Welcome to your recruitment dashboard</p>
				</div>
			</motion.div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total Visitors"
					value={stats.visitors.total}
					icon={Users}
					description={`${stats.visitors.active} active, ${stats.visitors.new} new today`}
					trend={stats.trends.visitors}
				/>
				<StatCard
					title="Open Positions"
					value={stats.jobs.open}
					icon={Briefcase}
					description={`${stats.jobs.total} total positions`}
				/>
				<StatCard
					title="Applications"
					value={stats.applications.total}
					icon={FileText}
					description={`${stats.applications.pending} pending review`}
					trend={stats.trends.applications}
				/>
				<StatCard
					title="Conversion Rate"
					value="4.2%"
					icon={TrendingUp}
					description="Applications to interviews"
					trend={stats.trends.conversion}
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
				<DepartmentCard />
				<RecentActivityCard />
			</div>
		</motion.div>
	);
}
