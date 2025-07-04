import { Button } from "@/components/ui/button";
import classNames from "classnames";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function CallPhoneButton({ phoneNumber, show = true }) {
	const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrollTopVisible(window.pageYOffset > 120);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<Button
			asChild
			type="button"
			className={classNames(
				"size-[44px] z-1000 fixed right-[30px] cursor-pointer rounded-3xl bg-green-500 shadow-[0px_2px_4px_0px_#0000001F,_0px_4px_8px_0px_#00000014] transition-all duration-300  block md:hidden",
				{
					"opacity-100": show,
					"opacity-0 pointer-events-none": !show,
					"bottom-[70px]": isScrollTopVisible,
					"bottom-[20px]": !isScrollTopVisible,
				},
			)}
		>
			<a
				className="flex"
				href={`tel:${phoneNumber}`}
			>
				<Phone
					size={20}
					color="white"
					strokeWidth={2}
				/>
			</a>
		</Button>
	);
}
