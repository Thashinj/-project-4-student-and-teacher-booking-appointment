// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, getDoc, addDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

// Gets slots id from Book.html
const slotsDiv = document.getElementById("slots");

// Extracts query and value from URL
const urlParams = new URLSearchParams(window.location.search);
const slotId = urlParams.get("slotId");

onAuthStateChanged(auth, async (user) => {

  // Checks if the user is logged in
  if (!user) {
    alert("Not logged in");
    return;
  }

  if (!slotId) {
    slotsDiv.innerHTML = "<h5> No slot selected </h5> ";
    return;
  }

  // Gets selected slot details
  const slotDoc = await getDoc(doc(db, "availableSlots", slotId));

  if (!slotDoc.exists()) {
    slotsDiv.innerHTML = "<h5> Slot not found </h5>";
    return;
  }

  // Gets a document from the slot data
  const data = slotDoc.data();

  if (data.status !== "available") {
    slotsDiv.innerHTML = "<h5> This slot is no longer available </h5>"
    return;
  }

  // Display slot by inserting the data into slotsDiv class
  slotsDiv.innerHTML = `
     <div class = "slot-card">
       <p> ${data.teacherName} </p>
       <p>${data.date} - ${data.time}</p><br>
       <div class = "center-button">
         <button id = "confirmBooking"> Book Appointment </button>
       </div>
     </div>
    `;

  // Gets id and uses event listener to add document
  document.getElementById("confirmBooking").addEventListener("click", async () => {

      //Get student data
      const studentDoc = await getDoc(doc(db, "users", user.uid));
      const studentData = await studentDoc.data();

      // Create appointment
      await addDoc(collection(db, "bookings"), {
        teacherId: data.teacherId,
        teacherName: data.teacherName,
        studentId: user.uid,
        studentName: studentData.firstName,
        slotId: slotId,
        date: data.date,
        time: data.time,
        status: "pending",
        created: serverTimestamp(),
      });

      // Locks the slot
      await updateDoc(doc(db, "availableSlots", slotId), {
        status: "booked"
      });

      alert("Appointment Requested"); // Displays the alert message with the successful message
      slotsDiv.innerHTML = "<p> Booking successful. Waiting for approval </p>";
    });
});