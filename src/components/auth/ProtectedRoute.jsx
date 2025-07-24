import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useRole";
import { CustomLoading } from "@/layouts";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ children, requiredRole = null }) => {
	const { user, userProfile, loading, isAuthenticated, isAdmin } = useAuth();
	console.log(isAdmin);
	const location = useLocation();

	// Show loading while authentication state is being determined
	if (loading) {
		return <CustomLoading defaultLoading />;
	}

	// Check email verification for regular users (admins might be pre-verified)
	if (user && !user.emailVerified) {
		toast.error("Please verify your email before accessing this page");
		return (
			<Navigate
				to="/user-login"
				replace
			/>
		);
	}

	// Check role-based access
	if (requiredRole && !isAdmin) {
		return (
			<Navigate
				to="/"
				replace
			/>
		);
	}

	// Check if user account is active
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

// Specific component for admin routes
export const AdminRoute = ({ children }) => {
	return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export default ProtectedRoute;
