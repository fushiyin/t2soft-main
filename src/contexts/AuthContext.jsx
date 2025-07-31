import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import AuthErrorFallback from "@/components/error/AuthErrorFallback";

const AuthContext = createContext({});

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userProfile, setUserProfile] = useState(null);
	const [loading, setLoading] = useState(true);

	// Load user from localStorage on app start
	useEffect(() => {
		const savedUser = localStorage.getItem("user");
		if (savedUser) {
			try {
				const userData = JSON.parse(savedUser);
				// Check if user data is still valid (not expired)
				const loginTime = new Date(userData.loginTime);
				const now = new Date();
				const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

				if (hoursDiff < 24) {
					// Keep login for 24 hours
					setUser(userData);
				} else {
					localStorage.removeItem("user");
				}
			} catch (error) {
				console.error("Error parsing saved user:", error);
				localStorage.removeItem("user");
			}
		}
		setLoading(false);
	}, []);

	const fetchUserProfile = async (uid) => {
		try {
			console.log("user id ", uid);
			console.log("🔍 Fetching user profile for UID:", uid);
			const userDocRef = doc(db, "users", uid);
			const userDoc = await getDoc(userDocRef);
			console.log("User document snapshot:", userDoc);

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

	const login = (userData) => {
		const userInfo = {
			id: userData.id || `user_${Date.now()}`,
			name: userData.name || userData.displayName || "Người dùng",
			email: userData.email,
			avatar: userData.avatar || userData.photoURL,
			provider: userData.provider || "unknown",
			loginTime: new Date().toISOString(),
			emailVerified: userData.emailVerified || false,
			...userData,
		};

		setUser(userInfo);
		localStorage.setItem("user", JSON.stringify(userInfo));
	};

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

	const requireAuth = (action, onUnauthorized) => {
		if (!user) {
			if (onUnauthorized) {
				onUnauthorized();
			}
			return false;
		}
		if (action) action();
		return true;
	};

	const updateUser = (updates) => {
		const updatedUser = { ...user, ...updates };
		setUser(updatedUser);
		localStorage.setItem("user", JSON.stringify(updatedUser));
	};

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
		login,
		logout,
		updateUser,
		requireAuth,
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
