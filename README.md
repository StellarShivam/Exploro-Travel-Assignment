# Exploro-Travel-Assignment

Welcome to the Travel Website Development project! This repository contains the implementation of a fully functional travel website, developed as part of an internship assignment for Exploro. The platform allows users to browse, book, and manage trips seamlessly. Additionally, it includes features for trip organizers to register, add trips, and manage bookings. Built using React for the frontend and a modular backend (using Node.js), this project demonstrates technical proficiency, creative problem-solving, and adherence to real-world requirements.

---

## GitHub Link
[Exploro-Travel-Assignment](https://github.com/StellarShivam/Exploro-Travel-Assignment)

---

## Prerequisites
- **Node.js** (v16.0.0 or later)
- **npm** (v8.0.0 or later)
- A modern web browser

---

## Setup and Installation

Follow these steps to set up and run the Travel Website application.

### **1. Clone the Repository**
```bash
git clone https://github.com/StellarShivam/Exploro-Travel-Assignment.git
cd Exploro-Travel-Assignment
```

### **2. Install Dependencies and Run the Backend**
Open a new terminal and run the following commands:
```bash
cd backend
npm install
npm start
```

### **3. Install Dependencies and Run the Frontend**
Open another terminal and run the following commands:
```bash
cd frontend
npm install
npm start
```

---

## Application Functionality

### **Key Features**

#### **Core Functionalities:**
1. **Trip Listing and Details:**
   - Displays a list of upcoming trips on the landing page.
   - Each trip includes detailed information such as name, description, dates, price, available slots, and cancellation policy.

2. **Trip Booking:**
   - Allows users to add trips to a cart and complete a checkout process.
   - Only authenticated users can book trips.

3. **Authentication:**
   - Unauthenticated users can browse trips but must log in or sign up to book.
   - const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
   - Token expiration time is set to 1hr. which automatically logs out user in 1hr 

4. **Trip Organizer Dashboard:**
   - Enables trip organizers to:
     - Register and log in.
     - Add new trips.
     - View, edit, or delete their trips.

5. **Booking Management and Cancellation:**
   - Authenticated users can view and manage their bookings.
   - Cancellation policy:
     - Full refund if canceled 15 days prior.
     - 50% refund if canceled 7 days prior.
     - No refund if canceled less than 7 days prior.

6. **Payment Handling:**
   - Implements a dummy payment system for storing payment details, with extensibility for third-party payment gateways.

7. **Responsive Layout:**
   - Landing page lists trips with options to view details or add to cart.
   - User dashboard for managing bookings and trips.

---

## Website Preview

### **Home Page Views**
![Home Page](https://i.postimg.cc/rpH34pWg/image.png)

### **Trip Listing View**
![Trip Listing](https://i.postimg.cc/KvsHwzpb/image.png)

### **Trip Details View**
![Trip Details 1](https://i.postimg.cc/L8SFNhJs/image.png)
![Trip Details 2](https://i.postimg.cc/ZYyqQB5P/image.png)
![Trip Details 3](https://i.postimg.cc/vmc1HPbk/image.png)

### **Authentication**
![Authentication 1](https://i.postimg.cc/WtLkkj9K/image.png)
![Authentication 2](https://i.postimg.cc/zfT7wF93/image.png)

### **Dashboard**
![Dashboard 1](https://i.postimg.cc/vBPhp28B/image.png)
![Dashboard 2](https://i.postimg.cc/8zCVRnKC/image.png)
![Dashboard 3](https://i.postimg.cc/7ZPmbFBK/image.png)

### **Edit Your Created Trip**
![Edit Trip](https://i.postimg.cc/Mp8gtZWt/image.png)

### **View Your Booking Details**
![Booking Details](https://i.postimg.cc/hvZPTzFC/image.png)

### **Booking Trip Flow**
![Booking Flow 1](https://i.postimg.cc/Jh3TnjZW/image.png)
![Booking Flow 2](https://i.postimg.cc/LX2mYkWk/image.png)
![Booking Flow 3](https://i.postimg.cc/SQ7bYzLV/image.png)

---

## Technology Stack

### **Frontend:**
- React.js
- React Router
- Context API for state management
- Lucide React for icons
- SCSS for styling

### **Backend:**
- Node.js
- MongoDB as the database

---

## API Documentation

### **Authentication Endpoints:**
- **POST /signup**
  - Registers a new user.
  - Request Body: `{ "email": "example@example.com", "password": "password123" }`
  - Validations: Email must be valid; Password must be at least 6 characters long.

- **POST /signin**
  - Authenticates a user and returns a token.
  - Request Body: `{ "email": "example@example.com", "password": "password123" }`

### **Booking Endpoints:**
- **POST /createBooking**
  - Creates a new booking for the authenticated user.
  - Protected Route.
  - Request Body: `{ "tripId": "trip_id" }`

- **GET /getMyBookings**
  - Retrieves all bookings for the authenticated user.
  - Protected Route.

- **GET /getBooking/:bookingId**
  - Retrieves details of a specific booking.
  - Protected Route.

- **GET /getTripBookings/:tripId**
  - Retrieves all bookings for a specific trip.
  - Protected Route.

### **Cart Endpoints:**
- **POST /add**
  - Adds a trip to the authenticated user's cart.
  - Protected Route.
  - Request Body: `{ "tripId": "trip_id" }`

- **GET /getCart**
  - Retrieves the authenticated user's cart items.
  - Protected Route.

- **DELETE /item/:itemId**
  - Removes a specific item from the cart.
  - Protected Route.

### **Payment Endpoints:**
- **POST /makePayment**
  - Processes booking and payment for a trip.
  - Protected Route.
  - Request Body: `{ "tripId": "trip_id", "paymentDetails": { ... } }`

### **Trip Management Endpoints:**
- **POST /createTrip**
  - Creates a new trip (Organizer only).
  - Protected Route.
  - Request Body: `{ "title": "Trip Title", "description": "Trip Description", "startDate": "2024-01-01", "endDate": "2024-01-10", "slots": 10 }`

- **GET /getAllTrips**
  - Retrieves all trips available.

- **GET /getMyTrips**
  - Retrieves trips created by the authenticated organizer.
  - Protected Route.

- **GET /getTrip/:tripId**
  - Retrieves details of a specific trip.

- **PUT /update/:tripId**
  - Updates a specific trip (Organizer only).
  - Protected Route.
  - Request Body: Fields to update.

- **DELETE /deleteTrip/:tripId**
  - Deletes a specific trip (Organizer only).
  - Protected Route.

---


## License
This project has been built by Shivam Anand from IIIT Sonepat.

---

## Contact
**SHIVAM ANAND**  
Email: shivam.anand.216@gmail.com

