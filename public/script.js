import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwnGkes5ivJVHT-gLOY7lvtSDhzVuVhrE",
    authDomain: "beowner000.firebaseapp.com",
    projectId: "beowner000",
    storageBucket: "beowner000.appspot.com",
    messagingSenderId: "1084826671741",
    appId: "1:1084826671741:web:870d6a03b6887b12376f14",
    measurementId: "G-WHDZCLSNS9"
  };

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownButton.addEventListener('click', function(event) {
        // Prevent event propagation to avoid closing the menu when clicking the button
        event.stopPropagation();

        // Toggle visibility of the dropdown menu
        dropdownMenu.classList.toggle('show');
    });

    // Hide the dropdown menu if clicking outside of it
    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

