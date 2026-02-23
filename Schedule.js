// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, addDoc, serverTimestamp, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

//submit the info
const scheduleBtn = document.getElementById("schedule");

onAuthStateChanged(auth, (user) => { // Checks if the user is logged in
  
  if (!user) {
    alert("Not logged in");
    return;
  }

  scheduleBtn.addEventListener("click", async function (event) { // Event listener accepts the functions to make the schedule button work
    event.preventDefault(); // Stops page from refreshing

    // Obtain inputs from the html files
    const time = document.getElementById("time").value;
    const date = document.getElementById("date").value;

    if (time === "" || date === "") {
      alert("Please enter the fields correctly"); // Returns alert if time or date value is empty
      return;
    }

    //Get teacher details from collection
    const teacherDoc = await getDoc(doc(db, "users", user.uid));
    const teacherData = teacherDoc.data();

    // Adds the information to the collection in firestore
    try {
      await addDoc(collection(db, "availableSlots"), { 
        // Only for teachers
        teacherName: teacherData.name,
        teacherId: user.uid,
        date: date,  
        time: time,
        status: "available",
        created: serverTimestamp()
      });

      alert("Scheduled successfully!");

    } catch (error) {
      alert(error.message); // Displays the error if schedule fails
    }

  });

});
