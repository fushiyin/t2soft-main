import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Adjust import path as needed
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust import path as needed

export const getUserRole = async (userId) => {
	try {
		const userDoc = await getDoc(doc(db, "users", userId));
		if (userDoc.exists()) {
			return userDoc.data().role || "user"; // Default to 'user' if no role found
		}
		return "user";
	} catch (error) {
		console.error("Error fetching user role:", error);
		return "user";
	}
};

export const loginWithEmailAndPassword = async (email, password) => {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;

		// Fetch user role from Firestore
		const role = await getUserRole(user.uid);

		const userInfo = {
			id: user.uid,
			email: user.email,
			displayName: user.displayName,
			role: role,
			token: await user.getIdToken(),
		};

		return { success: true, user: userInfo };
	} catch (error) {
		console.error("Login error:", error);
		return { success: false, error: error.message };
	}
};
