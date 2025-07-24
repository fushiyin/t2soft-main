const { db } = require("../utils/firebaseAdmin.cjs");
const { faker } = require("@faker-js/faker");

// Generate enrollment data
function generateEnrollments(count = 50) {
	const enrollments = [];
	const courseIds = [
		"crypto-basics",
		"trading-strategies", 
		"defi-protocols",
		"nft-marketplace",
		"algorithmic-trading"
	];
	
	for (let i = 0; i < count; i++) {
		const enrolledDate = faker.date.past({ years: 1 });
		const completionDate = faker.helpers.maybe(
			() => faker.date.between({ from: enrolledDate, to: new Date() }),
			{ probability: 0.4 }
		);
		
		const progress = completionDate 
			? 100 
			: faker.number.int({ min: 0, max: 95 });
			
		enrollments.push({
			id: faker.string.uuid(),
			userId: faker.string.uuid(),
			courseId: faker.helpers.arrayElement(courseIds),
			status: completionDate ? "completed" : faker.helpers.arrayElement(["active", "paused"]),
			progress: progress,
			enrolledAt: enrolledDate,
			completedAt: completionDate,
			lastAccessed: faker.date.recent({ days: 7 }),
			totalWatchTime: faker.number.int({ min: 30, max: 600 }), // minutes
			lessonsCompleted: faker.number.int({ min: 0, max: 10 }),
			rating: completionDate ? faker.number.int({ min: 3, max: 5 }) : null,
			review: completionDate ? faker.lorem.paragraph() : null,
			certificate: completionDate ? {
				issued: true,
				issuedAt: completionDate,
				certificateId: faker.string.uuid(),
				downloadUrl: `https://certificates.t2soft.com/${faker.string.uuid()}.pdf`
			} : null,
			created_at: enrolledDate,
			updated_at: faker.date.recent({ days: 3 }),
		});
	}
	
	return enrollments;
}

async function seedEnrollments() {
	console.log("📚 Seeding enrollments collection...");
	
	try {
		const enrollments = generateEnrollments(75);
		const batch = db.batch();
		
		for (const enrollment of enrollments) {
			const enrollmentRef = db.collection("enrollments").doc(enrollment.id);
			batch.set(enrollmentRef, enrollment);
		}
		
		await batch.commit();
		console.log(`✅ Successfully seeded ${enrollments.length} enrollments`);
		
	} catch (error) {
		console.error("❌ Error seeding enrollments:", error);
		throw error;
	}
}

module.exports = { seedEnrollments, generateEnrollments };
