import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJFIHuL9nUYQdtrpjtimOY3hAWGcT2k9A",
    authDomain: "beowner00.firebaseapp.com",
    projectId: "beowner00",
    storageBucket: "beowner00.appspot.com",
    messagingSenderId: "240473062983",
    appId: "1:240473062983:web:847181cad7595daab0bb62",
    measurementId: "G-MZCCKLW1WK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth

// Check if the user is already authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Redirect to the admin page
        window.location.href = 'index.html?uid=' + user.uid;
    }
});

// Validate email function
function validate_email(email) {
    // Implement your email validation logic
    return email && email.includes('@'); // Example validation
}

// Validate password function
function validate_password(password) {
    // Implement your password validation logic
    return password && password.length >= 6; // Example validation
}

// Event listener for the login form
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', signIn);
});

function signIn(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email and password
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password format.');
        return;
    }

    // Check if loading element exists before modifying its style
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'block'; // Show loading indicator
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            const user = userCredential.user;

            // Hide loading indicator
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

            // Redirect to the admin page
            window.location.href = 'index.html?uid=' + user.uid;

            alert('User signed in successfully.');
        })
        .catch(function (error) {
            // Hide loading indicator
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode} - ${errorMessage}`);
        });
}

