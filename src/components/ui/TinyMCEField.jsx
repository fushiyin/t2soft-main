import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function TinyMCEField({ control, name, label, apiKey, placeholder }) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Editor
							value={value}
							onEditorChange={onChange}
							apiKey={apiKey}
							init={{
								placeholder: placeholder,
								plugins: [
									"anchor",
									"autolink",
									"charmap",
									"codesample",
									"emoticons",
									"image",
									"link",
									"lists",
									"media",
									"searchreplace",
									"table",
									"visualblocks",
									"wordcount",
									"checklist",
									"mediaembed",
									"casechange",
									"formatpainter",
									"pageembed",
									"a11ychecker",
									"tinymcespellchecker",
									"permanentpen",
									"powerpaste",
									"advtable",
									"advcode",
									"editimage",
									"advtemplate",
									"ai",
									"mentions",
									"tinycomments",
									"tableofcontents",
									"footnotes",
									"mergetags",
									"autocorrect",
									"typography",
									"inlinecss",
									"markdown",
									"importword",
									"exportword",
									"exportpdf",
								],
								toolbar:
									"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
								tinycomments_mode: "embedded",
								tinycomments_author: "Author name",

								mergetags_list: [
									{ value: "First.Name", title: "First Name" },
									{ value: "Email", title: "Email" },
								],
								ai_request: (request, respondWith) =>
									respondWith.string(() =>
										Promise.reject("See docs to implement AI Assistant"),
									),
								popup_css: false,
								appendTo: "body",
								content_style: "body { z-index: 99999 !important; }",
								branding: false,
								promotion: false,
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
