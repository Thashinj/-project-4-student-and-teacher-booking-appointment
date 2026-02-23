// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

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

// Creates database
const db = getFirestore(app);

// Gets values by query selector and id
const searchInput = document.querySelector(".search-input");
const resultsDiv = document.getElementById("results");

// Triggers the search again for the next booking slot
window.addEventListener("pageshow", () => {
  searchInput.dispatchEvent(new Event("input"));
})

// Takes input from the search bar
searchInput.addEventListener("input", async () => {
    
    const searchValue = searchInput.value.trim(); // Trims each value of search input

    if (searchValue === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    // Applies query to the collection with a created index in firebase
    const q = query (
       collection(db, "availableSlots"),
       where("status", "==", "available"), 
       where("teacherName", ">=", searchValue),
       where("teacherName", "<=", searchValue + "\uf8ff")
    );

    // Gets query shot from q
    const querySnapshot = await getDocs(q);

    resultsDiv.innerHTML = "";

    if (querySnapshot.empty) {
        resultsDiv.innerHTML = "<h5> No available slots found </h5>";
        return;
    }

    // Checks each data
    querySnapshot.forEach((docSnap) => {

        // Gets data from docSnap 
        const data = docSnap.data();

        // Adds table to the div, takes the student to the Book.html page on clicking the book button
        resultsDiv.innerHTML += `
          <br><div class = "slot-card">
            <p> ${data.teacherName} </p>
            <p> ${data.date} : ${data.time} </p>
            <button onclick = "window.location.href = 'Book.html?slotId=${docSnap.id}'">
              Book
            </button>
          </div>
        `;
    });

});