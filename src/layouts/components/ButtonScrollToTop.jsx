import { Button } from "@/components/ui/button";
import { scrollToTop } from "@/lib/utils";
import classNames from "classnames";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function ButtonScrollToTop() {
	const location = useLocation();
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.pageYOffset > 120);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		scrollToTop();
	}, [location]);

	return (
		<Button
			type="button"
			onClick={scrollToTop}
			className={classNames(
				"size-[44px] z-1000 fixed bottom-[20px] right-[30px] cursor-pointer rounded-3xl bg-foreground shadow-[0px_2px_4px_0px_#0000001F,_0px_4px_8px_0px_#00000014] transition-opacity duration-300",
				{
					"opacity-100": showScrollTop,
					"opacity-0 pointer-events-none": !showScrollTop,
				},
			)}
		>
			<ChevronUp
				size={20}
				color="white"
				strokeWidth={2}
			/>
		</Button>
	);
}
