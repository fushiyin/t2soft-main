export const saveUserToLocalStorage = (userInfo) => {
	try {
		localStorage.setItem("user", JSON.stringify(userInfo));
	} catch (error) {
		console.error("Error saving user to localStorage:", error);
	}
};

export const getUserFromLocalStorage = () => {
	try {
		const user = localStorage.getItem("user");
		return user ? JSON.parse(user) : null;
	} catch (error) {
		console.error("Error getting user from localStorage:", error);
		return null;
	}
};

export const removeUserFromLocalStorage = () => {
	try {
		localStorage.removeItem("user");
	} catch (error) {
		console.error("Error removing user from localStorage:", error);
	}
};
