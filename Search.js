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
    
    const searchValue = searchInput.value.trim().toLowerCase(); // Trims each value of search input

    if (searchValue === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    // Gets snap shot
    const snapshot = await getDocs(collection(db, "availableSlots"));

    resultsDiv.innerHTML = "";

    let found = false; // Found is flagged false

    // Checks each data
    snapshot.forEach((docSnap) => {

        // Gets data from docSnap 
        const data = docSnap.data();

        // Only show available slots
        if (data.status === "available") {
          // Case-insensitive comparision
          if (data.teacherName.toLowerCase().includes(searchValue)) {
            found = true; // Flagged true

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
          }
        }
    });

    if (!found){
      resultsDiv.innerHTML = "<h5> No available slots found </h5>";
    }
});
