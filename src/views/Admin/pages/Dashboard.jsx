import React from "react";

export default function Dashboard() {
	return (
		<div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center mt-10 px-4 md:px-0">
			<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
				Chào mừng đến với Trang Quản trị
			</h1>
			<p className="text-gray-500 dark:text-gray-300 text-lg text-center max-w-xl mb-8">
				Quản lý hệ thống học tập, người dùng, tài chính và các chức năng hệ thống một cách
				dễ dàng và hiện đại.
			</p>
		</div>
	);
}
