import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/contexts/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ReactLenis root />
		<AuthProvider>
			<App />
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 4000,
					style: {
						background: '#1f2937',
						color: '#ffffff',
						border: '1px solid #374151',
					},
					success: {
						iconTheme: {
							primary: '#10b981',
							secondary: '#ffffff',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#ffffff',
						},
					},
				}}
			/>
		</AuthProvider>
	</StrictMode>,
);
