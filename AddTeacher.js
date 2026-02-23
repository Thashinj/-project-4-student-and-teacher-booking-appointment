// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, getDoc, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => { // Checks if the user is logged in

  if (!user) {
    alert("Not logged in");
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid)); // Gets document from users collection

});

// Gets add id from Add Teacher button
document.getElementById("add").addEventListener("click", async (e) => {
    e.preventDefault();

    // Obtain inputs from the html files
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("pass").value;
    const subject = document.getElementById("subject").value;
    const department = document.getElementById("depart").value;

    if (!name || !email || !pass) {
        alert ("Please fill all required fields"); // Displays message if fields are empty
        return;
    }

    try {
        // Saves current admin user
        const adminUser = auth.currentUser;

        // Creates teacher user
        const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
        const teacher = userCredential.user;

        // Adds teacher details to firestore
        await setDoc(doc(db, "users", teacher.uid), {
          name: name,
          email: email,
          role: "teacher",
          subject: subject,
          department: department,
          approved: true, 
          created: serverTimestamp(),
        });

        alert("Teacher Added Successfully");

        // Re logins the admin when Firebase logs in the teacher
        await auth.updateCurrentUser(adminUser);

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("pass").value = "";

    } catch (e) {
        alert(e.message);
    }
});