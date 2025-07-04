import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export default function CTA() {
	const { t } = useTranslation();

	return (
		<div className="w-full h-full flex items-center justify-center bg-muted/50 py-16">
			<div className="flex flex-col items-center justify-center space-y-4 text-center">
				<div className="space-y-2">
					<h2 className="px-4 md:px-0 text-4xl font-bold tracking-tighter md:text-5xl font-sans break-keep whitespace-normal break-words">
						{t("contact_cta.title")}
					</h2>
					<p className="max-w-[900px] px-4 text-xl text-muted-foreground md:text-2xl/relaxed  font-sans break-keep whitespace-normal break-words">
						{t("contact_cta.description")}
					</p>
				</div>
				<div className="flex flex-col gap-2 min-[400px]:flex-row">
					<Button
						asChild
						size="lg"
						className="text-base px-4 py-2"
					>
						<Link
							to="/contact"
							className="flex items-center gap-2"
						>
							{t("contact.title")} <ArrowRightIcon className="h-4 w-4" />
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="text-base px-4 py-2"
					>
						<Link to="/services">{t("contact_cta.services_button")}</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
