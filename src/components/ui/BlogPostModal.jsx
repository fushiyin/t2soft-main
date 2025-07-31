import React, { useState, useEffect } from "react";
import BlogPostMobile from "./BlogPostMobile";
import BlogPostDesktop from "./BlogPostDesktop";

const BlogPostModal = ({ post, isOpen, onClose }) => {
	if (!post) return null;

	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const formatDate = (dateString) => {
		return new Date(dateString * 1000).toLocaleDateString("vi-VN", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	const handleShare = () => {
		const currentUrl = window.location.href;

		if (navigator.share) {
			navigator.share({
				title: post.title,
				text: post.content?.substring(0, 200) + "...",
				url: currentUrl,
			});
		} else {
			navigator.clipboard.writeText(currentUrl).then(() => {
				alert("Đã sao chép link bài viết!");
			});
		}
	};

	if (isMobile) {
		return (
			<BlogPostMobile
				post={post}
				isOpen={isOpen}
				onClose={onClose}
				formatDate={formatDate}
				handleShare={handleShare}
			/>
		);
	}

	return (
		<BlogPostDesktop
			post={post}
			isOpen={isOpen}
			onClose={onClose}
			formatDate={formatDate}
			handleShare={handleShare}
		/>
	);
};

export default BlogPostModal;
