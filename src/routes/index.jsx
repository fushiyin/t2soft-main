import { CustomLoading, MainLayout } from "@/layouts";
import Admin from "@/views/Admin";
import ErrorBoundary from "@/views/ErrorBoundary";
import PageNotFound from "@/views/PageNotFound";
import React, { Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { idRouter } from "./idRouter";

const Home = React.lazy(() => import("@/views/Home"));
const About = React.lazy(() => import("@/views/About"));
const Contact = React.lazy(() => import("@/views/Contact"));
const Services = React.lazy(() => import("@/views/ServicesPage"));
const Blog = React.lazy(() => import("@/views/MyBlog"));
const Courses = React.lazy(() => import("@/views/Courses"));
const Login = React.lazy(() => import("@/views/Login"));
const Dashboard = React.lazy(() => import("@/views/Admin/pages/Dashboard"));
const Post = React.lazy(() => import("@/views/Admin/pages/Post"));
const PostWrite = React.lazy(() => import("@/views/Admin/pages/PostWrite"));

const router = createBrowserRouter([
	{
		path: idRouter.home,
		element: <MainLayout />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: idRouter?.contact,
				element: <Contact />,
			},
			{
				path: idRouter.about,
				element: <About />,
			},
			{
				path: idRouter.contact,
				element: <Contact />,
			},
			{
				path: idRouter.service,
				element: <Services />,
			},
			{
				path: idRouter.blog,
				element: <Blog />,
			},
			{
				path: idRouter.courses,
				element: <Courses />,
			},
		],
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
	{
		path: idRouter.login,
		element: <Login />,
	},
	{
		path: idRouter.admin,
		element: <Admin />,
		children: [
			{
				index: true,
				element: (
					<Navigate
						to={idRouter.adminDashboard}
						replace
					/>
				),
			},
			{
				path: idRouter.adminDashboard,
				element: <Dashboard />,
			},
			{
				path: idRouter.adminContact,
				element: <Contact />,
			},
			{
				path: idRouter.adminPosts,
				element: <Post />,
			},
			{
				path: idRouter.adminPostWrite,
				element: <PostWrite />,
			},
		],
	},
]);

function AppRouter() {
	return (
		<Suspense fallback={<CustomLoading defaultLoading />}>
			<RouterProvider router={router} />
		</Suspense>
	);
}

export default AppRouter;
