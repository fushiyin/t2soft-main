import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import AuthErrorFallback from "@/components/error/AuthErrorFallback";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchUserProfile = async (uid) => {
		try {
			console.log("🔍 Fetching user profile for UID:", uid);
			const userDocRef = doc(db, "users", uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				const userData = userDoc.data();
				console.log("✅ User profile found:", userData);
				return userData;
			} else {
				console.log("❌ User document does not exist for UID:", uid);
				console.warn("❌ User document does not exist for UID:", uid);
				return null;
			}
		} catch (error) {
			console.error("🚨 Error fetching user profile:", error);
			return null;
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log("🔄 Auth state changed:", user ? `User: ${user.email}` : "No user");
			setUser(user);

			if (user) {
				// Fetch user profile data including role
				console.log("👤 User object:", {
					user,
				});
				const profile = await fetchUserProfile(user.uid);
				console.log("📋 Profile fetched:", profile);
				setUserProfile(profile);
			} else {
				setUserProfile(null);
			}

			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const logout = async () => {
		try {
			await signOut(auth);
			setUserProfile(null);
			toast.success("Logged out successfully");
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Failed to logout");
		}
	};

	// Debug the admin check
	const isAdminCheck = userProfile?.role === "admin";
	console.log("🔍 Admin Check Debug:", {
		userProfile: userProfile,
		role: userProfile?.role,
		roleType: typeof userProfile?.role,
		roleValue: JSON.stringify(userProfile?.role),
		comparison: userProfile?.role === "admin",
		isAdminResult: isAdminCheck,
	});

	const value = {
		user,
		userProfile,
		loading,
		logout,
		isAuthenticated: !!user,
		isAdmin: isAdminCheck,
		userRole: userProfile?.role || null,
	};

	return (
		<ErrorBoundary customFallback={AuthErrorFallback}>
			<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
		</ErrorBoundary>
	);
};

export { AuthContext };
