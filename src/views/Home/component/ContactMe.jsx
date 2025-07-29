import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from "lucide-react";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
		// Reset form
		setFormData({ name: "", email: "", subject: "", message: "" });
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const contactInfo = [
		{
			icon: <Mail className="h-6 w-6" />,
			title: "Email",
			details: "support@t2soft.academy",
			description: "Send us an email anytime",
		},
		{
			icon: <Phone className="h-6 w-6" />,
			title: "Phone",
			details: "+84 (0) 123-456-789",
			description: "Mon-Fri from 8am to 6pm",
		},
		{
			icon: <MapPin className="h-6 w-6" />,
			title: "Address",
			details: "123 Tech Street, District 1",
			description: "Ho Chi Minh City, Vietnam",
		},
		{
			icon: <Clock className="h-6 w-6" />,
			title: "Support Hours",
			details: "24/7 Live Chat",
			description: "Always here to help",
		},
	];

	const supportChannels = [
		{
			icon: <MessageCircle className="h-8 w-8" />,
			title: "Live Chat",
			description: "Get instant help from our support team",
			action: "Start Chat",
			color: "from-blue-500 to-purple-600",
		},
		{
			icon: <Headphones className="h-8 w-8" />,
			title: "Phone Support",
			description: "Speak directly with our experts",
			action: "Call Now",
			color: "from-green-500 to-teal-600",
		},
		{
			icon: <Mail className="h-8 w-8" />,
			title: "Email Support",
			description: "Send us your questions anytime",
			action: "Send Email",
			color: "from-purple-500 to-pink-600",
		},
	];

	return (
		<section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
			{/* Enhanced Animated Background */}
			<div className="absolute inset-0">
				{/* Primary gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-teal-900/20"></div>

				{/* Animated orbs with better colors */}
				<div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-600/12 to-blue-600/12 rounded-full blur-3xl animate-pulse delay-500"></div>

				{/* Additional subtle orbs */}
				<div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-600/8 to-blue-500/8 rounded-full blur-2xl animate-pulse delay-700"></div>
				<div className="absolute bottom-10 left-1/3 w-48 h-48 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse delay-300"></div>

				{/* Subtle grid pattern */}
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
							backgroundSize: "50px 50px",
						}}
					></div>
				</div>
			</div>

			<div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20">
				{/* Header Section */}
				<div className="text-center mb-12 md:mb-16">
					<div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
						<MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
						Liên hệ với chúng tôi
					</h1>
					<p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
						Có câu hỏi về khóa học hoặc cần hỗ trợ? Chúng tôi ở đây để giúp bạn thành
						công.
					</p>
				</div>

				{/* Support Channels */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
					{supportChannels.map((channel, index) => (
						<div
							key={index}
							className="bg-white/8 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 text-center hover:bg-white/12 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
						>
							<div
								className={`bg-gradient-to-r ${channel.color} text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
							>
								{channel.icon}
							</div>
							<h3 className="text-xl font-bold text-white mb-3">{channel.title}</h3>
							<p className="text-gray-300 mb-6 leading-relaxed">
								{channel.description}
							</p>
							<button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
								{channel.action}
							</button>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{/* Contact Form */}
					<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
							<Send className="w-6 h-6 mr-3 text-blue-400" />
							Gửi tin nhắn cho chúng tôi
						</h2>
						<form
							onSubmit={handleSubmit}
							className="space-y-6"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-semibold text-gray-200 mb-2"
									>
										Họ và tên
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 placeholder-gray-400"
										placeholder="Nhập họ và tên của bạn"
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-semibold text-gray-200 mb-2"
									>
										Email
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300 placeholder-gray-400"
										placeholder="your@email.com"
										required
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-sm font-semibold text-gray-200 mb-2"
								>
									Chủ đề
								</label>
								<select
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all duration-300"
									required
								>
									<option
										value=""
										className="bg-gray-800 text-white"
									>
										Chọn chủ đề
									</option>
									<option
										value="course-inquiry"
										className="bg-gray-800 text-white"
									>
										Tư vấn khóa học
									</option>
									<option
										value="technical-support"
										className="bg-gray-800 text-white"
									>
										Hỗ trợ kỹ thuật
									</option>
									<option
										value="billing"
										className="bg-gray-800 text-white"
									>
										Thanh toán
									</option>
									<option
										value="partnership"
										className="bg-gray-800 text-white"
									>
										Hợp tác
									</option>
									<option
										value="other"
										className="bg-gray-800 text-white"
									>
										Khác
									</option>
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-sm font-semibold text-gray-200 mb-2"
								>
									Tin nhắn
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									rows={6}
									className="w-full bg-white/10 backdrop-blur-md text-white px-4 py-3 rounded-xl border border-white/20 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 resize-none transition-all duration-300 placeholder-gray-400"
									placeholder="Nhập tin nhắn của bạn..."
									required
								></textarea>
							</div>

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
							>
								<Send className="h-5 w-5" />
								<span>Gửi tin nhắn</span>
							</button>
						</form>
					</div>

					{/* Contact Information */}
					<div className="space-y-6 md:space-y-8">
						<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
								<Phone className="w-6 h-6 mr-3 text-green-400" />
								Thông tin liên hệ
							</h2>
							<div className="space-y-6">
								{contactInfo.map((info, index) => (
									<div
										key={index}
										className="flex items-start space-x-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300"
									>
										<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl shadow-lg">
											{info.icon}
										</div>
										<div className="flex-1">
											<h3 className="text-lg font-semibold text-white mb-1">
												{info.title}
											</h3>
											<p className="text-blue-300 font-medium mb-1">
												{info.details}
											</p>
											<p className="text-gray-300 text-sm">
												{info.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* FAQ Section */}
						<div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl">
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center">
								<MessageCircle className="w-6 h-6 mr-3 text-purple-400" />
								Câu hỏi thường gặp
							</h2>
							<div className="space-y-6">
								<div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
									<h3 className="text-lg font-semibold text-white mb-2 flex items-center">
										<div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
										Làm thế nào để truy cập khóa học?
									</h3>
									<p className="text-gray-300 leading-relaxed">
										Sau khi đăng ký, bạn sẽ nhận được thông tin đăng nhập để
										truy cập khóa học trên nền tảng học tập của chúng tôi.
									</p>
								</div>
								<div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
									<h3 className="text-lg font-semibold text-white mb-2 flex items-center">
										<div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
										Có được hoàn tiền không?
									</h3>
									<p className="text-gray-300 leading-relaxed">
										Có, chúng tôi cung cấp chính sách hoàn tiền trong 30 ngày
										cho tất cả khóa học nếu bạn không hài lòng.
									</p>
								</div>
								<div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
									<h3 className="text-lg font-semibold text-white mb-2 flex items-center">
										<div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
										Có được hướng dẫn cá nhân không?
									</h3>
									<p className="text-gray-300 leading-relaxed">
										Có, chúng tôi cung cấp các buổi hướng dẫn một-đối-một với
										các giảng viên chuyên gia cho học viên nâng cao.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
