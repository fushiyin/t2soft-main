import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AnimatedSection({
	children,
	className,
	variants,
	delay = 0,
	duration = 0.5,
	once = true,
	id,
}) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once, margin: "-100px 0px" });

	const defaultVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration,
				delay,
				ease: "easeOut",
			},
		},
	};

	const actualVariants = variants || defaultVariants;

	return (
		<motion.section
			id={id}
			ref={ref}
			className={className}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={actualVariants}
		>
			{children}
		</motion.section>
	);
}
