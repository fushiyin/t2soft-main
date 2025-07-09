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
			className="relative w-full min-h-[80vh] flex flex-col justify-center bg-black overflow-hidden"
			style={{ background: `url(${background}) center/cover no-repeat` }}
		>
			<div className="absolute inset-0 bg-black/70 z-10" />
			<div className="relative z-20 flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] mx-auto px-6 py-16 gap-8">
				<div className="flex-1 flex flex-col items-start justify-center max-w-2xl">
					<h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight">
						Tradely is for traders and
						<br />
						investors who like taking <span className="text-yellow-500">risks</span>
					</h1>
					<div className="flex flex-row gap-12 mb-8">
						<div>
							<div className="uppercase text-gray-400 text-xs mb-1">Features</div>
							<div className="text-white text-xl font-bold">Easy to use</div>
						</div>
						<div>
							<div className="uppercase text-gray-400 text-xs mb-1">
								access over to
							</div>
							<div className="text-white text-xl font-bold">4600+ markets</div>
						</div>
					</div>
					<div className="flex flex-row gap-4 mb-4 w-full max-w-lg">
						<Button
							className="bg-yellow-600 hover:bg-yellow-500 text-black text-lg font-bold px-8 py-4 rounded-md flex-1"
							size="lg"
						>
							Start Trading
						</Button>
						<Button
							variant="outline"
							className="border-white text-white text-lg font-bold px-8 py-4 rounded-md flex-1 hover:bg-white/10"
							size="lg"
						>
							Learn Trading
						</Button>
					</div>
					<div className="text-gray-300 text-xs mt-2">
						Trade on{" "}
						<span className="text-white font-bold">
							Bitcoin, Gold, Oil, Apple, Tesla, crude oil
						</span>{" "}
						and <span className="text-white font-bold">6,400+</span> other{" "}
						<span className="text-yellow-500 font-bold">world-renowned markets</span>.
					</div>
				</div>
				<div className="flex-1 flex items-center justify-center w-full max-w-xl relative min-h-[320px]">
					<div className="w-full aspect-video rounded-2xl overflow-hidden relative shadow-2xl border-2 border-white/10 bg-black/60 flex items-center justify-center">
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
								<span className="bg-white/80 rounded-full p-6 shadow-lg group-hover:bg-yellow-500 transition">
									<FaPlay className="text-yellow-600 text-3xl group-hover:text-white" />
								</span>
							</button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
