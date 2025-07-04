import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
	const cursorRef = useRef(null);
	const canvasRef = useRef(null);
	const position = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
	const trails = useRef([]);
	const requestRef = useRef();

	useEffect(() => {
		// Create a canvas element for trails
		const canvas = document.createElement("canvas");
		canvas.style.position = "fixed";
		canvas.style.top = 0;
		canvas.style.left = 0;
		canvas.style.width = "100vw";
		canvas.style.height = "100vh";
		canvas.style.pointerEvents = "none";
		canvas.style.zIndex = "9997";

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		document.body.appendChild(canvas);
		canvasRef.current = canvas;
		const ctx = canvas.getContext("2d");

		// Animate cursor
		const moveCursor = (x, y) => {
			gsap.to(cursorRef.current, {
				duration: 0.15,
				ease: "power3.out",
				x: x - 16,
				y: y - 16,
			});
		};

		// Add a new trail
		const addTrail = (x, y) => {
			trails.current.push({ x, y, alpha: 1, radius: 6 });
		};

		// Animation loop
		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update and draw each trail
			trails.current = trails.current.filter((trail) => trail.alpha > 0.01);

			for (let trail of trails.current) {
				trail.alpha *= 0.92;
				trail.radius += 0.2;

				ctx.beginPath();
				ctx.arc(trail.x, trail.y, trail.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(76, 74, 74, ${trail.alpha * 0.2})`;
				ctx.fill();
			}

			requestRef.current = requestAnimationFrame(animate);
		};

		// Start animation loop
		requestRef.current = requestAnimationFrame(animate);

		const handleMouseMove = (e) => {
			position.current = { x: e.clientX, y: e.clientY };
			moveCursor(e.clientX, e.clientY);
			addTrail(e.clientX, e.clientY);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("resize", () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		});

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			cancelAnimationFrame(requestRef.current);
			if (canvasRef.current) {
				canvasRef.current.remove();
			}
		};
	}, []);

	return (
		<div
			ref={cursorRef}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: 32,
				height: 32,
				borderRadius: "50%",
				pointerEvents: "none",
				mixBlendMode: "difference",
				border: "1px solid #a09898",
				backgroundColor: "rgba(76, 74, 74, 0.6)",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				zIndex: 9999,
				transform: "translate3d(0,0,0)",
				willChange: "transform",
			}}
		/>
	);
};

export default CustomCursor;
