import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/layouts/components/OnBoardingProvider";
import { Loader } from "lucide-react";

export default function LoadingDemoButton() {
	const { isLoading, setIsLoading } = useOnboarding();

	const handleClick = () => {
		setIsLoading(true);

		// Simulate an API call or route change
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	};

	return (
		<Button
			onClick={handleClick}
			disabled={isLoading}
			className="bg-black text-white"
		>
			{isLoading ? "Loading..." : "Demo Loading"}
			<Loader
				size={24}
				color="yellow"
				strokeWidth={2}
			/>
		</Button>
	);
}
