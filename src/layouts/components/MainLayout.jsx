import { Suspense } from "react";
import { Outlet, useLocation } from "react-router";
import {
	ButtonScrollToTop,
	CustomLoading,
	Footer,
	Header,
	LenisProvider,
	Onboarding,
	OnboardingProvider,
} from "..";

export default function MainLayout() {
	const location = useLocation();

	return (
		<>
			<LenisProvider>
				<OnboardingProvider>
					<CustomLoading />
					<Onboarding />
					<main className="flex min-h-screen flex-col justify-between">
						<Header />
						<Suspense
							fallback={<CustomLoading defaultLoading />}
							key={location?.key}
						>
							<Outlet />
						</Suspense>
						<Footer />
					</main>
					<ButtonScrollToTop />
				</OnboardingProvider>
			</LenisProvider>
		</>
	);
}
