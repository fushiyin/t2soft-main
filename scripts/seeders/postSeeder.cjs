const { db } = require("../utils/firebaseAdmin.cjs");
const { faker } = require("@faker-js/faker");

// Generate blog posts data
function generateBlogPosts(count = 20) {
	const categories = ["Crypto", "Trading", "DeFi", "NFT", "Technology", "Market Analysis"];
	const authors = ["John Smith", "Sarah Johnson", "Mike Chen", "Emily Davis", "Alex Rodriguez"];
	const posts = [];

	for (let i = 0; i < count; i++) {
		const id = faker.string.uuid();
		const createdDate = faker.date.past({ years: 1 });
		
		posts.push({
			id,
			title: faker.lorem.sentence({ min: 4, max: 8 }),
			content: faker.lorem.paragraphs(5, "\n\n"),
			excerpt: faker.lorem.paragraph(),
			category: faker.helpers.arrayElement(categories),
			author: faker.helpers.arrayElement(authors),
			author_id: "admin",
			tags: faker.lorem.words(3).split(" "),
			status: faker.helpers.arrayElement(["Published", "Draft", "Scheduled"]),
			is_pinned: faker.datatype.boolean(0.2), // 20% chance of being pinned
			featured_image: `https://picsum.photos/800/400?random=${i}`,
			read_time: faker.number.int({ min: 3, max: 15 }),
			views: faker.number.int({ min: 50, max: 5000 }),
			likes: faker.number.int({ min: 5, max: 200 }),
			course_id: faker.helpers.maybe(() => faker.string.uuid(), { probability: 0.3 }),
			type: "post",
			created_at: createdDate,
			updated_at: faker.date.between({ from: createdDate, to: new Date() }),
		});
	}

	return posts;
}

async function seedPosts() {
	console.log("📝 Seeding posts collection...");
	
	try {
		const posts = generateBlogPosts(25);
		const batch = db.batch();
		
		for (const post of posts) {
			const postRef = db.collection("posts").doc(post.id);
			batch.set(postRef, post);
		}
		
		await batch.commit();
		console.log(`✅ Successfully seeded ${posts.length} blog posts`);
		
	} catch (error) {
		console.error("❌ Error seeding posts:", error);
		throw error;
	}
}

module.exports = { seedPosts, generateBlogPosts };
