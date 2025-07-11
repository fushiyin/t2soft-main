import React, { useEffect, useRef, useState } from "react";
import video from "@/assets/video/trading.mp4";

const TEXT = "NEO AKA THE HUNG";
const SLOGAN = "Đừng mãi mãi làm trader.";

function MyHero() {
	const [showSlogan, setShowSlogan] = useState(false);
	const [moveUp, setMoveUp] = useState(false);
	const lastLetterRef = useRef(null);

	useEffect(() => {
		if (lastLetterRef.current) {
			lastLetterRef.current.addEventListener(
				"animationend",
				() => {
					setMoveUp(true);
					setTimeout(() => setShowSlogan(true), 400);
				},
				{ once: true },
			);
		}
	}, []);

	return (
		<div className="relative w-full h-[55vh] sm:h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-black px-2 sm:px-4">
			<video
				src={video}
				autoPlay
				loop
				muted
				playsInline
				className="absolute inset-0 w-full h-full object-cover z-0 blur-[1.5px] sm:blur-[2px] md:blur-[2.5px] scale-105 sm:scale-105 md:scale-105"
			/>
			<div className="absolute inset-0 z-10 pointer-events-none bg-blur-[2px] sm:blur-[3px] md:blur-[4px] opacity-50" />
			<div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
				<h1
					className={`text-2xl xs:text-3xl sm:text-4xl md:text-7xl font-extrabold text-white text-center tracking-widest flex flex-wrap justify-center transition-transform duration-700 cinematic-outline px-1 xs:px-2 sm:px-4 ${moveUp ? "translate-y-[-32px] sm:translate-y-[-60px] md:translate-y-[-90px]" : ""}`}
					style={{ wordBreak: "break-word", lineHeight: 1.1, maxWidth: "100vw" }}
				>
					{TEXT.split("").map((char, i) => {
						const isLast = i === TEXT.length - 1;
						return (
							<span
								key={i}
								className="inline-block cinematic-flip"
								style={{
									display: char === " " ? "inline-block" : undefined,
									animationDelay: `${i * 0.08 + 0.2}s`,
								}}
								ref={isLast ? lastLetterRef : undefined}
							>
								{char === " " ? "\u00A0" : char}
							</span>
						);
					})}
				</h1>
				{showSlogan && (
					<div
						className="mt-4 sm:mt-6 md:mt-10 text-base xs:text-lg sm:text-xl md:text-3xl font-semibold text-center animate-slogan-fade-in cinematic-slogan px-2 xs:px-4"
						style={{ maxWidth: "95vw", wordBreak: "break-word" }}
					>
						{SLOGAN}
					</div>
				)}
			</div>
			<style>{`
			@media (max-width: 640px) {
				.cinematic-outline {
					-webkit-text-stroke: 1px #1a73e8;
					text-stroke: 1px #1a73e8;
					font-size: 2rem !important;
				}
				.cinematic-slogan {
					font-size: 1.1rem !important;
				}
			}
			@keyframes cinematic-flip {
				0% {
					transform: rotateY(90deg) scale(0.8);
					opacity: 0;
				}
				60% {
					transform: rotateY(-20deg) scale(1.1);
					opacity: 1;
				}
				80% {
					transform: rotateY(10deg) scale(0.98);
				}
				100% {
					transform: rotateY(0deg) scale(1);
					opacity: 1;
				}
			}
			.cinematic-flip {
				display: inline-block;
				animation: cinematic-flip 0.7s cubic-bezier(0.23, 1.02, 0.36, 1) both;
				will-change: transform, opacity;
				backface-visibility: hidden;
			}
			.cinematic-outline {
				-webkit-text-stroke: 2px #1a73e8;
				text-stroke: 2px #1a73e8;
				color: #fff;
				text-shadow: none;
			}
			@keyframes slogan-fade-in {
				0% { opacity: 0; transform: translateY(30px) scale(0.98); }
				100% { opacity: 1; transform: translateY(0) scale(1); }
			}
			.animate-slogan-fade-in {
				animation: slogan-fade-in 0.8s cubic-bezier(0.23, 1.02, 0.36, 1) both;
			}
			.cinematic-slogan {
				color: #60a5fa;
				text-shadow: 0 6px 24px #0a1020cc;
				letter-spacing: 0.04em;
			}
			`}</style>
		</div>
	);
}

export default MyHero;
