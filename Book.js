// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, getDocs, query, where, getDoc, addDoc, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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
const teacherDropdown = document.getElementById("teacherDropdown");

// Load teachers into dropdown
async function loadTeachers() {

  const snapshot = await getDocs(collection(db, "users"));

  

  snapshot.forEach((docSnap) => {

    const data = docSnap.data(); // Gets data

    console.log(data.firstName);

    if (data.role === "teacher") { // Displays the name if role is teacher
      const option = document.createElement("option");
      option.value = docSnap.id;
      option.textContent = data.name;
      teacherDropdown.appendChild(option); // Appends name to the dropdown
    }
  });
}

loadTeachers();

// When teacher selected → show available slots
teacherDropdown.addEventListener("change", async () => {

  const teacherId = teacherDropdown.value; // Gets value

  if (!teacherId) {
    slotsDiv.innerHTML = "";
    return;
  }
  
  // Gets the query collection
  const q = query(
    collection(db, "availableSlots"),
    where("teacherId", "==", teacherId),
    where("status", "==", "available")
  );

  const snapshot = await getDocs(q);

  slotsDiv.innerHTML = "";

  if (snapshot.empty) {
    slotsDiv.innerHTML = "<p>No available slots</p>";
    return;
  }

  snapshot.forEach((docSnap) => { // Displays the slot card with the teacher name selected and slot

    const data = docSnap.data();

    slotsDiv.innerHTML += `
      <div class="slot-card">
        <p>${data.teacherName}</p>
        <p>${data.date} - ${data.time}</p>
        <button onclick="bookSlot('${docSnap.id}')">
          Book
        </button>
      </div>
    `;
  });
});


// Book function
window.bookSlot = async function (slotId) {

  const user = auth.currentUser;

  if (!user) {
    alert("Not logged in");
    return;
  }

  const slotDoc = await getDoc(doc(db, "availableSlots", slotId));
  const data = slotDoc.data();

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
    status: "booked",
  });

  alert("Appointment Requested"); // Displays the alert message with the successful message
  location.reload();

};;
