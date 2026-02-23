// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

    const q = query(  // Gets info from the collection with query
      collection(db, "bookings")
    );

    const querySnapshot = await getDocs(q);

    const tableBody = document.getElementById("tableBody"); // Gets element from tbody tag

    querySnapshot.forEach((doc) => { // Displays each data from the collection in the table
        const data = doc.data();

        // Displays status of the appointment (red for rejected, green for approved, orange for available)
        tableBody.innerHTML += `
          <tr>
            <th> ${data.studentName} </th>
            <th> ${data.date} </th>
            <th> ${data.time} </th>
            <th class = "status ${data.status}"> 
                 ${data.status} 
            </th>
          </tr>
        `;
    });

});