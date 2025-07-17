// uploadImage.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "./firebase";

export async function uploadImageAndSaveMetadata(file) {
	const storageRef = ref(storage, `images/${file.name}`);

	const snapshot = await uploadBytes(storageRef, file);

	const downloadURL = await getDownloadURL(snapshot.ref);

	await addDoc(collection(db, "images"), {
		name: file.name,
		url: downloadURL,
		created_at: new Date(),
	});

	return downloadURL;
}
