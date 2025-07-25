import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useRole";
import { CustomLoading } from "@/layouts";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, requiredRole = null }) => {
	const { user, userProfile, loading, isAuthenticated } = useAuth();

	if (loading) {
		return <CustomLoading defaultLoading />;
	}

	if (!isAuthenticated) {
		toast.error("Please log in to access this page");
		return (
			<Navigate
				to="/user-login"
				replace
			/>
		);
	}

	if (!userProfile) {
		toast.error("User profile not found. Please contact support.");
		return (
			<Navigate
				to="/user-login"
				replace
			/>
		);
	}

	if (user && !user.emailVerified && userProfile.role !== "admin") {
		toast.error("Please verify your email before accessing this page");
		return (
			<Navigate
				to="/user-login"
				replace
			/>
		);
	}

	if (requiredRole && userProfile.role !== requiredRole) {
		toast.error(`Access denied. ${requiredRole} role required.`);
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	if (userProfile.isActive === false) {
		toast.error("Your account has been deactivated. Please contact support.");
		return (
			<Navigate
				to="/user-login"
				replace
			/>
		);
	}

	return children;
};

export const AdminRoute = ({ children }) => {
	return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export default ProtectedRoute;
