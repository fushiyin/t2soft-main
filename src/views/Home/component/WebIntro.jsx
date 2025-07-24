import React from "react";
import { ArrowRight, Play, TrendingUp, Shield, Award, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useRole";
import { idRouter } from "@/routes/idRouter";
import video from "@/assets/video/hero-video.mp4";

const Hero = () => {
	const { user, isAdmin } = useAuth();

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				<video
					autoPlay
					muted
					loop
					playsInline
					className="w-full h-full object-cover"
					poster="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1920"
				>
					<source
						src={video}
						type="video/mp4"
					/>
					<source
						src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4"
						type="video/mp4"
					/>
					<img
						src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1920"
						alt="Trading Charts Background"
						className="w-full h-full object-cover"
					/>
				</video>
				<div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center max-w-5xl mx-auto">
					<h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
						<span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
							Master Trading
						</span>
						<br />
						<span className="bg-gradient-to-r from-green-400 via-green-300 to-blue-500 bg-clip-text text-transparent">
							Like a Pro
						</span>
					</h1>

					<p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
						Transform your financial future with our comprehensive Forex and
						Cryptocurrency courses. Join thousands of successful traders who've already
						mastered the markets.
					</p>

					<div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
						<button className="group bg-gradient-to-r from-green-400 to-green-500 text-gray-900 px-10 py-5 rounded-xl font-bold text-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-green-400/25">
							<span>Start Trading Today</span>
							<ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
						</button>
						
						{/* Admin Backoffice Access */}
						{isAdmin && (
							<Link
								to={`${idRouter.admin}/${idRouter.adminDashboard}`}
								className="group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-400 hover:to-purple-500 transition-all duration-300 flex items-center space-x-3 transform hover:scale-105 shadow-lg hover:shadow-purple-400/25 border border-purple-400/20"
							>
								<Settings className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
								<span>Admin Dashboard</span>
							</Link>
						)}
						
						{/* <button className="group border-2 border-white/30 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm">
              <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button> */}
					</div>

					{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="group text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-400 to-green-500 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">50,000+</h3>
              <p className="text-gray-400 text-lg">Successful Students</p>
              <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="group text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">98%</h3>
              <p className="text-gray-400 text-lg">Success Rate</p>
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-green-400 mx-auto mt-4 rounded-full"></div>
            </div>
            
            <div className="group text-center bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:bg-gray-800/70 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-3">5+</h3>
              <p className="text-gray-400 text-lg">Years Experience</p>
              <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-green-400 mx-auto mt-4 rounded-full"></div>
            </div>
          </div> */}
				</div>
			</div>
		</section>
	);
};

export default Hero;
