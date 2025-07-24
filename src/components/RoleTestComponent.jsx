import React from "react";
import { useRole } from "@/hooks/useRole";
import { useAuth } from "@/hooks/useRole";

const RoleTestComponent = () => {
	const { user, userProfile, loading } = useAuth();
	const { role, isAdmin, isInstructor, isStudent } = useRole();

	if (loading) {
		return <div className="p-4">Loading user data...</div>;
	}

	if (!user) {
		return <div className="p-4">Please log in to see role information.</div>;
	}

	return (
		<div className="p-6 bg-gray-800 text-white rounded-lg m-4">
			<h2 className="text-xl font-bold mb-4">User Role Information</h2>

			<div className="space-y-2">
				<p>
					<strong>Email:</strong> {user.email}
				</p>
				<p>
					<strong>Display Name:</strong> {user.displayName || "Not set"}
				</p>
				<p>
					<strong>Email Verified:</strong> {user.emailVerified ? "✅ Yes" : "❌ No"}
				</p>

				{userProfile && (
					<>
						<p>
							<strong>Role:</strong>{" "}
							<span
								className={`px-2 py-1 rounded text-sm font-semibold ${
									isAdmin
										? "bg-red-600"
										: isInstructor
											? "bg-blue-600"
											: isStudent
												? "bg-green-600"
												: "bg-gray-600"
								}`}
							>
								{role}
							</span>
						</p>
						<p>
							<strong>First Name:</strong> {userProfile.firstName}
						</p>
						<p>
							<strong>Last Name:</strong> {userProfile.lastName}
						</p>
						<p>
							<strong>Account Active:</strong>{" "}
							{userProfile.isActive ? "✅ Yes" : "❌ No"}
						</p>
					</>
				)}

				<div className="mt-4">
					<h3 className="text-lg font-semibold mb-2">Role Checks:</h3>
					<ul className="space-y-1">
						<li>Is Admin: {isAdmin ? "✅ Yes" : "❌ No"}</li>
						<li>Is Instructor: {isInstructor ? "✅ Yes" : "❌ No"}</li>
						<li>Is Student: {isStudent ? "✅ Yes" : "❌ No"}</li>
					</ul>
				</div>

				<div className="mt-4 p-3 bg-gray-700 rounded">
					<p className="text-sm">
						<strong>Admin Access:</strong>{" "}
						{isAdmin ? "🟢 You can access admin routes" : "🔴 Admin access denied"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default RoleTestComponent;
