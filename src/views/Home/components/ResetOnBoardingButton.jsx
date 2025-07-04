import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/layouts/components/OnBoardingProvider";
import { Loader } from "lucide-react";

export default function ResetOnBoardingButton() {
	const { hasSeenOnboarding } = useOnboarding();

	const handleClick = () => {
		localStorage.setItem("hasSeenOnboarding", "false");
		// setHasSeenOnboarding(false);
		window.location.reload();
	};

	return (
		<Button
			onClick={handleClick}
			disabled={!hasSeenOnboarding}
			className="bg-black text-white"
		>
			{hasSeenOnboarding ? "Reset Onboarding Animation" : "F5 to view Onboarding"}
			<Loader
				size={24}
				color="yellow"
				strokeWidth={2}
			/>
		</Button>
	);
}
