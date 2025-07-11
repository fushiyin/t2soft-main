import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import TinyEditor from "@/components/ui/tinyeditor";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";

const PostSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	status: Yup.string().required(),
	content: Yup.string().required("Content is required"),
	type: Yup.string().default("post"),
	course_id: Yup.string().nullable(),
});

export default function PostWrite() {
	const navigate = useNavigate();
	const [showScheduleModal, setShowScheduleModal] = useState(false);
	const [scheduledTime, setScheduledTime] = useState("");
	const [submitType, setSubmitType] = useState("publish");

	return (
		<div className="w-full min-h-screen flex flex-col px-2 md:px-8">
			<div
				className="mb-4 md:mb-8 flex items-center gap-2 pt-4 md:pt-12"
				style={{ flex: "0 0 auto" }}
			>
				<span className="inline-block w-2 h-8 bg-gradient-to-b from-pink-500 to-orange-400 rounded-full" />
				<h1 className="text-xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
					Write New Post
				</h1>
			</div>
			<Formik
				initialValues={{
					title: "",
					status: "Draft",
					content: "",
					type: "post",
					course_id: "",
				}}
				validationSchema={PostSchema}
				onSubmit={async (values, { setSubmitting, resetForm }) => {
					try {
						const user = auth.currentUser;
						const postData = {
							title: values.title || "",
							content: values.content || "",
							status: submitType === "publish" ? "Published" : "Scheduled",
							schedule: submitType === "schedule" ? scheduledTime : null,
							created_at: serverTimestamp(),
							updated_at: serverTimestamp(),
							author_id: user ? user.uid : "",
							course_id: values.course_id || "",
							is_pinned: false,
							type: values.type || "post",
						};
						const docRef = await addDoc(collection(db, "posts"), postData);
						await updateDoc(docRef, { id: docRef.id });
						alert(
							`Post ${submitType === "publish" ? "published" : "scheduled"} successfully!`,
						);
						resetForm();
						navigate(-1);
					} catch (error) {
						alert("Error saving post: " + error.message);
					} finally {
						setSubmitting(false);
					}
				}}
			>
				{({ values, errors, touched, setFieldValue, handleSubmit }) => (
					<Form className="flex flex-col flex-1 min-h-0 gap-2 bg-white/80 dark:bg-[#181a20]/80 rounded-2xl p-0">
						<div
							className="flex flex-col gap-2pt-8"
							style={{ flex: "0 0 auto" }}
						>
							<Field
								name="title"
								placeholder="Title..."
								className="w-full px-4 py-3 bg-gray-50 dark:bg-[#23242a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg md:text-2xl font-bold placeholder:font-bold placeholder:text-gray-400 dark:placeholder:text-gray-500"
							/>
							{errors.title && touched.title && (
								<div className="text-red-500 text-sm mt-1">{errors.title}</div>
							)}
						</div>
						<div
							className="flex-1 min-h-[400px] flex flex-col pb-8"
							style={{ overflow: "hidden" }}
						>
							<TinyEditor
								value={values.content}
								onEditorChange={(content) => setFieldValue("content", content)}
								height="100%"
							/>
							{errors.content && touched.content && (
								<div className="text-red-500 text-sm mt-1">{errors.content}</div>
							)}
						</div>
						<div className="flex flex-col md:flex-row gap-2">
							<Field
								name="type"
								as="select"
								className="w-40 px-4 py-2 bg-gray-50 dark:bg-[#23242a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-base shadow-sm rounded"
							>
								<option value="post">Post</option>
								<option value="announcement">Announcement</option>
								<option value="other">Other</option>
							</Field>
							<Field
								name="course_id"
								placeholder="Course ID (optional)"
								className="w-60 px-4 py-2 bg-gray-50 dark:bg-[#23242a] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-base shadow-sm rounded"
							/>
						</div>
						<div className="flex flex-col md:flex-row gap-3 justify-end px-2 pb-5 md:px-8 md:pb-8">
							<button
								type="button"
								onClick={() => navigate(-1)}
								className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm border border-transparent"
							>
								Cancel
							</button>
							<button
								type="button"
								className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold shadow-md hover:scale-105 transition-transform border border-transparent"
								onClick={() => {
									setSubmitType("publish");
									setTimeout(() => handleSubmit(), 0);
								}}
							>
								<span className="inline-block align-middle">Publish</span>
							</button>
							<button
								type="button"
								className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-400 text-white font-bold shadow-md hover:scale-105 transition-transform border border-transparent"
								onClick={() => setShowScheduleModal(true)}
							>
								<span className="inline-block align-middle">Schedule</span>
							</button>
						</div>
						<div className="text-xs text-gray-400 dark:text-gray-500 text-right px-8 pb-4">
							<span>
								Click <b>Publish</b> to post immediately, or <b>Schedule</b> to set
								a future publish time.
							</span>
						</div>
						{/* Schedule Modal */}
						{showScheduleModal && (
							<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
								<div className="bg-white dark:bg-[#23242a] rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 dark:border-gray-800 animate-fadeIn">
									<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
										Select Schedule Time
									</h2>
									<input
										type="datetime-local"
										className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#23242a] text-gray-900 dark:text-white mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 text-base shadow-sm"
										value={scheduledTime}
										onChange={(e) => setScheduledTime(e.target.value)}
									/>
									<div className="flex justify-end gap-2">
										<button
											type="button"
											className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 border border-transparent"
											onClick={() => setShowScheduleModal(false)}
										>
											Cancel
										</button>
										<button
											type="button"
											className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-400 text-white font-bold shadow-md border border-transparent disabled:opacity-60"
											disabled={!scheduledTime}
											onClick={() => {
												setSubmitType("schedule");
												setShowScheduleModal(false);
												setTimeout(() => handleSubmit(), 0);
											}}
										>
											Confirm
										</button>
									</div>
								</div>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
}
