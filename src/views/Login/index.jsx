import { motion } from "framer-motion";
import FormLogin from "./FormLogin";

const Login = () => {
	return (
		<>
			<div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] relative overflow-hidden">
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="w-full z-10 flex justify-center"
				>
					<FormLogin />
				</motion.div>
			</div>
		</>
	);
};

export default Login;
