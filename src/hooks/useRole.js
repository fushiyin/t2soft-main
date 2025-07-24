import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const useRole = () => {
	const { userProfile } = useAuth();
	console.log(useAuth());

	const isAdmin = userProfile?.role === "admin";
	const isInstructor = userProfile?.role === "instructor";
	const isStudent = userProfile?.role === "student";

	const hasRole = (role) => userProfile?.role === role;
	const hasAnyRole = (roles) => roles.includes(userProfile?.role);

	return {
		role: userProfile?.role || null,
		isAdmin,
		isInstructor,
		isStudent,
		hasRole,
		hasAnyRole,
	};
};
