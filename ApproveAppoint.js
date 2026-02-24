// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

import {getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

const appointmentBody = document.getElementById("appointmentBody"); // Gets element from tbody tag

onAuthStateChanged(auth, async (user) => { // Checks if the user is logged in

  if (!user) {
    alert("Not logged in");
    return;
  }

  const q = query (
    collection(db, "bookings"), // Gets info from the collection with query
    where("teacherId", "==", user.uid),
    where("status", "==", "pending")
  );
  
  const querySnapshot = await getDocs(q);

  appointmentBody.innerHTML = ""; // Row is empty

  if (querySnapshot.empty) {
    appointmentBody.innerHTML = `
      <tr>
        <td colspan = "5"> No pending booking requests </td>
      </tr>
    `
  }

  querySnapshot.forEach((docSnap) => { // Get each data from the collection in the table
    
    const data = docSnap.data(); 
    const bookingId = docSnap.id; // Gets document id from collection 

    const row = document.createElement("tr");  // Creates row element

    // Status change everytime the user rejects or approves the appointment
    row.innerHTML = `
          <td> ${data.studentName} </td>
          <td> ${data.date} </td>
          <td> ${data.time} </td>
          <td class = "status ${data.status}">
               ${data.status}
          </td>
          <td>  
              <button class="approve"> Approve </button><br><br>
              <button class="cancel"> Cancel </button>
          </td>
        `;

    appointmentBody.appendChild(row); // Row gets appended

    // Approve Button
    const approveBtn = row.querySelector(".approve"); // Gets class from Approve button
    if (approveBtn) {
      approveBtn.addEventListener("click", async () => { // Gets the class function

        await updateDoc(doc(db, "bookings", bookingId), { // Status is displayed as 'approved' in green color
          status: "approved"
        });

        await updateDoc(doc(db, "availableSlots", data.slotId), { // Status is displayed as 'booked' in green color
          status: "booked"
        });

        alert("Appointment Approved");
        row.remove(); // Removes row

      });
    }
    // Cancel Button
    const cancelBtn = row.querySelector(".cancel"); // Gets class from Cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener("click", async () => { // Gets the class function 

        await updateDoc(doc(db, "bookings", bookingId), { // Status is displayed as 'rejected' in red color
          status: "rejected"
        });

        await updateDoc(doc(db, "availableSlots", data.slotId), { // Status is displayed as 'rejected' in red color
          status: "available"
        });

        alert("Appointment Rejected");

        row.remove(); // Removes row
      });
    }

  });
});
