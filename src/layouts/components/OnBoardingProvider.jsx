/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const OnboardingContext = createContext({
	hasSeenOnboarding: false,
	setHasSeenOnboarding: () => {},
	isLoading: false,
	setIsLoading: () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

export default function OnboardingProvider({ children }) {
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);

	// Check if user has seen onboarding before
	useEffect(() => {
		// Only run on client side
		if (typeof window !== "undefined") {
			const onboardingSeen = localStorage.getItem("hasSeenOnboarding");
			setHasSeenOnboarding(onboardingSeen === "true");
			setIsInitialized(true);
		}
	}, []);

	// Save onboarding state to localStorage
	useEffect(() => {
		if (isInitialized && hasSeenOnboarding) {
			localStorage.setItem("hasSeenOnboarding", "true");
		}
	}, [hasSeenOnboarding, isInitialized]);

	return (
		<OnboardingContext.Provider
			value={{
				hasSeenOnboarding,
				setHasSeenOnboarding,
				isLoading,
				setIsLoading,
			}}
		>
			{children}
		</OnboardingContext.Provider>
	);
}
