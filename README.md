# Personal Website

This is the personal website of Anil Kumar K K, showcasing professional experience and contact information.

## Setup

### Firebase Configuration
To set up the contact form functionality:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database in test mode
3. Get your Firebase configuration:
   - Go to Project Settings
   - Under "Your apps", click the web icon (</>)
   - Register your app
   - Copy the firebaseConfig object
4. Create `firebase-config.js`:
   ```bash
   cp firebase-config.template.js firebase-config.js
   ```
5. Replace the placeholder values in `firebase-config.js` with your actual Firebase configuration

⚠️ IMPORTANT: Never commit `firebase-config.js` to version control as it contains sensitive information.

## Development
To run the website locally:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.
