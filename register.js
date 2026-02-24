// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";

// Creating user with email and password
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

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
const submit = document.getElementById("signup");

submit.addEventListener("click", function (event) {
  event.preventDefault();

  // Obtain inputs from the html file
  const fname = document.getElementById("fname").value;
  const lname = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confPassword = document.getElementById("confirmPassword").value;

  // Creates authentication and database
  const auth = getAuth(app);
  const db = getFirestore(app);

  if (email === "" || password === "" || fname === "" || lname === "") {
    alert("Please fill in all fields"); // If email or passwords are empty
    return;
  }
  else if (password != confPassword) {
    alert("Passwords don't match"); // If password and confirm password do not match
    return;
  }

  // Creating a user with email and password given
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      const userData = {
        // Only allowed for students
        firstName: fname,
        lastName: lname,
        email: email,
        role: "student",
        approved: false
      };

      const docRef = doc(db, "users", user.uid); // Creates collection users and gets the userData
      setDoc(docRef, userData).then(() => {
        window.location.href = "Student.html"; // Directs to the student page
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert("Account already exists!"); // Displays the error if account already exists
    });
});
