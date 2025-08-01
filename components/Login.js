import React, { useState } from "react";
import { loginWithEmailAndPassword } from "../utils/firebaseAuth";
import { saveUserToLocalStorage } from "../utils/localStorage";

const Login = () => {
	const [credentials, setCredentials] = useState({ username: "", password: "" });
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const result = await loginWithEmailAndPassword(
				credentials.username,
				credentials.password,
			);

			if (result.success) {
				saveUserToLocalStorage(result.user);
			} else {
				setError(result.error || "Login failed");
			}
		} catch (error) {
			console.error("Login failed:", error);
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<div>
					<label>Username</label>
					<input
						type="text"
						name="username"
						value={credentials.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={credentials.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error && <div className="error">{error}</div>}
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
