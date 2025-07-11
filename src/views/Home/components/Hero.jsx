import { useRef, useState } from "react";
import tradingVideo from "@/assets/video/trading.mp4";
import background from "@/assets/image/bg_2.webp";
import { Button } from "@/components/ui/button";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = () => {
		if (videoRef.current) {
			videoRef.current.play();
			setIsPlaying(true);
		}
	};

	const handlePause = () => {
		setIsPlaying(false);
	};

	return (
		<section
			className="relative w-full min-h-[80vh] flex flex-col justify-center overflow-hidden bg-home-transparent"
		>
			<div className="absolute inset-0 bg-home-transparent z-10" />
			<div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-6 py-16 gap-8">
				<div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
					<div className="bg-[var(--color-surface)]/95 dark:bg-[var(--color-secondary)]/95 rounded-2xl p-8 mb-8">
						<h1 className="font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight text-[var(--color-text-primary)] dark:text-[var(--color-background)] mb-4">
							Tradely is for traders and investors who like taking <span className="text-[var(--color-primary)]">risks</span>
						</h1>
						<p className="text-lg md:text-2xl text-[var(--color-text-muted)] mb-8">
							Trade on <span className="text-[var(--color-text-primary)] font-bold">Bitcoin, Gold, Oil, Apple, Tesla, crude oil</span> and <span className="text-[var(--color-text-primary)] font-bold">6,400+</span> other <span className="text-[var(--color-accent)] font-bold">world-renowned markets</span>.
						</p>
						<div className="flex flex-row gap-4 w-full max-w-lg">
							<Button
								className="bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white text-lg font-bold px-8 py-4 rounded-xl flex-1 border-0"
								size="lg"
							>
								Start Trading
							</Button>
							<Button
								variant="outline"
								className="border border-[var(--color-border)] text-[var(--color-primary)] text-lg font-bold px-8 py-4 rounded-xl flex-1 hover:bg-[var(--color-surface)] transition-all duration-200"
								size="lg"
							>
								Learn Trading
							</Button>
						</div>
					</div>
				</div>
				<div className="flex-1 flex items-center justify-center w-full max-w-xl relative min-h-[320px]">
					<div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-md border border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center">
						<video
							ref={videoRef}
							src={tradingVideo}
							className="w-full h-full object-cover"
							onPause={handlePause}
							onEnded={handlePause}
							controls={isPlaying}
							muted
							playsInline
							style={{ pointerEvents: isPlaying ? "auto" : "none" }}
						/>
						{!isPlaying && (
							<button
								className="absolute inset-0 flex items-center justify-center z-20 group"
								aria-label="Play video"
								onClick={handlePlay}
								tabIndex={0}
							>
								<span className="bg-[var(--color-surface)] rounded-full p-6 shadow group-hover:bg-[var(--color-accent)] transition">
									<FaPlay className="text-[var(--color-primary)] text-3xl group-hover:text-white" />
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
