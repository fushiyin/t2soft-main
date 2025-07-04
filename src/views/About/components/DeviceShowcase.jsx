import t2screen from "@/assets/img/t2_pc.png";
import t2screen_mobile from "@/assets/img/t2_mobile.png";
import t2screen_tablet from "@/assets/img/t2_tablet.png";
import DeviceMockup from "./DeviceMockup";

const DeviceShowcase = () => {
	return (
		<div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[60%]">
				<DeviceMockup imageSrc={t2screen} />
			</div>
			<div className="absolute left-[5%] top-[30%] z-20 w-[25%]">
				<DeviceMockup
					imageSrc={t2screen_mobile}
					type="mobile"
				/>
			</div>
			<div className="absolute right-[5%] top-[35%] z-20 w-[35%] hidden sm:block">
				<DeviceMockup
					imageSrc={t2screen_tablet}
					type="tablet"
				/>
			</div>
		</div>
	);
};

export default DeviceShowcase;
