// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Try to load config from config/firebase-config.json
        const response = await fetch('/config/firebase-config.json');
        if (!response.ok) {
            throw new Error('Failed to load Firebase configuration');
        }
        const firebaseConfig = await response.json();
        
        // Initialize Firebase if not already initialized
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();
        }
        
        return firebase.firestore();
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        document.getElementById('form-status').textContent = 'Contact form temporarily unavailable';
        document.getElementById('form-status').className = 'form-status error';
        return null;
    }
}

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formStatus = document.getElementById('form-status');
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const db = await initializeFirebase();
        if (!db) {
            throw new Error('Firebase not initialized');
        }
        
        // Save to Firebase
        await db.collection('contacts').add(formData);
        
        // Show success message
        formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
        formStatus.className = 'form-status success';
        
        // Reset form
        this.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        formStatus.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        formStatus.className = 'form-status error';
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
