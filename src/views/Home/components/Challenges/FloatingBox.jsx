import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FloatingBox = ({ children, className, duration = 0.6, order = 0 }) => {
	const { ref, inView } = useInView({
		triggerOnce: false, // ✅ kích hoạt lại nhiều lần khi cuộn
		threshold: 0.3,
	});

	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div
			ref={ref}
			className={className}
		>
			<motion.div
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
				variants={variants}
				transition={{
					duration,
					ease: "easeOut",
					delay: order * 0.1, // giữ thứ tự xuất hiện
				}}
				className="w-full h-full"
			>
				{children}
			</motion.div>
		</div>
	);
};

export default FloatingBox;
