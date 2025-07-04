import "lenis/dist/lenis.css";
import { ReactLenis } from "lenis/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ReactLenis root />
		<App />
	</StrictMode>,
);
