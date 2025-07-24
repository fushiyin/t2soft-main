import React from "react";
import { useAuth } from "@/hooks/useRole";

const AuthDebugger = () => {
	const auth = useAuth();

	return (
		<div className="fixed top-4 left-4 bg-black/80 text-white p-4 rounded-lg z-50 max-w-sm">
			<h3 className="font-bold mb-2">Auth Debug Info:</h3>
			<div className="text-xs space-y-1">
				<div>Loading: {auth.loading ? "true" : "false"}</div>
				<div>User exists: {auth.user ? "true" : "false"}</div>
				<div>Email: {auth.user?.email || "none"}</div>
				<div>Verified: {auth.user?.emailVerified ? "true" : "false"}</div>
				<div>Profile exists: {auth.userProfile ? "true" : "false"}</div>
				<div>Role: {auth.userProfile?.role || "none"}</div>
				<div>Is Admin: {auth.isAdmin ? "true" : "false"}</div>
				<div>Is Authenticated: {auth.isAuthenticated ? "true" : "false"}</div>
			</div>
		</div>
	);
};

export default AuthDebugger;
