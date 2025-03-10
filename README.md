
# Hotel Booking Application

## Description

This is a simple hotel booking web application built using React and styled-components. The app allows users to register, log in, book hotels, add family members to the booking, and check in to the hotel. It provides a responsive design with seamless navigation and real-time data fetching from a backend API.

## Features

- **User Registration**: New users can register and create an account.
- **User Login**: Registered users can log in.
- **Hotel Booking**: Users can select a hotel, input check-in and check-out dates, and add family members.
- **Family Member Management**: Add or remove family members from the booking.
- **Check-In**: Once the booking is confirmed, users can check in to the hotel.

## Technologies Used

- **React**: For building the user interface.
- **Styled Components**: For styling the components.
- **React Router**: For routing and navigation between pages.
- **Axios**: For making API calls to the backend server.
- **Toastify**: For showing success and error notifications.
- **React Context**: For managing global state (e.g., login state).
- **Backend**: A Node.js server running with Express to handle hotel data and bookings.

## Project Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version >= 14)
- npm or yarn
- React (version >= 18)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Dibyendu-13/hotel-booking.git
   ```

2. Navigate into the project directory:

   ```bash
   cd hotel-booking
   ```

3. Install the required dependencies:

   For the frontend:

   ```bash
   cd frontend
   npm install
   ```

   For the backend:

   ```bash
   cd backend
   npm install
   ```

4. Start the development server:

   For the frontend:

   ```bash
   npm start
   ```

   For the backend:

   ```bash
   npm run dev
   ```

The application should now be accessible at [http://localhost:3000](http://localhost:3000).

Backend API

Make sure the backend API server is running on [http://localhost:5001/api](http://localhost:5001/api). This server handles hotel data and booking functionality. You may need to set up your own backend or use mock data.

## API Endpoints

### Hotels Endpoints

#### GET /api/hotels

**Description**: Fetch all hotels available for booking.

**Response**:

```json
{
  "hotels": [
    {
      "id": "1",
      "name": "Grand Plaza",
      "location": "New York",
      "available_rooms": 20
    },
    {
      "id": "2",
      "name": "Royal Suite",
      "location": "Los Angeles",
      "available_rooms": 15
    }
  ]
}
```

### Booking Endpoints

#### POST /api/booking

**Description**: Submit a booking with user details, hotel choice, dates, and family members.

**Request Body**:

```json
{
  "user_id": "123",
  "hotel_id": "1",
  "check_in_date": "2025-05-01",
  "check_out_date": "2025-05-07",
  "family_members": [
    {
      "name": "John Doe",
      "aadhaar_number": "1234-5678-9012"
    },
    {
      "name": "Jane Doe",
      "aadhaar_number": "2345-6789-0123"
    }
  ]
}
```

**Response**:

```json
{
  "message": "Booking successful",
  "booking_id": "abc123",
  "hotel_name": "Grand Plaza",
  "check_in_date": "2025-05-01",
  "check_out_date": "2025-05-07"
}
```

### Check-In Endpoints

#### POST /api/checkin

**Description**: Check in to the hotel after a successful booking.

**Request Body**:

```json
{
  "booking_id": "abc123",
  "user_id": "123"
}
```

**Response**:

```json
{
  "status": "success",
  "message": "Check-in successful"
}
```

### User Registration Endpoints

#### POST /api/register

**Description**: Register a new user with their details.

**Request Body**:

```json
{
  "username": "johndoe",
  "password": "securepassword123",
  "email": "johndoe@example.com"
}
```

**Response**:

```json
{
  "status": "success",
  "message": "User registered successfully"
}
```

### User Login Endpoints

#### POST /api/login

**Description**: Log in with username and password.

**Request Body**:

```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response**:

```json
{
  "status": "success",
  "message": "Login successful",
  "token": "jwt-token"
}
```

## Environment Variables

Ensure the following environment variables are set for both the backend and frontend:

### Backend (in .env file)

- **DB_URI**: MongoDB connection URI.
- **PORT**: Port for backend server (default: 5001).
- **JWT_SECRET**: Secret key for JWT token generation.

### Frontend (in .env file)

- **REACT_APP_API_URL**: URL for the backend API (default: http://localhost:5001/api).

## Future Improvements

- Implement user authentication with JWT tokens.
- Add payment gateway for booking confirmations.
- Implement more advanced error handling and validation for bookings.
- Add user profile management with booking history.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React and styled-components for building the UI.
- Express and MongoDB for the backend API.
- Axios for making HTTP requests.
- React Router for navigation.
- React Toastify for notifications.
