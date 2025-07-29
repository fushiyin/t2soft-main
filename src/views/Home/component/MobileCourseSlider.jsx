import React from "react";

function MobileCourseSlider({
	courses,
	active,
	setActive,
	handlePrev,
	handleNext,
	isAnimating,
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd,
}) {
	return (
		<div className="w-full max-w-sm mx-auto">
			{/* Mobile Course Cards Container */}
			<div
				className="relative h-[600px] overflow-hidden rounded-3xl"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{courses.map((course, index) => {
					const isActive = index === active;
					let position = "translate-x-full opacity-0 scale-95";
					if (isActive) position = "translate-x-0 opacity-100 scale-100";

					return (
						<div
							key={course.id}
							className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${position}`}
						>
							{/* Mobile Course Card */}
							<div className="w-full h-full bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
								{/* Mobile Image Section */}
								<div className="h-56 relative overflow-hidden group">
									<div className="relative w-full h-full">
										<img
											src={course.thumbnail}
											alt={course.title}
											className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
											loading="lazy"
											style={{ aspectRatio: '16/9' }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
									</div>

									{/* Mobile badges */}
									<div className="absolute top-3 left-3">
										<div className="inline-flex items-center bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-white font-medium text-xs border border-white/20">
											<svg
												className="w-3 h-3 mr-1 text-red-400"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
											</svg>
											{course.videoCount}
										</div>
									</div>

									<div className="absolute bottom-3 left-3">
										<div className="inline-flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
											PREMIUM 0{index + 1}
										</div>
									</div>
								</div>

								{/* Mobile Content Section */}
								<div className="p-6 flex flex-col justify-between h-80">
									<div className="space-y-4">
										{/* Mobile title */}
										<h2 className="text-xl font-black text-gray-900 leading-tight line-clamp-2">
											{course.title}
										</h2>

										{/* Mobile description */}
										<p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
											{course.description}
										</p>

										{/* Mobile tags */}
										<div className="flex flex-wrap gap-2">
											<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
												Beginner
											</span>
											<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
												Certificate
											</span>
										</div>
									</div>

									{/* Mobile metadata */}
									<div className="space-y-3 mt-4">
										<div className="flex items-center justify-between text-xs text-gray-500">
											<div className="flex items-center">
												<div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-2">
													<svg
														className="w-3 h-3"
														fill="currentColor"
														viewBox="0 0 20 20"
													>
														<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0z" />
													</svg>
												</div>
												<span className="font-medium">
													{course.channelTitle}
												</span>
											</div>
											<span>
												{new Date(course.publishedAt).getFullYear()}
											</span>
										</div>

										{/* Mobile action button */}
										<button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 flex items-center justify-center">
											<svg
												className="w-4 h-4 mr-2"
												fill="currentColor"
												viewBox="0 0 20 20"
											>
												<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
											</svg>
											Start Learning
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Mobile Navigation */}
			<div className="flex items-center justify-center space-x-6 mt-8">
				<button
					onClick={handlePrev}
					disabled={isAnimating || courses.length <= 1}
					className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 active:scale-95"
					}`}
				>
					<svg
						className="w-5 h-5 text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				<div className="flex space-x-2">
					{courses.map((_, index) => (
						<button
							key={index}
							onClick={() => !isAnimating && setActive(index)}
							disabled={isAnimating}
							className={`w-3 h-3 rounded-full transition-all duration-300 ${
								active === index
									? "bg-white scale-125"
									: "bg-white/30 hover:bg-white/50"
							}`}
						/>
					))}
				</div>

				<button
					onClick={handleNext}
					disabled={isAnimating || courses.length <= 1}
					className={`w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 active:scale-95"
					}`}
				>
					<svg
						className="w-5 h-5 text-white"
						fill="currentColor"
						viewBox="0 0 20 20"
					>
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default MobileCourseSlider;
