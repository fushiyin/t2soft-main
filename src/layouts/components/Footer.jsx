import React from "react";
import logo from "@/assets/image/logo.png"; 
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  YoutubeIcon
} from 'lucide-react';

const links1 = [
  { label: "Explore", href: "#" },
  { label: "Glossary", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Changelog", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Brand colors", href: "#" },
];
const links2 = [
  { label: "Contact", href: "#" },
  { label: "Help center", href: "#" },
  { label: "Careers", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const Footer = () => (
  <footer className="bg-[#181818] mx-auto w-full text-gray-200 p-4">
    <div className="max-w-[1440px] mx-auto flex flex-col justify-between items-start md:items-center">
		<div className="flex gap-4 w-full items-center justify-center pt-8">
			<a href="#" className="bg-white rounded-full p-2 flex items-center justify-center hover:bg-gray-200 transition">
				<FacebookIcon className="text-black" />
			</a>
			<a href="#" className="bg-white rounded-full p-2 flex items-center justify-center hover:bg-gray-200 transition">
				<InstagramIcon className="text-black" />
			</a>
			<a href="#" className="bg-white rounded-full p-2 flex items-center justify-center hover:bg-gray-200 transition">
				<TwitterIcon className="text-black" />
			</a>
			<a href="#" className="bg-white rounded-full p-2 flex items-center justify-center hover:bg-gray-200 transition">
				<MailIcon className="text-black" />
			</a>
			<a href="#" className="bg-white rounded-full p-2 flex items-center justify-center hover:bg-gray-200 transition">
				<YoutubeIcon className="text-black" />
			</a>
		</div>
		<div className="flex items-center gap-4">
			<img src={logo} alt="Logo" className="h-20 w-auto" />
			<span className="text-xl md:text-2xl lg-text-3xl text-gray-100 font-medium">Đừng mãi mãi làm Trader</span>
		</div>
	  	<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-10 text-sm text-gray-400 gap-2">
			<span>© YourBrand 2024. All rights reserved</span>
		</div>
    </div>
    
  </footer>
);

export default Footer;