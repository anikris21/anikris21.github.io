// Fetch Firebase configuration from environment or config file
async function loadFirebaseConfig() {
    try {
        // Match the exact path from GitHub Actions deployment
        const response = await fetch('./../config/firebase-config.json');
        if (!response.ok) {
            throw new Error('Config not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading Firebase config:', error);
        return null;
    }
}

export { loadFirebaseConfig };
