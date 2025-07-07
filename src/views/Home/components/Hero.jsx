import background from "@/assets/image/background.avif";

export default function Hero() {
	return (
		<section
			className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black"
			style={{ background: `url(${background}) center/cover no-repeat` }}
		>
			<div className="absolute inset-0 bg-black/60 z-10" />
			<div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center">
				<h1
					className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl mb-4"
					style={{ letterSpacing: "-2px" }}
				>
					Look first <span className="text-[var(--accent)]">/</span> Then leap.
				</h1>
				<p className="text-white text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
					The best trades require research, then commitment.
				</p>
				<button className="bg-white text-black text-lg font-semibold rounded-2xl px-8 py-4 shadow-lg hover:bg-gray-100 transition mb-2">
					Get started for free
				</button>
				<div className="text-white text-base opacity-80">
					$0 forever, no credit card needed
				</div>
			</div>
		</section>
	);
}
