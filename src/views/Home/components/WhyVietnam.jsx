import bg_whyVietnam_2 from "@/assets/img/bg-text-why_vn.png";
import logo_t2 from "@/assets/logos/T2_light_Logo.png";
import HoverCard from "@/components/HoverCard";
import CourseCard from "@/components/cards/CourseCard";
import classNames from "classnames";
import { ArrowRight, Award, HandCoins, Handshake, HeartHandshakeIcon, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WhyVietnam() {
	const { t } = useTranslation();

	const item2 = t("why_vietnam.text_footer.title", { returnObjects: true });

	const [playlists, setPlaylists] = useState([
		{ playListId: "PLsGBXDsQw_r4-62k404iSBvPpixyPCI2u" },
		{ playListId: "PLsGBXDsQw_r4hwYSS27PqLR4M3lgFs2RE" },
		{ playListId: "PLsGBXDsQw_r6IIs2AAaauS0P_LrLgaaPP" },
		{ playListId: "PLsGBXDsQw_r4BRx4Edlk4MHuhzya6tPQD" },
	]);
	const [playlistData, setPlaylistData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchAllPlaylists();
	}, [playlists]);

	const fetchAllPlaylists = async () => {
		setLoading(true);
			setError(null);
			try {
				const results = await Promise.all(
					playlists.map(async (pl) => {
						const res = await axios.get(`/api/youtube/playlist?playlistId=${pl.playListId}&maxResults=1`);
						return { ...pl, data: res.data.items?.[0], total: res.data.pageInfo?.totalResults };
					})
				);
				console.log(results)
				setPlaylistData(results);
			} catch (e) {
				setError("Failed to fetch playlists");
			} finally {
				setLoading(false);
			}
	}

	const whyVietnam = [
		{
			title: t("why_vietnam.title"),
			description: t("why_vietnam.description"),
		},
	];

	return (
		<div className="flex flex-col pt-6 bg-home-transparent">
			<div className="w-full bg-white flex justify-center items-center">
				<div className="flex justify-center container h-full py-6 sm:py-10 px-4 sm:px-6 md:px-10 max-w-[1440px]">
					<div className="w-full">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
							{whyVietnam.map((item, idx) => (
								<HoverCard
									key={idx}
									icon={item.icon}
									title={item.title}
									description={item.description}
									className={classNames(
										"w-full flex flex-col items-center text-center p-4 sm:p-5",
										"rounded-xl shadow-md",
										"transition duration-300 hover:shadow-lg",
										item.icon ? "bg-gray-50" : "",
										"h-auto min-h-[200px] sm:min-h-[220px] md:min-h-[250px]",
									)}
								/>
							))}
							{/* Playlist HoverCards */}
							{loading ? (
								<div className="col-span-full text-center py-8">Loading playlists...</div>
							) : error ? (
								<div className="col-span-full text-center text-red-500 py-8">{error}</div>
							) : (
								playlistData.map((pl, idx) => (
									<CourseCard
									/>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full relative bg-white">
				<img
					src={bg_whyVietnam_2}
					alt=""
					className="absolute inset-0 w-full h-full object-cover z-0"
				/>
				<div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-10 min-h-[400px]">
					<div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-4">
						<img
							src={logo_t2}
							className="w-[140px] sm:w-[180px] md:w-[200px] object-cover"
							alt="Logo"
						/>
						<p className="text-dark-gray text-2xl sm:text-3xl md:text-4xl font-bold leading-normal max-w-[90%] text-center md:text-left font-sans break-keep whitespace-normal break-words">
							{item2.map((part, idx) => (
								<span
									key={idx}
									className={part.className}
									dangerouslySetInnerHTML={{ __html: part.text }}
								></span>
							))}
						</p>
					</div>
					<p className="text-dark-gray text-base sm:text-lg md:text-xl leading-loose max-w-[90%] md:max-w-[55%] text-center md:text-left mt-6 md:mt-0 font-sans break-keep whitespace-normal break-words">
						{t("why_vietnam.text_footer.desc")}
					</p>
				</div>
			</div>
		</div>
	);
}
