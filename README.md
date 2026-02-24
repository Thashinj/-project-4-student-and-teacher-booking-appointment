# -project-4-student-teacher-booking-appointment-firebase

Project 4 – Student & Teacher Booking Appointment System using HTML, CSS, JavaScript & Firebase

This project is a role-based Student & Teacher Booking Appointment System integrated with Firebase Authentication and Cloud Firestore Database.

The system allows secure login for Admin, Teachers, and Students, and provides real-time appointment booking with slot management to prevent double bookings.


# Technologies Used

* HTML – Structure
* CSS – Styling Interface
* JavaScript – Application Logic
* Firebase Authentication – Secure Login System
* Firebase Firestore – Real-Time Database

# ⚠️ Important Notice About Demo Login Credentials

> 🚨 **The email addresses listed below are strictly for testing/demo purposes only.**
>
> These accounts do **NOT** represent real individuals and may not exist outside this Firebase project.
>
> They are pre-created inside Firebase Authentication only for demonstrating role-based login functionality in this project.
>
> Please do not attempt to use these credentials outside this project.

# Demo Login Credentials

Use the following accounts to test different user roles:

# Admin Account

* Email: adminxyz@gmail.com
* Password: admin*123

# Teacher Account

* Email: rahulpandey@gmail.com
* Password: rahul*09

# Student Account

* Email: parissliton08@gmail.com
* Password: paris*1235

# User Roles & Features

#  Admin Dashboard

* View all registered users
* Add or remove teachers
* View all booked appointments
* Manage teacher availability
* Monitor system activity

# Teacher Dashboard

* Secure login using Firebase Authentication
* Set available dates and time slots
* View booked appointments
* Accept or reject appointment requests
* Update availability

# Student Dashboard

* Secure login
* View available teachers
* Select date & time slot
* Book appointment
* View booking history

Booked time slots automatically become unavailable to prevent double booking.

# Appointment Booking Flow

1. User logs in based on role.
2. Student selects a teacher.
3. Student chooses an available date and time slot.
4. Appointment data is stored in Firebase Firestore.
5. The selected time slot becomes unavailable for others.

# Security & Validation

* Firebase Authentication handles secure login
* Role-based access control implemented
* Required field validation
* Real-time database updates
* Session-based access control

# Logout & Session Management

* Secure logout functionality
* Session persists until logout
* Unauthorized access to dashboards is restricted


If you like this project, please ⭐ the repository!
