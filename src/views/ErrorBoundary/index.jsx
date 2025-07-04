import { isRouteErrorResponse, Link, useRouteError } from "react-router";

export default function ErrorBoundary() {
	const error = useRouteError(); // Lấy lỗi từ React Router

	// Kiểm tra nếu lỗi là một phản hồi lỗi của router (ví dụ: 404, 401)
	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-8 text-center rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold mb-4">Router Error!</h1>
				<p className="text-xl mb-2">Status: {error.status}</p>
				<p className="text-lg mb-4">
					{error.statusText ||
						error.data?.message ||
						"Page not found or an error occurred. Please try again later."}
				</p>
				{error.data?.message && (
					<p className="text-md text-red-600 dark:text-red-400">
						Details: {error.data.message}
					</p>
				)}
				<Link
					to="/"
					className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
				>
					Back to Home Page
				</Link>
			</div>
		);
	}

	// Xử lý các loại lỗi khác (lỗi trong component, lỗi khác không phải từ router)
	console.error("Error not from Router:", error);
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 p-8 text-center rounded-lg shadow-lg">
			<h1 className="text-4xl font-bold mb-4">An unexpected error occurred!</h1>
			<p className="text-lg mb-4">Please try again later.</p>
			<Link
				to="/"
				className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
			>
				Back to Home Page
			</Link>
		</div>
	);
}
