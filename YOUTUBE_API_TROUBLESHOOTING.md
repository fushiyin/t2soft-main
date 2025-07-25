# YouTube API Troubleshooting Guide

## Current Issue: "Failed to fetch data from YouTube API"

### Root Cause Analysis

The YouTube API is failing because the Firebase Functions are not accessible. Here are the likely causes:

#### 1. Firebase Emulators Not Running ❌
**Problem**: The frontend is trying to connect to `http://localhost:5001/trading-76356/us-central1/api/youtube` but Firebase emulators are not running.

**Error**: Java 11+ is required for Firebase emulators but your system has an older version.

**Solution**: Install Java 11+ or use production Firebase Functions.

#### 2. Production Functions Not Deployed ❌
**Problem**: If emulators aren't working, the app should fall back to production but functions may not be deployed.

**Solution**: Deploy functions to Firebase or fix local emulator setup.

#### 3. YouTube API Configuration ✅
**Status**: API keys and configuration are correctly set up:
- `YOUTUBE_API_KEY`: Configured ✅
- `YOUTUBE_CHANNEL_ID`: Configured ✅
- Playlist IDs: Available ✅

## Quick Solutions

### Option 1: Fix Java Version (Recommended)
```bash
# Install Java 11+ on Windows
# Download from: https://adoptium.net/temurin/releases/
# Or use chocolatey:
choco install temurin11

# Then restart Firebase emulators
firebase emulators:start
```

### Option 2: Deploy to Production
```bash
# Deploy Firebase Functions to production
firebase deploy --only functions

# Update API base URL in src/lib/api.js to use production
# Change from localhost to your Firebase Functions URL
```

### Option 3: Temporary Mock Data (Quick Fix)
I can modify the MyCourses component to use mock data temporarily while you fix the backend.

### Option 4: Direct YouTube API Call (Alternative)
I can modify the frontend to call YouTube API directly (with CORS considerations).

## Detailed Troubleshooting Steps

### Step 1: Check Java Version
```bash
java -version
```
Should show version 11 or higher.

### Step 2: Install Java 11+ if needed
- Download from [Adoptium](https://adoptium.net/temurin/releases/)
- Install and restart your terminal
- Set JAVA_HOME environment variable

### Step 3: Restart Firebase Emulators
```bash
cd c:\my-project\t2soft-main
firebase emulators:start
```

### Step 4: Test API Endpoints
```bash
# After emulators are running
node test-api.cjs
```

### Step 5: Check Frontend API Configuration
File: `src/lib/api.js`
```javascript
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001/trading-76356/us-central1/api";
```

## Alternative Solutions

### Solution A: Mock Data Implementation
I can temporarily replace the YouTube API with mock data:

```javascript
// Temporary mock data for development
const mockCourses = [
  {
    id: "PLsGBXDsQw_r4-62k404iSBvPpixyPCI2u",
    title: "Forex Trading Fundamentals",
    description: "Learn the basics of forex trading",
    thumbnail: "https://i.ytimg.com/vi/sample/hqdefault.jpg",
    videoCount: 15,
    channelTitle: "TradeMaster",
    publishedAt: "2024-01-01",
    level: "Beginner"
  }
  // ... more mock data
];
```

### Solution B: Direct YouTube API Integration
```javascript
// Direct API call to YouTube (requires API key in frontend)
const fetchYouTubePlaylist = async (playlistId) => {
  const API_KEY = 'YOUR_YOUTUBE_API_KEY';
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${API_KEY}&playlistId=${playlistId}&part=snippet&maxResults=4`;
  const response = await fetch(url);
  return response.json();
};
```

### Solution C: Production Firebase Functions
```bash
# Deploy functions to production
firebase deploy --only functions

# Update environment variables
VITE_API_BASE=https://your-project.cloudfunctions.net/api
```

## Current Configuration Status

### ✅ Working Components
- YouTube API service logic
- Playlist IDs configuration
- API key setup
- Frontend API client

### ❌ Blocked Components
- Firebase emulators (Java version issue)
- Local API testing
- MyCourses component data fetching

### 🔄 Pending Actions
1. Install Java 11+
2. Start Firebase emulators
3. Test YouTube API endpoints
4. Verify MyCourses component

## Error Messages and Solutions

### "Connection refused - Make sure Firebase emulators are running"
**Cause**: Firebase emulators not started
**Solution**: Install Java 11+ and run `firebase emulators:start`

### "firebase-tools no longer supports Java versions before 11"
**Cause**: Outdated Java version
**Solution**: Install Java 11+ from [Adoptium](https://adoptium.net/temurin/releases/)

### "Failed to fetch courses"
**Cause**: API endpoint not accessible
**Solution**: Fix emulator setup or use mock data temporarily

## Immediate Action Plan

### Phase 1: Quick Fix (Use Mock Data)
1. I'll modify MyCourses component to use mock data
2. App will work immediately while you fix backend
3. No blocking issues for development

### Phase 2: Backend Fix (Install Java)
1. Install Java 11+
2. Restart Firebase emulators
3. Test YouTube API endpoints
4. Switch back to real API calls

### Phase 3: Production Deployment
1. Deploy Firebase Functions to production
2. Update API configuration
3. Test in production environment

## Next Steps

Would you like me to implement the quick fix with mock data first, or would you prefer to install Java 11+ and fix the emulator setup?
