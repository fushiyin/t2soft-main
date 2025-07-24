# Firebase Setup Instructions

## Setup Steps

1. **Install Firebase CLI globally** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Install dependencies**:
   ```bash
   # Install main project dependencies
   npm install
   
   # Install Firebase Functions dependencies
   cd functions
   npm install
   cd ..
   ```

4. **Start Firebase Emulators**:
   ```bash
   firebase emulators:start
   ```

5. **In a new terminal, start the development server**:
   ```bash
   npm run dev
   ```

## Environment Variables

Your `.env` file should contain:
```
VITE_API_BASE=http://localhost:5001/trading-76356/us-central1/api
YOUTUBE_API_KEY=your-youtube-api-key
YOUTUBE_CHANNEL_ID=your-channel-id
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
```

## Accessing Your App

- **Web App**: http://localhost:5173 (Vite dev server)
- **Firebase Functions**: http://localhost:5001/trading-76356/us-central1/api
- **Firestore Emulator**: http://localhost:8080
- **Firebase UI**: http://localhost:4000

## API Endpoints

Your Firebase Functions provide these endpoints:
- `GET /api/courses` - Fetch all courses
- `GET /api/youtube` - Fetch YouTube channel videos
- `GET /api/youtube/playlist?playlistId=ID&maxResults=4` - Fetch specific playlist
- `POST /api/youtube/playlists` - Fetch multiple playlists

## Troubleshooting

1. **CORS Issues**: Make sure the functions are running on the correct port (5001)
2. **API Not Found**: Verify the VITE_API_BASE environment variable
3. **Firestore Connection**: Ensure emulators are running before starting the dev server
4. **Authentication Issues**: Check that Firebase Admin is properly initialized
