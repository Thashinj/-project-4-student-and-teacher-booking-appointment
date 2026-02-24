// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

// Obtain inputs from the html file
const teacherSelect = document.getElementById("teacherSelect");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const subjectInput = document.getElementById("subject");

// Gets button ids
const updateBtn = document.getElementById("update");
const deleteBtn = document.getElementById("delete");

// Load Teachers
onAuthStateChanged(auth, async (user) => {
  // Checks if the user is logged in

  if (!user) {
    alert("Not logged in");
    return;
  }

  //Admin access restricted
  const adminDoc = await getDoc(doc(db, "users", user.uid));

  if (!adminDoc.exists() || adminDoc.data().role !== "admin") {
    alert("Access Denied");
    window.location.href = "Login.html";
    return;
  }

  // Applies query to the collection with a created index in firebase
   const q = query(
    collection(db, "users"), 
    where("role", "==", "teacher")
  );

  // Gets query shot from q
  const querySnapshot = await getDocs(q);

  // Checks each data
  querySnapshot.forEach((docSnap) => {
      // Gets data from docSnap
      const data = docSnap.data();

      const option = document.createElement("option"); // Creates option element
      option.value = docSnap.id;
      option.textContent = `${data.name} (${data.department}) ${data.subject}`;

      teacherSelect.appendChild(option); //Appends option to the selected teacher
  });

});

// When teacher is selected 
teacherSelect.addEventListener("change", async () => { // Gets the details when selecting a teacher

  const teacherId = teacherSelect.value; // Get the inserted id

  if (!teacherId) {  // Display empty if id can't be found
    nameInput.value = "";
    departmentInput.value = "";
    subjectInput.value = "";
    return;
  }

  const docSnap = await getDoc(doc(db, "users", teacherId)); // Gets the details

  if (docSnap.exists()) { // Check if the document exists and we can insert new values 
    const data = docSnap.data();
    nameInput.value = data.name;
    departmentInput.value = data.department;
    subjectInput.value = data.subject;
  }

});

// Update Teacher Details
updateBtn.addEventListener("click", async () => { // Gets the details when update is clicked

  const teacherId = teacherSelect.value.trim(); // Trims the inserted details
  const name = nameInput.value.trim();
  const department = departmentInput.value.trim();
  const subject = subjectInput.value.trim();

  if (!teacherId || !name || !department || !subject) {
    alert("Fill all fields");
    return;
  }

  await updateDoc(doc(db, "users", teacherId), { // Updates the details
      name: name,
      department: department,
      subject: subject
  });

  alert ("Teacher updated successfully");
  location.reload(); // Refresh dropdown

});

// Delete teacher
deleteBtn.addEventListener("click", async () => { // Gets the details when delete is clicked

  const teacherId = teacherSelect.value; // Trims the inserted details

  if (!teacherId) {
    alert("Select a teacher");
    return;
  }

  const confirmDelete = confirm("Are you sure?"); // Display a confirm message if you want to really delete it
  if (!confirmDelete) return; // If delete is not confirmed

  try {
    // Delete Teacher Slots
    const slotQuery = query(
      collection(db, "availableSlots"),
      where("teacherId", "==", teacherId)
    );

    const slotSnapshot = await getDocs(slotQuery);

    for (const docSnap of slotSnapshot.docs) { // Taking a document piece from collection to delete slot
      await deleteDoc(doc(db, "availableSlots", docSnap.id));
    }

    // Delete Teacher Bookings
    const bookingQuery = query(
      collection(db, "bookings"),
      where("teacherId", "==", teacherId)
    );

    const bookingSnapshot = await getDocs(bookingQuery);

    for (const docSnap of bookingSnapshot.docs) { // Taking a document piece from collection to delete booking
      await deleteDoc(doc(db, "bookings", docSnap.id));
    }

    // Deletes teacher document
    await deleteDoc(doc(db, "users", teacherId)); //  Deletes the document details

    alert ("Teacher deleted successfully");
    location.reload();

  } catch (error) {
    alert("Error deleting teacher");
  }
  
});