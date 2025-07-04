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
const Careers = React.lazy(() => import("@/views/Career"));
const Services = React.lazy(() => import("@/views/ServicesPage"));
const Blog = React.lazy(() => import("@/views/Blog"));
const Solution = React.lazy(() => import("@/views/SolutionAndProduct"));
const SolutionDetail = React.lazy(() => import("@/views/SolutionAndProduct/SolutionDetail"));
const Login = React.lazy(() => import("@/views/Login"));
const Dashboard = React.lazy(() => import("@/views/Admin/pages/Dashboard"));
const Inbox = React.lazy(() => import("@/views/Admin/pages/Inbox"));
const Calendar = React.lazy(() => import("@/views/Admin/pages/Calendar"));
const CareersAdmin = React.lazy(() => import("@/views/Admin/pages/Careers"));
const CareersDetail = React.lazy(() => import("@/views/Career/CareersDetail"));
const Settings = React.lazy(() => import("@/views/Admin/pages/Settings"));

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
				path: idRouter.career,
				element: <Careers />,
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
				path: idRouter.solution,
				element: <Solution />,
			},
			{
				path: idRouter.careerDetail,
				element: <CareersDetail />,
			},
			{
				path: idRouter.solutionDetail,
				element: <SolutionDetail />,
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
				path: idRouter.adminInbox,
				element: <Inbox />,
			},
			{
				path: idRouter.adminCalendar,
				element: <Calendar />,
			},
			{
				path: idRouter.adminCareers,
				element: <CareersAdmin />,
			},
			{
				path: idRouter.adminContact,
				element: <Contact />,
			},
			{
				path: idRouter.adminSettings,
				element: <Settings />,
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
