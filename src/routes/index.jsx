import { CustomLoading, MainLayout } from "@/layouts";
import Admin from "@/views/Admin";
import ErrorBoundary from "@/views/ErrorBoundary";
import PageNotFound from "@/views/PageNotFound";
import { AdminRoute } from "@/components/auth/ProtectedRoute";
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
const UserLogin = React.lazy(() => import("@/views/UserLogin"));
const ForgotPassword = React.lazy(() => import("@/views/ForgotPassword"));
const EmailVerification = React.lazy(() => import("@/views/EmailVerification"));
const Document = React.lazy(() => import("@/views/CategoryPage"));
const DocumentDetail = React.lazy(() => import("@/views/CategoryPage/CategoryDetail.jsx"));

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
			{
				path: idRouter.document,
				element: <Document />,
			},
			{
				path: idRouter.documentDetail,
				element: <DocumentDetail />,
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
		path: idRouter.userLogin,
		element: <UserLogin />,
	},
	{
		path: idRouter.forgotPassword,
		element: <ForgotPassword />,
	},
	{
		path: idRouter.verifyEmail,
		element: <EmailVerification />,
	},
	{
		path: idRouter.admin,
		element: (
			<AdminRoute requiredRole="admin">
				<Admin />
			</AdminRoute>
		),
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
