import React from "react";

function DesktopCourseSlider({
	courses,
	active,
	setActive,
	handlePrev,
	handleNext,
	isAnimating,
	slideDirection,
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd,
}) {
	return (
		<div className="w-full">
			{/* Desktop Course Cards Container */}
			<div
				className="relative h-[600px] overflow-hidden rounded-3xl"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
			>
				{courses.map((course, index) => {
					const isActive = index === active;
					let position = "translate-x-full opacity-0 scale-90";
					if (isActive) position = "translate-x-0 opacity-100 scale-100";

					return (
						<div
							key={course.id}
							className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${position} ${
								slideDirection === "left" && isAnimating && isActive
									? "animate-slideInLeft"
									: ""
							} ${
								slideDirection === "right" && isAnimating && isActive
									? "animate-slideInRight"
									: ""
							}`}
						>
							{/* Desktop Course Card */}
							<div className="w-full h-full bg-gradient-to-br from-white/98 to-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/40">
								<div className="flex flex-row h-full">
									{/* Desktop Image Section */}
									<div className="w-3/5 relative overflow-hidden group">
										<div className="relative w-full h-full">
											<img
												src={course.thumbnail}
												alt={course.title}
												className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
												loading="lazy"
												style={{
													aspectRatio: "16/9",
													minHeight: "100%",
													objectPosition: "center center",
												}}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
											<div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
										</div>

										{/* Desktop badges */}
										<div className="absolute top-4 left-4">
											<div className="inline-flex items-center bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-white font-medium text-xs border border-white/20 shadow-lg">
												<svg
													className="w-3 h-3 mr-1.5 text-red-400"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z" />
												</svg>
												{course.videoCount} Videos
											</div>
										</div>

										<div className="absolute bottom-4 left-4">
											<div className="inline-flex items-center bg-green-500/90 backdrop-blur-md rounded-full px-3 py-1 text-white font-medium text-xs shadow-lg">
												<span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
												Active Course
											</div>
										</div>

										{/* Desktop play button overlay */}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
												<svg
													className="w-8 h-8 text-white ml-1"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
												</svg>
											</div>
										</div>
									</div>

									{/* Desktop Content Section */}
									<div className="w-2/5 p-10 flex flex-col justify-between">
										{/* ...existing desktop content code... */}
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div className="inline-flex items-center bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
													Free
												</div>
												<div className="text-sm text-gray-400 font-medium">
													Course {index + 1} of {courses.length}
												</div>
											</div>

											<h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight tracking-tight">
												{course.title}
											</h2>

											<div className="space-y-3">
												<p className="text-lg text-gray-600 leading-relaxed line-clamp-3">
													{course.description}
												</p>
											</div>
										</div>

										<div className="space-y-4 mt-6">
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div className="flex items-center text-gray-500">
													<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
														</svg>
													</div>
													<div>
														<div className="font-medium text-gray-700">
															{course.channelTitle}
														</div>
														<div className="text-xs text-gray-400">
															Instructor
														</div>
													</div>
												</div>
												<div className="flex items-center text-gray-500">
													<div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
														<svg
															className="w-4 h-4"
															fill="currentColor"
															viewBox="0 0 20 20"
														>
															<path
																fillRule="evenodd"
																d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
																clipRule="evenodd"
															/>
														</svg>
													</div>
													<div>
														<div className="font-medium text-gray-700">
															{new Date(
																course.publishedAt,
															).toLocaleDateString("en-US", {
																month: "short",
																day: "numeric",
																year: "numeric",
															})}
														</div>
														<div className="text-xs text-gray-400">
															Updated
														</div>
													</div>
												</div>
											</div>

											<button className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center group">
												<svg
													className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform"
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
						</div>
					);
				})}
			</div>

			{/* Desktop Navigation */}
			<div className="flex items-center justify-center space-x-8 mt-12">
				<button
					onClick={handlePrev}
					disabled={isAnimating || courses.length <= 1}
					className={`group w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-lg ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 hover:scale-110 active:scale-95 hover:shadow-xl"
					}`}
				>
					<svg
						className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1"
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

				<div className="flex space-x-3">
					{courses.map((_, index) => (
						<button
							key={index}
							onClick={() => !isAnimating && setActive(index)}
							disabled={isAnimating}
							className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${
								active === index
									? "bg-white scale-125 shadow-white/50"
									: "bg-white/30 hover:bg-white/50 hover:scale-110 border border-white/20"
							} ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
						/>
					))}
				</div>

				<button
					onClick={handleNext}
					disabled={isAnimating || courses.length <= 1}
					className={`group w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-lg ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 hover:scale-110 active:scale-95 hover:shadow-xl"
					}`}
				>
					<svg
						className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
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

export default DesktopCourseSlider;
