import React, { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const dummyPosts = [
	{
		id: 1,
		title: "How to Start Trading Crypto in 2024",
		author: "Jane Doe",
		status: "Published",
		date: "2024-06-01",
	},
	{
		id: 2,
		title: "Top 5 Strategies for Day Traders",
		author: "John Smith",
		status: "Draft",
		date: "2024-05-28",
	},
	{
		id: 3,
		title: "Understanding Technical Analysis",
		author: "Alice Lee",
		status: "Published",
		date: "2024-05-20",
	},
];

export default function Post() {
	const [posts] = useState(dummyPosts);
	const navigate = useNavigate();

	const goToPostWrite = () => {
		navigate("/admin/posts/write");
	};

	return (
		<div className="w-full mx-auto flex flex-col mt-10 px-8">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-1">
						Post Management
					</h1>
					<p className="text-muted-foreground">Manage your blog posts and content</p>
				</div>
				<button
					onClick={goToPostWrite}
					className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-pink-500 to-orange-400 text-white font-semibold shadow hover:scale-105 transition-transform"
				>
					<Plus className="w-5 h-5" /> Add New Post
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white dark:bg-[#181a20] rounded-xl shadow-lg overflow-hidden">
					<thead>
						<tr className="text-left text-gray-700 dark:text-gray-200 text-sm border-b border-gray-200 dark:border-gray-700">
							<th className="py-4 px-6 font-semibold">Title</th>
							<th className="py-4 px-6 font-semibold">Author</th>
							<th className="py-4 px-6 font-semibold">Status</th>
							<th className="py-4 px-6 font-semibold">Date</th>
							<th className="py-4 px-6 font-semibold text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{posts.map((post) => (
							<tr
								key={post.id}
								className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#23242a] transition-colors"
							>
								<td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
									{post.title}
								</td>
								<td className="py-4 px-6 text-gray-700 dark:text-gray-300">
									{post.author}
								</td>
								<td className="py-4 px-6">
									<span
										className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${post.status === "Published" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"}`}
									>
										{post.status}
									</span>
								</td>
								<td className="py-4 px-6 text-gray-500 dark:text-gray-400">
									{post.date}
								</td>
								<td className="py-4 px-6 text-center">
									<button className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors mr-2">
										<Pencil className="w-4 h-4 text-blue-500" />
									</button>
									<button className="inline-flex items-center justify-center p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
										<Trash className="w-4 h-4 text-red-500" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
