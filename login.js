// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

// Creating user with email and password
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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

//submit the info
const signIn = document.getElementById("login");

signIn?.addEventListener("click", async function (event) {
  event.preventDefault();

  // Obtain inputs from the html files
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Creates authentication and database
  const auth = getAuth(app);
  const db = getFirestore(app);

  if (email === "" || password === "") {
    alert("Please fill in all fields"); // Returns alert message if email or passwords are empty 
    return;
  }

  try {
    // Logging in
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // Creating user

    const uid = user.uid; // Finds user id from local storage (the user id and document id should be equal)
    localStorage.setItem("loggedInUserId", user.uid);

    // Get users document
    const usersDoc = await getDoc(doc(db, "users", uid));
    const role = usersDoc.data().role; // Gets role field from the usersDoc database

    // Redirects depending on the role
    if (role === "admin") {
        window.location.href = "Admin.html"; // Goes to admin page
      } 
      else if (role === "teacher") {
        window.location.href = "Teacher.html"; // Goes to teacher page
      } 
      else if (role === "student") {
        window.location.href = "Student.html";// Goes to student page
      }
      else {
        alert ("Login failed");
      }

  } catch (error) {
    alert("Incorrect Email or Password"); // Catches error if account doesnt exist
  }
});
