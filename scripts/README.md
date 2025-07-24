# Database Seeding

This folder contains scripts to populate your Firebase Firestore with dummy data for development and testing.

## Collections Available

### � Documents (`documents`)
- Document files with metadata and download information
- Categories: Crypto, Trading, DeFi, NFT, Technology, Legal, etc.
- Includes file URLs, MIME types, download counts, and access controls
- Sample documents: Bitcoin whitepaper, DeFi guides, trading calculators

### �📚 Courses (`courses`)
- Course information with lessons, pricing, and metadata
- Categories: Crypto, Trading, DeFi, NFT, Programming
- Includes instructor info, ratings, and enrollment stats

### 📝 Posts (`posts`) 
- Blog posts and articles
- Various categories and authors
- Includes content, excerpts, tags, and engagement metrics

### 👥 Users (`users`)
- User profiles with authentication data
- Includes preferences, social links, and learning stats
- Contains admin user for testing

### 📋 Enrollments (`enrollments`)
- Course enrollment records
- Progress tracking and completion data
- Certificates and ratings

### 🗂️ Categories (`categories`)
- Course and content categories
- Icons, colors, and organization data

## Quick Start

1. **Start Firebase Emulators** (required):
   ```bash
   npm run firebase:emulators
   ```

2. **Seed all collections**:
   ```bash
   npm run seed
   ```

3. **Access your data**:
   - Firebase UI: http://localhost:4000
   - Firestore: http://localhost:8080

## Available Commands

```bash
# Seed all collections
npm run seed

# Reset and seed all collections
npm run seed:reset

# Seed specific collections
npm run seed:courses
npm run seed:posts  
npm run seed:users
npm run seed:documents

# Advanced usage
node scripts/seedDatabase.cjs --collection enrollments
node scripts/seedDatabase.cjs --reset --collection categories
```

## File Structure

```
scripts/
├── seedDatabase.js           # Main seeder script
├── utils/
│   └── firebaseAdmin.js     # Firebase Admin initialization
└── seeders/
    ├── courseSeeder.cjs     # Course data generator
    ├── postSeeder.cjs       # Blog post generator
    ├── userSeeder.cjs       # User profile generator
    ├── enrollmentSeeder.cjs # Enrollment data generator
    ├── categorySeeder.cjs   # Category data generator
    └── documentSeeder.cjs   # Document files generator
```

## Sample Data

### Default Admin User
- **Email**: admin@t2soft.com
- **Role**: admin
- **Password**: Set through Firebase Auth Console

### Course Categories
- 🪙 Cryptocurrency
- 📈 Trading  
- 🏦 DeFi
- 🎨 NFT
- 💻 Programming
- 📊 Market Analysis

## Customization

You can modify the seeder files in `scripts/seeders/` to:
- Change data volume (adjust count parameters)
- Modify sample data structure
- Add new fields or collections
- Customize faker.js settings

## Troubleshooting

**Error: "Service account key not found"**
- Ensure `serviceAccountKey.json` exists in project root
- Check Firebase project configuration

**Error: "Connection refused"**
- Start Firebase emulators first: `npm run firebase:emulators`
- Verify emulator ports in `firebase.json`

**Error: "Permission denied"**
- Check Firestore security rules
- Verify Firebase Admin initialization

## Production Note

⚠️ **Never run seeders against production databases!** 

These scripts are designed for development and testing environments only.
