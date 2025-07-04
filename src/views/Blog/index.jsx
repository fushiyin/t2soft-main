import CTA from "@/components/sections/ContactCTA";
import SmartPagination from "@/components/SmartPagination/SmartPagination";
import axios from "axios";
import { motion } from "framer-motion";
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: {},
	show: {
		transition: {
			staggerChildren: 0.2,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	show: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

const Blog = () => {
	const [allBlogs, setAllBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const { t } = useTranslation();

	useEffect(() => {
		fetchBlogs();
	}, [currentPage]);

	const fetchBlogs = async () => {
		setLoading(true);
		try {
			const res = await axios.get("https://66a9b8e2613eced4eba6017a.mockapi.io/api/blog");
			setAllBlogs(res.data);
		} catch (e) {
			console.error(e);
			setAllBlogs([]);
		} finally {
			setLoading(false);
		}
	};

	const filteredBlogs = allBlogs.filter((blog) =>
		blog.title.toLowerCase().includes(searchValue.toLowerCase()),
	);

	const pageSize = 6;
	const totalPages = Math.ceil(filteredBlogs.length / pageSize);
	const paginatedBlogs = filteredBlogs.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	return (
		<>
			<div className="flex flex-col items-center justify-center mx-auto overflow-y-hidden mt-[64px]">
				<div className="max-w-[1440px] mx-auto px-4 md:px-2 2xl:px-0 py-12 md:pl-6 md:pr-6 sm:w-full">
					{/* Header và Search Input */}
					<div className="mb-10 text-center flex flex-col items-center justify-center gap-6">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-dark-gray">
							{t("blog.title")}
						</h2>
						<div className="flex justify-center w-2/3">
							<input
								type="text"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
								placeholder={t("blog.search_placeholder")}
								className="border px-4 py-2 rounded-md w-full max-w-md shadow-sm"
							/>
						</div>
					</div>

					{/* Blog List */}
					{loading ? (
						<div className="flex justify-center py-20">
							<Loader2 className="w-10 h-10 animate-spin text-primary" />
						</div>
					) : paginatedBlogs.length === 0 ? (
						<div className="flex justify-center py-20">
							<p className="text-lg text-muted-foreground">{t("blog.no_blog")}</p>
						</div>
					) : (
						<>
							<motion.div
								className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
								variants={containerVariants}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true, amount: 0.2 }}
							>
								{paginatedBlogs.map((blog) => (
									<motion.div
										key={blog.id}
										className="bg-card rounded-lg overflow-hidden shadow-md cursor-pointer"
										whileHover={{ scale: 1.05 }}
										transition={{ duration: 0.3 }}
										variants={cardVariants}
									>
										<motion.img
											src={blog.image}
											alt={blog.title}
											className="h-48 w-full object-cover"
											initial={{ scale: 1.05 }}
											whileHover={{ scale: 1.1 }}
											transition={{ duration: 0.3 }}
										/>
										<div className="p-4 space-y-2">
											<motion.p className="text-sm text-muted-foreground">
												{blog.date} - {blog.readTime}
											</motion.p>
											<motion.h2 className="text-lg font-semibold">
												{blog.title}
											</motion.h2>
											<motion.p className="text-sm text-muted-foreground">
												{blog.description}
											</motion.p>
											{/* <motion.span className="flex items-center gap-1 text-primary mt-2 cursor-pointer">
												Read more <ArrowRightIcon className="h-4 w-4" />
											</motion.span> */}
										</div>
									</motion.div>
								))}
							</motion.div>

							{/* Pagination */}
							<div className="mt-10 flex justify-center">
								<SmartPagination
									currentPage={currentPage}
									totalPages={totalPages}
									onPageChange={handlePageChange}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<CTA />
		</>
	);
};

export default Blog;
