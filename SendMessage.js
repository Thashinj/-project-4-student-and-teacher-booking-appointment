// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

document.addEventListener("DOMContentLoaded", () => {
  // Obtain inputs from the html file
  const teacherDisplay = document.getElementById("selectedTeacherDisplay");
  const searchInput = document.querySelector(".search-input");
  const messageBox = document.getElementById("message");
  const sendBtn = document.getElementById("send");

  let selectedTeacher = null; // Selected teaher is null

  // Search teachers
  searchInput.addEventListener("input", async () => {
    const value = searchInput.value.trim(); // Gets value from search bar
    if (!value) {
        teacherDisplay.innerHTML = "";
        selectedTeacher = null;
        return;
    }

    // Applies query to the collection with a created index in firebase
    const q = query(
      collection(db, "users"),
      where("role", "==", "teacher"),
      where("name", ">=", value),
      where("name", "<=", value + "\uf8ff"),
    );

    const snapshot = await getDocs(q); // Gets document with query

    teacherDisplay.innerHTML = ""; // Displays nothing
    selectedTeacher = null;

    snapshot.forEach((docSnap) => {
      // Add id and name to the selectedTeacher variable
      selectedTeacher = {
        id: docSnap.id,
        name: docSnap.data().name,
      };

      teacherDisplay.innerHTML = `To: ${selectedTeacher.name}`;
    });
  });

  onAuthStateChanged(auth, (user) => {
    // Checks if the user is logged in

    if (!user) {
      alert("Not logged in");
      return;
    }

    // Takes input from the message box
    sendBtn.addEventListener("click", async () => {
      if (!selectedTeacher) {
        alert("Select a teacher first");
        return;
      }

      const text = messageBox.value.trim(); // Gets message text
      if (!text) {
        alert("Message cannot be empty");
        return;
      }

      // Gets student name
      const studentDoc = await getDoc(doc(db, "users", user.uid));
      const studentData = studentDoc.data();

      // Createss message in collection
      await addDoc(collection(db, "messages"), {
        studentId: user.uid,
        studentName: studentData.firstName,
        teacherId: selectedTeacher.id,
        teacherName: selectedTeacher.name,
        message: text,
        created: serverTimestamp(),
        read: false,
      });

      alert("Message sent!"); // Message is sent and resets for a new one
      messageBox.value = "";
    });
  });
});
