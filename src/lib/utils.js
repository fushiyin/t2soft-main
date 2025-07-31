import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}


// utils.ts or similar
export const smoothScrollTo = (targetY, duration = 500) => {
	const startY = window.scrollY || window.pageYOffset;
	const startTime = performance.now();

	const animateScroll = (currentTime) => {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
		const newY = startY + (targetY - startY) * ease;

		window.scrollTo(0, newY);

		if (progress < 1) {
			requestAnimationFrame(animateScroll);
		}
	};

	requestAnimationFrame(animateScroll);
};

export const scrollToTop = () => {
	smoothScrollTo(0, 500);
};

export const convertTimeToDate = (firestoreTimestamp) => {
	const seconds = firestoreTimestamp._seconds * 1000;
	const nanoseconds = Math.floor(firestoreTimestamp._nanoseconds / 1e6);
	const milliseconds = seconds + nanoseconds;
	const date = new Date(milliseconds);
	const options = { year: "numeric", month: "long", day: "numeric" };
	return date.toLocaleDateString("vi-VN", options);
};