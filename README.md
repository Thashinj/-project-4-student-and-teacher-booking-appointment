# -project-4-student-and-teacher-booking-appointment
Project 4 - Student and Teacher Booking Appointment using HTML, CSS, JavaScript and Firebase

In this project, I have created a Student & Teacher Appointment Booking System that allows students to search for available teacher slots, book appointments, and communicate through a messaging feature. Teachers can create available time slots, approve or reject booking requests, and manage their schedule efficiently. An admin role is also included to manage teacher accounts.

This system demonstrates full-stack frontend logic integrated with Firebase Authentication and Firestore database.

# Languages used 
HTML - Structure 

CSS - Styling Interface 

JavaScript - Functionality

Firebase Authentication & Firestore – User login/signup system & Real-time database management

# User roles
🔹 Admin

Add new teachers

Update teacher details

Delete teacher accounts

Approve student registrations (if implemented)

🔹 Teacher

Create available appointment slots

View all booking requests

Approve or reject student bookings

View messages from students

Manage personal schedule

🔹 Student

Search for teachers

View available time slots

Book appointments

View booking status (Pending / Approved / Rejected)

Send messages to teachers

# Demo Login Credentials (For Testing Purposes Only)

>> 🚨 Open the Opening.html file to access the full project
You may use the following sample accounts to explore different user roles in the system when logging in: 

 Admin Account:

Email: adminxyz@gmail.com
Password: admin*123

 Student Account:

Email: parissliton08@gmail.com
Password: paris*1235

 Teacher Account:

Email: rahulpandey@gmail.com
Password: rahul*09

> ⚠️ These accounts are for demonstration/testing purposes only.
> Please do not use real personal credentials.

# Features & How to Use
Authentication System:

Users can sign up and log in securely using Firebase Authentication.
Role-based access control ensures:

Admin sees admin dashboard

Teacher sees teacher dashboard

Student sees student dashboard

Teacher Slot Scheduling

Teachers can:

Select a date and time

Create available slots

Store slot data in Firestore

Manage booking status:

Each slot contains:

Teacher ID

Teacher Name

Date

Time

Status (available/booked)

Search & Booking System:

Students can:

Search teachers by name

View only available slots

Click “Book” to request an appointment

When booked:

A booking document is created

Status is set to Pending

The slot is removed from available search results

Approve / Reject Appointments:

Teachers can:

View pending booking requests

Approve or reject appointments

Automatically update booking status in Firestore

Status Indicators:

🟠 Pending

🟢 Approved

🔴 Rejected

Messaging System:

Students can:

Search teachers

Send messages directly

Teachers can:

View messages sent to them

See student name and message content

Booking Tracking:

Students can:

View all their bookings

Track status updates in real-time

Teachers can:

View all student booking requests

Manage approvals easily

Logout System:

Secure logout functionality redirects users back to the main landing page.

If you like this project, please ⭐ the repo!
