const DeviceMockup = ({ imageSrc, type }) => {
	if (type === "mobile") {
		return (
			<div className="w-[80px] sm:w-[90px] md:w-[110px] h-[160px] sm:h-[180px] md:h-[220px] bg-pure-black dark:bg-light-blue-gray rounded-[1rem] shadow-lg relative">
				<div className="w-8 sm:w-10 md:w-12 h-1.5 sm:h-1.5 md:h-2 bg-gray-800 rounded-md mx-auto mb-2" />
				<div className="w-full h-[calc(100%-2rem)] overflow-hidden rounded-[1rem]">
					<img
						src={imageSrc}
						alt="Mobile Screen"
						className="w-full h-full object-contain"
					/>
				</div>
			</div>
		);
	}

	if (type === "tablet") {
		return (
			<div className="w-[200px] sm:w-[240px] md:w-[280px] h-[140px] sm:h-[170px] md:h-[200px] border-[8px] sm:border-[10px] rounded-[1rem] overflow-hidden rotate-0 border-pure-black dark:border-light-blue-gray">
				<img
					src={imageSrc}
					alt="Tablet content"
					className="w-full h-full object-cover"
				/>
			</div>
		);
	}

	return (
		<div className="w-[240px] sm:w-[270px] md:w-[300px]">
			<div className="rounded-lg overflow-hidden shadow-lg bg-gray-200 h-[160px] sm:h-[180px] md:h-[200px] border-8 sm:border-10 border-pure-black dark:border-light-blue-gray">
				<img
					src={imageSrc}
					alt="Computer Screen"
					className="w-full h-full object-contain"
				/>
			</div>
			<div className="w-16 sm:w-18 md:w-20 h-3 sm:h-3.5 md:h-4 bg-pure-black dark:bg-light-blue-gray rounded-md mx-auto mt-2" />
		</div>
	);
};

export default DeviceMockup;
