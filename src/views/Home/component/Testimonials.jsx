import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import { Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";
import InfinityHorizontalScroll from "./InfinityHorizontalScroll";

export default function Testimonials({ contentClass }) {
	const { t } = useTranslation();

	const testimonials = [
		[
			{
				name: "Nguyễn Minh Anh",
				username: "@minhanh",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Khóa học Forex của TradeMaster thực sự tuyệt vời! Các video bài giảng rất dễ hiểu, từ cơ bản đến nâng cao. Tôi đã áp dụng được kiến thức vào trading thực tế và có lợi nhuận ổn định sau 3 tháng học.",
			},
			{
				name: "Trần Quang Huy",
				username: "@quanghuy",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Các bài viết về phân tích kỹ thuật crypto của TradeMaster rất chất lượng. Giảng viên giải thích rõ ràng các indicator, pattern chart và psychology trading. Tôi đã hiểu rõ hơn về thị trường và cải thiện đáng kể kết quả giao dịch Bitcoin và Ethereum.",
			},
		],

		[
			{
				name: "Lê Thị Mai",
				username: "@thimai",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Khóa học Fintech và blockchain của TradeMaster mở ra tầm nhìn mới về tương lai tài chính. Video bài giảng về DeFi, NFT và smart contract được trình bày một cách dễ hiểu. Tôi đã có thể tự tin đầu tư vào các dự án DeFi sau khi hoàn thành khóa học.",
			},
			{
				name: "Phạm Văn Nam",
				username: "@vannam",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Series bài viết về risk management trong trading forex của TradeMaster rất hữu ích. Tôi đã học được cách quản lý vốn, đặt stop loss hiệu quả và kiểm soát cảm xúc khi giao dịch. Portfolio của tôi đã ổn định hơn nhiều.",
			},
		],

		[
			{
				name: "Hoàng Thị Lan",
				username: "@thilan",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Nội dung về cryptocurrency analysis của TradeMaster rất cập nhật và chính xác. Các video phân tích altcoin, market trend và on-chain data giúp tôi đưa ra quyết định đầu tư thông minh. Đặc biệt ấn tượng với series về trading psychology.",
			},
			{
				name: "Đỗ Minh Tuấn",
				username: "@minhtuan",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"TradeMaster có bộ tài liệu trading forex hoàn chỉnh nhất mà tôi từng thấy. Từ scalping, swing trading đến position trading đều được giải thích chi tiết qua video và bài viết. Community support cũng rất nhiệt tình!",
			},
		],
	];

	// Create duplicated testimonials for seamless looping
	const duplicatedTestimonials = testimonials.map((row) => [...row, ...row, ...row, ...row]);

	return (
		<div className="relative bg-gray-100/90 text-white w-full flex items-center justify-center h-full">
			<div
				className={classNames(
					"relative w-full flex items-center justify-center max-w-[1440px] h-full",
					{ [contentClass]: contentClass },
				)}
			>
				{/* Absolutely positioned title with box shadow */}
				<div className="absolute inset-10 md:inset-0 z-10 m-auto aspect-[1051/375] w-full max-w-[1051px] rounded-[300px]  blur-[97px] bg-white/80"></div>
				<div className="absolute inset-10 md:inset-0 z-20 m-auto aspect-[639/229] w-full max-w-[639px] rounded-[300px] blur-[52px] bg-white/80"></div>
				<div className="absolute inset-10 md:inset-0 flex items-center justify-center">
					<h2 className="z-30 w-full max-w-[600px] text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold  bg-gradient-to-r from-green-400 via-light-blue-gray to-blue-500 bg-clip-text text-transparent text-center px-6 py-4 sm:px-8 sm:py-5 md:px-[30px] md:py-[25px] rounded-[10px]">
						{t("testimonials.title")}
					</h2>
				</div>

				{/* Testimonial rows with horizontal infinite scroll */}
				<div className="flex flex-col gap-4 mt-8 mb-8 w-full relative h-full md:h-auto">
					<InfinityHorizontalScroll
						scrollSpeed={50000}
						height={300}
					>
						{duplicatedTestimonials[0].map((testimonial, index) => (
							<TestimonialCard
								testimonial={testimonial}
								key={`row1-${index}`}
							/>
						))}
					</InfinityHorizontalScroll>
					<InfinityHorizontalScroll
						scrollSpeed={50000}
						height={300}
						isRevert
					>
						{duplicatedTestimonials[1].map((testimonial, index) => (
							<TestimonialCard
								testimonial={testimonial}
								key={`row2-${index}`}
							/>
						))}
					</InfinityHorizontalScroll>
					<InfinityHorizontalScroll
						scrollSpeed={50000}
						height={300}
					>
						{duplicatedTestimonials[2].map((testimonial, index) => (
							<TestimonialCard
								testimonial={testimonial}
								key={`row3-${index}`}
							/>
						))}
					</InfinityHorizontalScroll>
				</div>
			</div>
		</div>
	);
}

// Testimonial card component
function TestimonialCard({ testimonial }) {
	const { t } = useTranslation();

	return (
		<Card className="bg-white text-white shadow-md h-[300px] w-[400px] border border-white/[0.08] rounded-xl relative overflow-hidden group transition-all duration-500 hover:shadow-xl">
			<div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

			<CardContent className="p-6 relative z-10">
				<div className="flex items-start space-x-4">
					<Avatar className="border-2 border-white/[0.3] group-hover:border-blue-400/50 transition-colors duration-300">
						<AvatarImage
							src={testimonial.avatar || "/placeholder.svg"}
							alt={testimonial.name}
						/>
						<AvatarFallback className="bg-dark-gray text-white">
							{testimonial.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium text-black group-hover:text-blue-800 transition-colors duration-300">
							{testimonial.name}
						</div>
						<div className="text-sm text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
							{testimonial.username}
						</div>
					</div>
				</div>
				<p className="mt-4 text-gray-900 leading-relaxed line-clamp-4 group-hover:text-gray-800 transition-colors duration-300">
					{testimonial.content}
				</p>
				<div className="mt-4 flex items-center space-x-4 text-gray-400 text-sm">
					<button className="hover:text-blue-600 transition-colors duration-300 group-hover:text-gray-600">
						{t("testimonials.actions.reply")}
					</button>
					<button className="hover:text-purple-600 transition-colors duration-300 group-hover:text-gray-600">
						{t("testimonials.actions.share")}
					</button>
					<button className="hover:text-teal-600 transition-colors duration-300 group-hover:text-gray-600">
						<Ellipsis size={18} />
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
