import Lenis from "lenis";
import { useEffect, useRef } from "react";

const LenisProvider = ({ children }) => {
	const lenisRef = useRef(null);

	useEffect(() => {
		// Initialize Lenis for smooth scrolling
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			wheelMultiplier: 1,
			smoothTouch: false, // Disable smooth scrolling on touch devices for better performance
			touchMultiplier: 2,
		});

		// Store the lenis instance
		lenisRef.current = lenis;

		// Set up the RAF loop
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		// Start the animation frame loop
		requestAnimationFrame(raf);

		// Clean up
		return () => {
			lenis.destroy();
		};
	}, []);

	return <>{children}</>;
};

export default LenisProvider;
