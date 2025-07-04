import { useState, useEffect } from "react";

const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isTablet, setIsTablet] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [isLg, setIsLg] = useState(false);
	const [isXl, setIsXl] = useState(false);
	const [is2xl, setIs2xl] = useState(false);
	const [isTouchDevice, setIsTouchDevice] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			setIsMobile(width < 768);
			setIsTablet(width >= 768 && width < 1024);
			setIsDesktop(width >= 1024);
			setIsLg(width >= 1024);
			setIsXl(width >= 1280);
			setIs2xl(width >= 1536);

			// Check if device supports touch
			const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
			setIsTouchDevice(isTouch);
		};

		// Initial check
		handleResize();

		// Add resize event listener
		window.addEventListener("resize", handleResize);

		// Cleanup on unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return {
		isMobile,
		isTablet,
		isDesktop,
		isLg,
		isXl,
		is2xl,
		isTouchDevice,
	};
};

export default useResponsive;
