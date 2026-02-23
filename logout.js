// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import { signOut, getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLCLnYyjt_pY_9FJ-QLnicJBIaJMErtls",
  authDomain: "student-teacher-booking-2afe2.firebaseapp.com",
  projectId: "student-teacher-booking-2afe2",
  storageBucket: "student-teacher-booking-2afe2.firebasestorage.app",
  messagingSenderId: "52059078427",
  appId: "1:52059078427:web:b41b5aaee0e4a4d4c15dbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Creates authentication and database
const auth = getAuth(app);

const logoutBtn = document.getElementById("logout"); // Gets logout id 

logoutBtn.addEventListener("click", async (e) => { // Logouts out user back to the opening page
    e.preventDefault();
    await signOut(auth);
    window.location.href = "Opening.html";
});


