import React from "react";

function TabletCourseSlider({ 
	courses, 
	active, 
	setActive, 
	handlePrev, 
	handleNext, 
	isAnimating, 
	slideDirection,
	handleTouchStart,
	handleTouchMove,
	handleTouchEnd 
}) {
	if (!courses || courses.length === 0) {
		return (
			<div className="w-full max-w-4xl mx-auto">
				<div className="text-center text-white/70 py-20">
					<h3 className="text-xl font-bold mb-3 text-gray-200">No Courses Available</h3>
					<p className="text-lg text-gray-300">Please try again later.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-5xl mx-auto">
			{/* Course Counter for Tablet */}
			<div className="text-center mb-6">
				<div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-lg">
					<span className="text-white font-medium text-sm">
						{active + 1} of {courses.length} Courses
					</span>
				</div>
			</div>

			{/* Tablet Course Cards Container */}
			<div
				className="relative h-[450px] overflow-hidden rounded-3xl mb-8"
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
							className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${position} ${
								slideDirection === "left" && isAnimating && isActive ? "animate-slideInLeft" : ""
							} ${
								slideDirection === "right" && isAnimating && isActive ? "animate-slideInRight" : ""
							}`}
						>
							{/* Tablet Course Card */}
							<div className="w-full h-full bg-gradient-to-br from-white/96 to-white/92 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/30">
								<div className="flex flex-row h-full">
									{/* Tablet Image Section */}
									<div className="w-2/5 relative overflow-hidden group">
										<div className="relative w-full h-full">
											<img
												src={course.thumbnail}
												alt={course.title}
												className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
												loading="lazy"
												style={{ 
													aspectRatio: '16/9',
													minHeight: '100%',
													objectPosition: 'center center'
												}}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
											<div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
										</div>
										
										{/* Video count badge */}
										<div className="absolute top-4 left-4">
											<div className="inline-flex items-center bg-black/70 backdrop-blur-md rounded-full px-3 py-1.5 text-white font-medium text-sm border border-white/20 shadow-lg">
												<svg className="w-4 h-4 mr-1.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
													<path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 011-1h1a1 1 0 010 2H6a1 1 0 01-1-1zm6 1a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1z"/>
												</svg>
												{course.videoCount} Videos
											</div>
										</div>

										{/* Active indicator */}
										<div className="absolute bottom-4 left-4">
											<div className="inline-flex items-center bg-green-500/90 backdrop-blur-md rounded-full px-3 py-1 text-white font-medium text-xs shadow-lg">
												<span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
												Available Now
											</div>
										</div>

										{/* Play button overlay */}
										<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
											<div className="w-14 h-14 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
												<svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
													<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
												</svg>
											</div>
										</div>
									</div>

									{/* Tablet Content Section */}
									<div className="w-3/5 p-6 md:p-8 flex flex-col justify-between">
										<div className="space-y-4">
											<div className="flex items-center justify-between">
												<div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
													<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
													</svg>
													PREMIUM #{index + 1}
												</div>
												<div className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full">
													{index + 1} / {courses.length}
												</div>
											</div>

											{/* Title */}
											<h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight line-clamp-2">
												{course.title}
											</h2>

											{/* Description */}
											<p className="text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3">
												{course.description}
											</p>

											{/* Tags */}
											<div className="flex flex-wrap gap-2">
												<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
													<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
														<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
													</svg>
													Beginner
												</span>
												<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
													<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
													</svg>
													Certificate
												</span>
												<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
													<svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
														<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
													</svg>
													Lifetime
												</span>
											</div>
										</div>

										{/* Metadata and Action */}
										<div className="space-y-4 mt-4">
											<div className="grid grid-cols-2 gap-4 text-sm">
												<div className="flex items-center text-gray-500">
													<div className="w-7 h-7 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-2.5">
														<svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
															<path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
														</svg>
													</div>
													<div>
														<div className="font-semibold text-gray-700 text-sm leading-tight">{course.channelTitle}</div>
														<div className="text-xs text-gray-400">Instructor</div>
													</div>
												</div>
												<div className="flex items-center text-gray-500">
													<div className="w-7 h-7 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mr-2.5">
														<svg className="w-3.5 h-3.5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
															<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
														</svg>
													</div>
													<div>
														<div className="font-semibold text-gray-700 text-sm leading-tight">
															{new Date(course.publishedAt).toLocaleDateString('en-US', { 
																month: 'short', 
																year: 'numeric' 
															})}
														</div>
														<div className="text-xs text-gray-400">Updated</div>
													</div>
												</div>
											</div>

											{/* Action button */}
											<button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center group">
												<svg className="w-5 h-5 mr-2.5 group-hover:translate-x-0.5 transition-transform" fill="currentColor" viewBox="0 0 20 20">
													<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
												</svg>
												<span className="text-base">Start Learning</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Tablet Navigation */}
			<div className="flex items-center justify-center space-x-6">
				<button
					onClick={handlePrev}
					disabled={isAnimating || courses.length <= 1}
					className={`group w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-lg ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 hover:scale-110 active:scale-95"
					}`}
					aria-label="Previous Course"
				>
					<svg className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:-translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
					</svg>
				</button>

				<div className="flex space-x-2.5">
					{courses.map((_, index) => (
						<button
							key={index}
							onClick={() => !isAnimating && setActive(index)}
							disabled={isAnimating}
							className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 shadow-md ${
								active === index
									? "bg-white scale-125 shadow-white/50"
									: "bg-white/30 hover:bg-white/50 hover:scale-110 border border-white/20"
							} ${isAnimating ? "cursor-not-allowed" : "cursor-pointer"}`}
							aria-label={`Go to course ${index + 1}`}
						/>
					))}
				</div>

				<button
					onClick={handleNext}
					disabled={isAnimating || courses.length <= 1}
					className={`group w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-300 shadow-lg ${
						isAnimating || courses.length <= 1
							? "opacity-40 cursor-not-allowed"
							: "hover:bg-white/20 hover:scale-110 active:scale-95"
					}`}
					aria-label="Next Course"
				>
					<svg className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
						<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
					</svg>
				</button>
			</div>
		</div>
	);
}

export default TabletCourseSlider;
