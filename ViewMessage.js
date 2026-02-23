// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

const formDiv = document.getElementById("displayMessage"); //

onAuthStateChanged(auth, async (user) => { // Checks if the user is logged in

  if (!user) {
    alert("Not logged in");
    return;
  }

  // Applies query to the collection with a created index in firebase      
  const q = query (
    collection(db, "messages"),
    where("teacherId", "==", user.uid)
  );

  onSnapshot(q, (snapshot) => {
    formDiv.innerHTML = "<h4> Messages </h4>";
    
    if (snapshot.empty) {
        formDiv.innerHTML += "<h4> No messages </h4>";
        return;
    };
    
    snapshot.forEach(docSnap => {
        const data = docSnap.data();

        formDiv.innerHTML += `
          <div class = "message-card">
            <p><strong>From: </strong> ${data.studentName} </p>
            <p>${data.message}</p>
          </div>
        `;
    });

  });

});