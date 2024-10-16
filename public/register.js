import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwnGkes5ivJVHT-gLOY7lvtSDhzVuVhrE",
  authDomain: "beowner000.firebaseapp.com",
  projectId: "beowner000",
  storageBucket: "beowner000.appspot.com",
  messagingSenderId: "1084826671741",
  appId: "1:1084826671741:web:870d6a03b6887b12376f14",
  measurementId: "G-WHDZCLSNS9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById('registrationForm').addEventListener('submit', register);

async function register(event) {
  event.preventDefault(); // Prevent form submission and page reload

  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confrimPassword').value;

  // Validate email and password
  if (!validate_email(email) || !validate_password(password) || password !== confirmPassword) {
    alert('Invalid email, password format, or passwords do not match.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user data (excluding password for security reasons)
    const user_data = {
      email: email,
      last_login: new Date().toISOString(),
    };

    await set(ref(database, 'users/' + user.uid), user_data);

    // Export user data (excluding sensitive information)
    exportUserData(user_data);

    alert('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Error: ${errorCode} - ${errorMessage}`);
  }
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Check if the password length is greater than or equal to 6
  const lengthValid = password.length >= 6;

  // Check if the password contains at least one uppercase letter
  const uppercaseValid = /[A-Z]/.test(password);

  // Return true if both conditions are met
  return lengthValid && uppercaseValid;
}

// Export user data function
function exportUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}


document.getElementById('registerButton').addEventListener('click', register);








document.addEventListener("DOMContentLoaded", function() {
    const showRegistration = document.getElementById("showRegistration");
    const loginForm = document.getElementById("loginForm");
    const registrationForm = document.getElementById("registrationForm");
    
    showRegistration.addEventListener("click", function() {
        loginForm.style.display = "none";
        registrationForm.style.display = "block";
    });
    
    const backToLogin = document.getElementById("backToLogin");
    if (backToLogin) {
        backToLogin.addEventListener("click", function() {
            registrationForm.style.display = "none";
            loginForm.style.display = "block";
        });
    }
});