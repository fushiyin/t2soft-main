const { Timestamp } = require("firebase/firestore");

// Make sure you have a Firebase service account key and set GOOGLE_APPLICATION_CREDENTIALS env var
require("dotenv").config();
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
initializeApp({
	credential: cert(serviceAccount),
	projectId: "trading-76356",
});

const db = getFirestore();

const commentsSeedData = [
	{
		postId: "02d079d7-b7f7-46bb-9796-06554a7d8998", // Replace with actual post IDs from your posts collection
		authorId: "user_001",
		authorName: "Nguyễn Văn A",
		content: "Bài viết rất chi tiết và dễ hiểu! Cảm ơn tác giả đã chia sẻ kiến thức hữu ích.",
		createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
		updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
		likes: 12,
		replies: [],
		isEdited: false,
		status: "active",
	},
	{
		postId: "02d079d7-b7f7-46bb-9796-06554a7d8998",
		authorId: "user_002",
		authorName: "Trần Thị B",
		content:
			"Thông tin rất bổ ích, tôi đã áp dụng và thấy hiệu quả. Mong có thêm nhiều bài viết như thế này.",
		createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
		updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
		likes: 8,
		replies: [
			{
				authorId: "user_003",
				authorName: "Admin T2Soft",
				content:
					"Cảm ơn bạn đã chia sẻ! Chúng tôi sẽ tiếp tục cung cấp nhiều nội dung hữu ích hơn.",
				createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
				likes: 3,
			},
		],
		isEdited: false,
		status: "active",
	},
	{
		postId: "post_1",
		authorId: "user_004",
		authorName: "Lê Minh C",
		content:
			"Giải thích rất rõ ràng và có ví dụ cụ thể. Đây chính là những gì tôi đang tìm kiếm!",
		createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
		updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
		likes: 15,
		replies: [],
		isEdited: false,
		status: "active",
	},
	{
		postId: "02d079d7-b7f7-46bb-9796-06554a7d8998",
		authorId: "user_005",
		authorName: "Phạm Văn D",
		content:
			"Tôi mới bắt đầu học về cryptocurrency và bài viết này rất dễ hiểu. Cảm ơn tác giả!",
		createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
		updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
		likes: 6,
		replies: [
			{
				authorId: "user_006",
				authorName: "Crypto Expert",
				content:
					"Chúc bạn học tập tốt! Hãy luôn cẩn thận và nghiên cứu kỹ trước khi đầu tư.",
				createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
				likes: 4,
			},
		],
		isEdited: false,
		status: "active",
	},
	{
		postId: "1184a561-825a-4f08-adc5-3ebf2cf8be63",
		authorId: "user_007",
		authorName: "Hoàng Thị E",
		content: "Phân tích thị trường rất chính xác. Tôi đã theo dõi và thấy hiệu quả tích cực.",
		createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
		updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
		likes: 20,
		replies: [],
		isEdited: false,
		status: "active",
	},
	{
		postId: "1184a561-825a-4f08-adc5-3ebf2cf8be63",
		authorId: "user_008",
		authorName: "Đặng Minh F",
		content:
			"Bài viết về trading strategy rất hay. Có thể chia sẻ thêm về risk management không ạ?",
		createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
		updatedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
		likes: 10,
		replies: [
			{
				authorId: "user_001",
				authorName: "Nguyễn Văn A",
				content: "Cảm ơn bạn! Tôi sẽ viết một bài về risk management trong thời gian tới.",
				createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
				likes: 7,
			},
			{
				authorId: "user_008",
				authorName: "Đặng Minh F",
				content: "Tuyệt vời! Tôi sẽ theo dõi bài viết tiếp theo của bạn.",
				createdAt: new Date(Date.now() - 6.5 * 60 * 60 * 1000),
				likes: 2,
			},
		],
		isEdited: false,
		status: "active",
	},
	{
		postId: "1184a561-825a-4f08-adc5-3ebf2cf8be63",
		authorId: "user_009",
		authorName: "Vũ Thị G",
		content:
			"Kinh nghiệm trading của tác giả rất phong phú. Tôi đã học được nhiều điều bổ ích.",
		createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
		updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
		likes: 14,
		replies: [],
		isEdited: false,
		status: "active",
	},
	{
		postId: "1184a561-825a-4f08-adc5-3ebf2cf8be63",
		authorId: "user_010",
		authorName: "Bùi Văn H",
		content: "Mình thấy có một số điểm cần bổ sung thêm. Nhưng nhìn chung bài viết rất tốt!",
		createdAt: new Date(Date.now() - 15 * 60 * 60 * 1000), // 15 hours ago
		updatedAt: new Date(Date.now() - 14 * 60 * 60 * 1000), // Edited 1 hour later
		likes: 5,
		replies: [
			{
				authorId: "user_001",
				authorName: "Nguyễn Văn A",
				content:
					"Cảm ơn bạn đã góp ý! Bạn có thể chia sẻ cụ thể những điểm nào cần bổ sung không?",
				createdAt: new Date(Date.now() - 14 * 60 * 60 * 1000),
				likes: 3,
			},
		],
		isEdited: true,
		status: "active",
	},
];

// Function to seed comments
const seedComments = async () => {
	try {
		console.log("Starting to seed comments...");

		for (const comment of commentsSeedData) {
			const docRef = await db.collection("comments").add(comment);
			console.log(`Comment added with ID: ${docRef.id}`);
		}

		console.log("Comments seeding completed successfully!");
		console.log(`Total comments added: ${commentsSeedData.length}`);
	} catch (error) {
		console.error("Error seeding comments:", error);
	}
};

// Run the seeder
seedComments();

module.exports = { seedComments };
