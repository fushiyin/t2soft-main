import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import classNames from "classnames";
import { Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";
import InfinityHorizontalScroll from "./InfinityHorizontalScroll";

export default function Testimonials({ contentClass }) {
	const { t } = useTranslation();

	// Testimonial data
	const testimonials = [
		// First row (scrolls right to left)
		[
			{
				name: "Kim Ji Won",
				username: "@kjw",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					" T2 Soft delivered beyond our expectations. Their team was responsive, professional, and deeply knowledgeable.",
			},
			{
				name: "Shine",
				username: "@shine",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"Working with T2 Soft was a game-changer for our technical transformation. Their team was proactive, communicative, and technically sound. They didn’t just follow our requirements — they enhanced them with smart suggestions that improved both user experience and system performance.",
			},
		],

		// Second row (scrolls left to right)
		[
			{
				name: "Lee Hoon",
				username: "@leehoon",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"The T2 Soft team brought our vision to life with professionalism and agility. Their understanding of modern frameworks and attention to detail helped us launch a stable, scalable web platform on time. We look forward to future collaborations.",
			},
			{
				name: "Jong Bok",
				username: "@jongbok",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"T2 Soft delivered not just a product, but a complete solution. They took the time to understand our goals and provided valuable input throughout the development cycle. The final system was efficient, user-friendly, and exceeded our expectations.",
			},
		],

		// Third row (scrolls right to left)
		[
			{
				name: "Lee Kang",
				username: "@leekang",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"We were amazed by how T2 Soft balanced speed and reliability. Even with tight deadlines, their team ensured a stable rollout and provided responsive technical support throughout the entire process.",
			},
			{
				name: "Kim dade",
				username: "@dade",
				avatar: "/placeholder.svg?height=40&width=40",
				content:
					"From planning to deployment, T2 Soft worked with agility and precision. The system was up and running smoothly, and their technical support team was always available when we needed them!'",
			},
		],
	];

	// Create duplicated testimonials for seamless looping
	const duplicatedTestimonials = testimonials.map((row) => [...row, ...row, ...row, ...row]);

	return (
		<div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white w-full flex items-center justify-center h-full">
			<div
				className={classNames(
					"relative w-full flex items-center justify-center max-w-[1440px] h-full",
					{ [contentClass]: contentClass },
				)}
			>
				{/* Absolutely positioned title with box shadow */}
				<div className="absolute inset-10 md:inset-0 z-10 m-auto aspect-[1051/375] w-full max-w-[1051px] rounded-[300px]  blur-[97px] bg-dark-gray/80"></div>
				<div className="absolute inset-10 md:inset-0 z-20 m-auto aspect-[639/229] w-full max-w-[639px] rounded-[300px] blur-[52px] bg-dark-gray/80"></div>
				<div className="absolute inset-10 md:inset-0 flex items-center justify-center">
					<h2 className="z-30 w-full max-w-[600px] text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold  bg-gradient-to-r from-light-blue via-light-blue-gray to-pale-blue bg-clip-text text-transparent text-center px-6 py-4 sm:px-8 sm:py-5 md:px-[30px] md:py-[25px] rounded-[10px]">
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
		<Card className="bg-via-gray text-white shadow-md h-[300px] w-[400px] border border-white/[0.08] rounded-xl">
			<CardContent className="p-6">
				<div className="flex items-start space-x-4">
					<Avatar className="border-2 border-white/[0.3]">
						<AvatarImage
							src={testimonial.avatar || "/placeholder.svg"}
							alt={testimonial.name}
						/>
						<AvatarFallback className="bg-dark-gray text-white">
							{testimonial.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium text-white">{testimonial.name}</div>
						<div className="text-sm text-gray-400">{testimonial.username}</div>
					</div>
				</div>
				<p className="mt-4 text-gray-300 leading-relaxed line-clamp-4">
					{testimonial.content}
				</p>
				<div className="mt-4 flex items-center space-x-4 text-gray-400 text-sm">
					<button className="hover:text-gray-200 transition-colors">
						{t("testimonials.actions.reply")}
					</button>
					<button className="hover:text-gray-200 transition-colors">
						{t("testimonials.actions.share")}
					</button>
					<button className="hover:text-gray-200 transition-colors">
						<Ellipsis size={18} />
					</button>
				</div>
			</CardContent>
		</Card>
	);
}
