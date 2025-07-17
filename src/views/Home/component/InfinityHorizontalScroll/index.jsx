import classNames from "classnames";
import style from "./style.module.css";
function InfinityHorizontalScroll({
	scrollSpeed = 50000,
	children,
	height = 300,
	isRevert = false,
}) {
	return (
		<div
			className={classNames("flex w-full", {
				[style.scroll_wrapper]: !isRevert,
				[style.scroll_wrapper_revert]: isRevert,
				[`h-[${height}px]`]: height,
			})}
		>
			<div className="flex gap-3">
				<div
					className={classNames("flex gap-3", {
						[style.scroll_content]: true,
					})}
					style={{ "--scroll-speed": `${scrollSpeed}ms` }}
				>
					{children}
				</div>
				<div
					className={classNames("flex gap-3", {
						[style.scroll_content]: true,
					})}
					style={{ "--scroll-speed": `${scrollSpeed}ms` }}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default InfinityHorizontalScroll;
