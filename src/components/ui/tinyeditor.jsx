import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinyEditor = ({ value, onEditorChange, placeholder, height }) => {
	const editorRef = useRef(null);
	// Ensure height is a valid number, fallback to 400 if not
	const editorHeight = typeof height === "number" && height > 0 ? height : 400;

	useEffect(() => {
		const styleId = "tinymce-borderless-style";
		if (!document.getElementById(styleId)) {
			const style = document.createElement("style");
			style.id = styleId;
			style.innerHTML = `
				.tox-tinymce, .tox-editor-header {
					border: none !important;
					box-shadow: none !important;
					background: transparent !important;
				}
			`;
			document.head.appendChild(style);
		}
	}, []);

	return (
		<div style={{ height: `${editorHeight}px`, minHeight: 200 }}>
			<Editor
				apiKey="2hkkc1snnh0bgs5u9eb3a4t2gwsc96sil8c1kmr7cuiibg9u"
				tinymceScriptSrc="https://cdn.tiny.cloud/1/2hkkc1snnh0bgs5u9eb3a4t2gwsc96sil8c1kmr7cuiibg9u/tinymce/6/tinymce.min.js"
				value={value}
				onEditorChange={onEditorChange}
				onInit={(evt, editor) => (editorRef.current = editor)}
				init={{
					height: editorHeight,
					menubar: false,
					plugins: [
						"advlist",
						"autolink",
						"lists",
						"link",
						"image",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"code",
						"fullscreen",
						"insertdatetime",
						"media",
						"table",
						"code",
						"help",
						"wordcount",
					],
					toolbar:
						"undo redo | formatselect | " +
						"bold italic backcolor | alignleft aligncenter " +
						"alignright alignjustify | bullist numlist outdent indent | " +
						"removeformat | help",
					content_style:
						"body { font-family:Helvetica,Arial,sans-serif; font-size:16px; background:transparent; }",
					resize: false,
					placeholder: placeholder || "Start writing...",
					branding: false,
					readonly: false, // Always editable
				}}
			/>
		</div>
	);
};

export default TinyEditor;
