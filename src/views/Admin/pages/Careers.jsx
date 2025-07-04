import SmartPagination from "@/components/SmartPagination/SmartPagination";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Edit2, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import TinyMCEField from "@/components/ui/TinyMCEField";
import { API_KEY_TINY } from "@/constant/career";

// Constants for select options
const DEPARTMENTS = [
	"Engineering",
	"Design",
	"Product",
	"Marketing",
	"Sales",
	"Human Resources",
	"Customer Support",
	"IT Security",
	"Data & Analytics",
	"Quality Assurance",
];

const LOCATIONS = ["Ho Chi Minh City", "Hanoi", "Da Nang", "Remote"];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const STATUS_OPTIONS = ["Open", "Closed"];

// Mock data for careers
const initialCareers = [
	{
		id: 1,
		title: "Senior Frontend Developer",
		department: "Engineering",
		location: "Ho Chi Minh City",
		type: "Full-time",
		status: "Open",
		applicants: 12,
		postedDate: "2024-03-15",
		requirements:
			"• 5+ years of experience in frontend development\n• Strong proficiency in React, TypeScript, and modern JavaScript\n• Experience with state management (Redux, MobX)\n• Knowledge of web performance optimization\n• Experience with testing frameworks (Jest, React Testing Library)",
		responsibilities:
			"• Lead frontend development for complex web applications\n• Mentor junior developers and conduct code reviews\n• Collaborate with UX/UI designers and backend teams\n• Implement responsive and accessible user interfaces\n• Optimize application performance and user experience",
		benefits:
			"• Competitive salary and performance bonuses\n• Flexible working hours and remote work options\n• Professional development budget\n• Health insurance and wellness programs\n• Modern equipment and tools",
	},
	{
		id: 2,
		title: "UX/UI Designer",
		department: "Design",
		location: "Hanoi",
		type: "Full-time",
		status: "Open",
		applicants: 8,
		postedDate: "2024-03-14",
		requirements:
			"• 3+ years of UX/UI design experience\n• Proficiency in Figma, Adobe XD, and Sketch\n• Strong portfolio demonstrating user-centered design\n• Experience with user research and usability testing\n• Knowledge of design systems and accessibility standards",
		responsibilities:
			"• Create user-centered designs for web and mobile applications\n• Conduct user research and usability testing\n• Develop wireframes, prototypes, and design systems\n• Collaborate with developers and product managers\n• Present design solutions to stakeholders",
		benefits:
			"• Competitive salary and annual bonus\n• Creative and collaborative work environment\n• Professional development opportunities\n• Health and wellness benefits\n• Flexible work arrangements",
	},
	{
		id: 3,
		title: "Backend Developer",
		department: "Engineering",
		location: "Remote",
		type: "Contract",
		status: "Closed",
		applicants: 15,
		postedDate: "2024-03-10",
		requirements:
			"• 4+ years of backend development experience\n• Strong knowledge of Node.js, Python, or Java\n• Experience with database design and optimization\n• Understanding of microservices architecture\n• Knowledge of cloud platforms (AWS, Azure, GCP)",
		responsibilities:
			"• Design and implement scalable backend services\n• Optimize database performance and queries\n• Develop RESTful APIs and microservices\n• Implement security best practices\n• Write clean, maintainable, and testable code",
		benefits:
			"• Competitive contract rates\n• Remote work flexibility\n• Project-based bonuses\n• Professional development support\n• Modern development tools and resources",
	},
	{
		id: 4,
		title: "Product Manager",
		department: "Product",
		location: "Ho Chi Minh City",
		type: "Full-time",
		status: "Open",
		applicants: 5,
		postedDate: "2024-03-12",
		requirements:
			"• 5+ years of product management experience\n• Strong analytical and problem-solving skills\n• Experience with agile methodologies\n• Excellent communication and leadership abilities\n• Technical background or understanding of software development",
		responsibilities:
			"• Define product vision and strategy\n• Gather and prioritize product requirements\n• Work closely with development and design teams\n• Analyze market trends and user feedback\n• Drive product launches and improvements",
		benefits:
			"• Competitive salary and equity options\n• Leadership development programs\n• Health and wellness benefits\n• Flexible work arrangements\n• Professional development budget",
	},
	{
		id: 5,
		title: "DevOps Engineer",
		department: "Engineering",
		location: "Remote",
		type: "Full-time",
		status: "Open",
		applicants: 7,
		postedDate: "2024-03-13",
		requirements:
			"• 3+ years of DevOps experience\n• Strong knowledge of CI/CD pipelines\n• Experience with containerization (Docker, Kubernetes)\n• Proficiency in infrastructure as code\n• Knowledge of cloud platforms and monitoring tools",
		responsibilities:
			"• Design and maintain CI/CD pipelines\n• Manage cloud infrastructure and services\n• Implement automation and monitoring solutions\n• Ensure system reliability and security\n• Collaborate with development teams",
		benefits:
			"• Competitive salary and bonuses\n• Remote work flexibility\n• Professional development opportunities\n• Health insurance and wellness programs\n• Modern tools and equipment",
	},
	{
		id: 6,
		title: "Mobile App Developer",
		department: "Engineering",
		location: "Da Nang",
		type: "Full-time",
		status: "Open",
		applicants: 9,
		postedDate: "2024-04-01",
		requirements:
			"• 3+ years of mobile app development experience\n• Strong knowledge of React Native or native iOS/Android\n• Experience with mobile app architecture\n• Understanding of mobile UI/UX principles\n• Knowledge of app store guidelines",
		responsibilities:
			"• Develop and maintain mobile applications\n• Implement new features and improvements\n• Optimize app performance and user experience\n• Collaborate with design and backend teams\n• Ensure app quality and stability",
		benefits:
			"• Competitive salary and performance bonuses\n• Health insurance and wellness programs\n• Professional development support\n• Modern development equipment\n• Flexible work arrangements",
	},
	{
		id: 7,
		title: "Data Scientist",
		department: "Data & Analytics",
		location: "Remote",
		type: "Part-time",
		status: "Open",
		applicants: 14,
		postedDate: "2024-04-03",
		requirements:
			"• 3+ years of data science experience\n• Strong knowledge of Python, R, or similar\n• Experience with machine learning and statistical analysis\n• Understanding of data visualization\n• Knowledge of big data technologies",
		responsibilities:
			"• Develop and implement machine learning models\n• Analyze complex data sets\n• Create data-driven insights and reports\n• Collaborate with business teams\n• Present findings to stakeholders",
		benefits:
			"• Competitive hourly rate\n• Flexible working hours\n• Remote work options\n• Professional development opportunities\n• Access to data science tools and resources",
	},
	{
		id: 8,
		title: "Marketing Specialist",
		department: "Marketing",
		location: "Hanoi",
		type: "Full-time",
		status: "Open",
		applicants: 6,
		postedDate: "2024-04-05",
		requirements:
			"• 3+ years of marketing experience\n• Strong knowledge of digital marketing\n• Experience with social media and content creation\n• Understanding of marketing analytics\n• Excellent communication skills",
		responsibilities:
			"• Develop and execute marketing campaigns\n• Create engaging content for various platforms\n• Analyze marketing performance metrics\n• Manage social media presence\n• Collaborate with cross-functional teams",
		benefits:
			"• Competitive salary and performance bonuses\n• Health insurance and wellness programs\n• Professional development opportunities\n• Creative work environment\n• Flexible work arrangements",
	},
	{
		id: 9,
		title: "QA Engineer",
		department: "Quality Assurance",
		location: "Ho Chi Minh City",
		type: "Full-time",
		status: "Closed",
		applicants: 11,
		postedDate: "2024-03-30",
		requirements:
			"• 3+ years of QA experience\n• Strong knowledge of testing methodologies\n• Experience with automated testing tools\n• Understanding of software development lifecycle\n• Knowledge of bug tracking systems",
		responsibilities:
			"• Develop and execute test plans\n• Perform manual and automated testing\n• Identify and report software defects\n• Collaborate with development teams\n• Ensure product quality standards",
		benefits:
			"• Competitive salary and bonuses\n• Health insurance and wellness programs\n• Professional development support\n• Modern testing tools and equipment\n• Collaborative work environment",
	},
	{
		id: 10,
		title: "Technical Writer",
		department: "Product",
		location: "Remote",
		type: "Contract",
		status: "Open",
		applicants: 4,
		postedDate: "2024-04-06",
		requirements:
			"• 2+ years of technical writing experience\n• Strong writing and editing skills\n• Understanding of software development\n• Experience with documentation tools\n• Knowledge of technical communication",
		responsibilities:
			"• Create technical documentation and guides\n• Write API documentation\n• Develop user manuals and tutorials\n• Collaborate with development teams\n• Maintain documentation accuracy",
		benefits:
			"• Competitive contract rates\n• Remote work flexibility\n• Professional development opportunities\n• Access to documentation tools\n• Flexible working hours",
	},
	{
		id: 11,
		title: "Business Analyst",
		department: "Product",
		location: "Ho Chi Minh City",
		type: "Full-time",
		status: "Open",
		applicants: 10,
		postedDate: "2024-04-02",
		requirements:
			"• 3+ years of business analysis experience\n• Strong analytical and problem-solving skills\n• Experience with requirements gathering\n• Understanding of software development\n• Excellent communication abilities",
		responsibilities:
			"• Gather and analyze business requirements\n• Create functional specifications\n• Collaborate with stakeholders\n• Support project implementation\n• Conduct user acceptance testing",
		benefits:
			"• Competitive salary and bonuses\n• Health insurance and wellness programs\n• Professional development opportunities\n• Collaborative work environment\n• Flexible work arrangements",
	},
	{
		id: 12,
		title: "HR Manager",
		department: "Human Resources",
		location: "Hanoi",
		type: "Full-time",
		status: "Open",
		applicants: 3,
		postedDate: "2024-04-01",
		requirements:
			"• 5+ years of HR experience\n• Strong knowledge of HR practices\n• Experience with recruitment and employee relations\n• Understanding of labor laws\n• Excellent interpersonal skills",
		responsibilities:
			"• Manage recruitment and hiring processes\n• Develop HR policies and procedures\n• Handle employee relations\n• Conduct performance reviews\n• Support employee development",
		benefits:
			"• Competitive salary and performance bonuses\n• Health insurance and wellness programs\n• Professional development opportunities\n• Collaborative work environment\n• Flexible work arrangements",
	},
	{
		id: 13,
		title: "Customer Support Specialist",
		department: "Customer Support",
		location: "Da Nang",
		type: "Part-time",
		status: "Closed",
		applicants: 7,
		postedDate: "2024-03-28",
		requirements:
			"• 2+ years of customer support experience\n• Excellent communication skills\n• Problem-solving abilities\n• Knowledge of support tools\n• Understanding of customer service",
		responsibilities:
			"• Handle customer inquiries and issues\n• Provide technical support\n• Document customer interactions\n• Collaborate with other teams\n• Maintain customer satisfaction",
		benefits:
			"• Competitive hourly rate\n• Flexible working hours\n• Professional development opportunities\n• Support tools and resources\n• Collaborative work environment",
	},
	{
		id: 14,
		title: "Cybersecurity Analyst",
		department: "IT Security",
		location: "Remote",
		type: "Full-time",
		status: "Open",
		applicants: 5,
		postedDate: "2024-04-04",
		requirements:
			"• 3+ years of cybersecurity experience\n• Strong knowledge of security tools\n• Understanding of security protocols\n• Experience with incident response\n• Relevant certifications preferred",
		responsibilities:
			"• Monitor security systems\n• Investigate security incidents\n• Implement security measures\n• Conduct security assessments\n• Develop security policies",
		benefits:
			"• Competitive salary and bonuses\n• Remote work flexibility\n• Professional development support\n• Security tools and resources\n• Health insurance and wellness programs",
	},
	{
		id: 15,
		title: "Sales Executive",
		department: "Sales",
		location: "Ho Chi Minh City",
		type: "Full-time",
		status: "Open",
		applicants: 13,
		postedDate: "2024-04-07",
		requirements:
			"• 3+ years of sales experience\n• Strong negotiation skills\n• Understanding of sales processes\n• Experience with CRM tools\n• Excellent communication abilities",
		responsibilities:
			"• Generate and pursue sales leads\n• Build client relationships\n• Meet sales targets\n• Prepare sales proposals\n• Collaborate with marketing team",
		benefits:
			"• Competitive base salary and commission\n• Performance bonuses\n• Health insurance and wellness programs\n• Professional development opportunities\n• Collaborative work environment",
	},
];

const ITEMS_PER_PAGE = 8;

const Careers = () => {
	const [careers, setCareers] = useState(initialCareers);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState({ key: "title", direction: "asc" });
	const [editingCareer, setEditingCareer] = useState(null);
	const [careerToDelete, setCareerToDelete] = useState(null);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const form = useForm({
		defaultValues: {
			title: "",
			department: "",
			location: "",
			type: "",
			status: "Open",
			requirements: "",
			responsibilities: "",
			benefits: "",
		},
	});

	// Handle form submission
	const onSubmit = (data) => {
		console.log(data);
		if (editingCareer) {
			// Update existing career
			setCareers(
				careers.map((career) =>
					career.id === editingCareer.id
						? { ...career, ...data, postedDate: career.postedDate }
						: career,
				),
			);
		} else {
			// Add new career
			const newCareer = {
				id: careers.length + 1,
				...data,
				status: "Open",
				applicants: 0,
				postedDate: new Date().toISOString().split("T")[0],
			};
			setCareers([...careers, newCareer]);
		}

		// setShowAddDialog(false);
		// setEditingCareer(null);
		// form.reset();
	};

	// Handle edit button click
	const handleEdit = (career) => {
		setEditingCareer(career);
		form.reset(career);
		setShowAddDialog(true);
	};

	// Handle sort
	const handleSort = (key) => {
		let direction = "asc";
		if (sortConfig.key === key && sortConfig.direction === "asc") {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	// Sort careers
	const sortedCareers = [...careers].sort((a, b) => {
		if (!sortConfig.key) return 0;

		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === "asc" ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
			return sortConfig.direction === "asc" ? 1 : -1;
		}
		return 0;
	});

	// Filter careers based on search term and status
	const filteredCareers = sortedCareers.filter((career) => {
		const matchesSearch =
			career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			career.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
			career.location.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus = statusFilter === "All" || career.status === statusFilter;

		return matchesSearch && matchesStatus;
	});

	// Pagination
	const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);
	const paginatedCareers = filteredCareers.slice(
		(currentPage - 1) * ITEMS_PER_PAGE,
		currentPage * ITEMS_PER_PAGE,
	);

	const confirmDelete = () => {
		if (careerToDelete) {
			setCareers(careers.filter((career) => career.id !== careerToDelete));
			setCareerToDelete(null);
		}
	};

	// Sort icon component
	const SortIcon = ({ columnKey }) => {
		if (sortConfig.key !== columnKey) return null;
		return sortConfig.direction === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
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
					<h1 className="text-2xl font-bold">Careers Management</h1>
					<p className="text-muted-foreground">Manage job postings and applications</p>
				</div>
				<motion.div
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Button onClick={() => setShowAddDialog(true)}>
						<Plus className="mr-2 h-4 w-4" /> Add New Position
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
									<Button
										variant="outline"
										className="flex items-center gap-2"
									>
										{sortConfig.direction === "asc" ? (
											<ChevronUp className="mr-2 h-4 w-4" />
										) : (
											<ChevronDown className="mr-2 h-4 w-4" />
										)}
										Sort by:{" "}
										{sortConfig.key
											? sortConfig.key.charAt(0).toUpperCase() +
												sortConfig.key.slice(1)
											: "Select"}
									</Button>
								</motion.div>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => handleSort("title")}>
									Title
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("department")}>
									Department
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("location")}>
									Location
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("type")}>
									Type
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("status")}>
									Status
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("applicants")}>
									Applicants
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSort("postedDate")}>
									Posted Date
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className="flex items-center space-x-4">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="flex items-center gap-2"
								>
									<Filter size={16} />
									Status: {statusFilter}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setStatusFilter("All")}>
									All
								</DropdownMenuItem>
								{STATUS_OPTIONS.map((status) => (
									<DropdownMenuItem
										key={status}
										onClick={() => setStatusFilter(status)}
									>
										{status}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search positions..."
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
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("title")}
								>
									<div className="flex items-center gap-2">
										Title
										<SortIcon columnKey="title" />
									</div>
								</TableHead>
								<TableHead
									className="cursor-pointer min-w-[160px]"
									onClick={() => handleSort("department")}
								>
									<div className="flex items-center gap-2">
										Department
										<SortIcon columnKey="department" />
									</div>
								</TableHead>
								<TableHead
									className="cursor-pointer min-w-[140px]"
									onClick={() => handleSort("location")}
								>
									<div className="flex items-center gap-2">
										Location
										<SortIcon columnKey="location" />
									</div>
								</TableHead>
								<TableHead
									className="cursor-pointer min-w-[120px]"
									onClick={() => handleSort("type")}
								>
									<div className="flex items-center gap-2">
										Type
										<SortIcon columnKey="type" />
									</div>
								</TableHead>
								<TableHead className="min-w-[120px]">Status</TableHead>
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("applicants")}
								>
									<div className="flex items-center gap-2">
										Applicants
										<SortIcon columnKey="applicants" />
									</div>
								</TableHead>
								<TableHead
									className="cursor-pointer"
									onClick={() => handleSort("postedDate")}
								>
									<div className="flex items-center gap-2">
										Posted Date
										<SortIcon columnKey="postedDate" />
									</div>
								</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<AnimatePresence>
								{paginatedCareers.map((career, index) => (
									<motion.tr
										key={career.id}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3, delay: index * 0.05 }}
									>
										<TableCell className="font-medium">
											{career.title}
										</TableCell>
										<TableCell className="min-w-[160px]">
											{career.department}
										</TableCell>
										<TableCell className="min-w-[140px]">
											{career.location}
										</TableCell>
										<TableCell className="min-w-[120px]">
											{career.type}
										</TableCell>
										<TableCell className="min-w-[120px]">
											<span
												className={`px-2 py-1 rounded-full text-xs ${
													career.status === "Open"
														? "bg-green-100 text-green-800"
														: "bg-red-100 text-red-800"
												}`}
											>
												{career.status}
											</span>
										</TableCell>
										<TableCell>{career.applicants}</TableCell>
										<TableCell>{career.postedDate}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													onClick={() => handleEdit(career)}
													className="p-2 hover:bg-gray-100 rounded-full"
												>
													<Edit2 className="h-4 w-4" />
												</motion.button>
												<motion.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													onClick={() => setCareerToDelete(career.id)}
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
						<TableFooter>
							<TableRow>
								<TableCell colSpan={8}>
									<SmartPagination
										currentPage={currentPage}
										totalPages={totalPages}
										onPageChange={setCurrentPage}
									/>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</motion.div>

			{/* Dialog components with animations */}
			<AnimatePresence>
				{showAddDialog && (
					<Dialog
						open={showAddDialog}
						modal={false}
						onOpenChange={(open) => {
							setShowAddDialog(open);
							setEditingCareer(null);
							form.reset();
						}}
					>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black z-40"
						/>

						{/* Modal content FIXED */}
						<DialogContent
							onInteractOutside={(e) => e.preventDefault()}
							className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-auto md:min-w-[700px] z-50"
						>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.2 }}
							>
								<DialogHeader>
									<DialogTitle className="w-full justify-center text-center">
										{editingCareer ? "Edit Position" : "Add New Position"}
									</DialogTitle>
								</DialogHeader>

								<div className="max-h-[calc(90vh-180px)] overflow-y-auto pr-4">
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
														<FormLabel>Title</FormLabel>
														<FormControl>
															<Input
																placeholder="Enter position title"
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
													name="department"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Department</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl className="w-full">
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select department" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{DEPARTMENTS.map((dept) => (
																		<SelectItem
																			key={dept}
																			value={dept}
																		>
																			{dept}
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
													name="location"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Location</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl className="w-full">
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select location" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{LOCATIONS.map((loc) => (
																		<SelectItem
																			key={loc}
																			value={loc}
																		>
																			{loc}
																		</SelectItem>
																	))}
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>

											<div className="grid grid-cols-2 gap-4">
												<FormField
													control={form.control}
													name="type"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Type</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl className="w-full">
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select type" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{JOB_TYPES.map((type) => (
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
													name="status"
													render={({ field }) => (
														<FormItem>
															<FormLabel>Status</FormLabel>
															<Select
																onValueChange={field.onChange}
																defaultValue={field.value}
															>
																<FormControl className="w-full">
																	<SelectTrigger className="w-full">
																		<SelectValue placeholder="Select status" />
																	</SelectTrigger>
																</FormControl>
																<SelectContent>
																	{STATUS_OPTIONS.map(
																		(status) => (
																			<SelectItem
																				key={status}
																				value={status}
																			>
																				{status}
																			</SelectItem>
																		),
																	)}
																</SelectContent>
															</Select>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>

											<TinyMCEField
												control={form.control}
												name="requirements"
												label="Requirements"
												placeholder="Enter job requirements..."
												apiKey={API_KEY_TINY}
											/>

											<TinyMCEField
												control={form.control}
												name="responsibilities"
												label="Responsibilities"
												placeholder="Enter job responsibilities..."
												apiKey={API_KEY_TINY}
											/>

											<TinyMCEField
												control={form.control}
												name="benefits"
												label="Benefits"
												placeholder="Enter job benefits..."
												apiKey={API_KEY_TINY}
											/>

											<DialogFooter>
												<Button type="submit">
													{editingCareer
														? "Save Changes"
														: "Add Position"}
												</Button>
											</DialogFooter>
										</form>
									</Form>
								</div>
							</motion.div>
						</DialogContent>
					</Dialog>
				)}
			</AnimatePresence>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={!!careerToDelete}
				onOpenChange={() => setCareerToDelete(null)}
			>
				<DialogContent>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.3 }}
					>
						<DialogHeader>
							<DialogTitle>Confirm Delete</DialogTitle>
						</DialogHeader>
						<div className="py-4">
							<p>
								Are you sure you want to delete this position? This action cannot be
								undone.
							</p>
						</div>
						<DialogFooter>
							<div className="flex justify-end gap-2">
								<Button
									variant="outline"
									onClick={() => setCareerToDelete(null)}
								>
									Cancel
								</Button>
								<Button
									variant="destructive"
									onClick={confirmDelete}
								>
									Delete
								</Button>
							</div>
						</DialogFooter>
					</motion.div>
				</DialogContent>
			</Dialog>
		</motion.div>
	);
};

export default Careers;
