
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

```bash
cd frontend
npm install
```
```bash
cd backend
npm install
```

4. Start the development server:

Frontend: 
```bash
npm start
```
Backend:

```bash
npm run dev
```


The application should now be accessible at `http://localhost:3000`.

### Backend API

Make sure the backend API server is running on `http://localhost:5001/api`. This server handles hotel data and booking functionality. You may need to set up your own backend or use mock data.

## Folder Structure

The project folder structure is organized as follows:

```
src/
├── components/               # Reusable UI components (e.g., Button, InputField, Navbar)
│   ├── Booking.js            # Booking page component
│   ├── CheckIn.js            # Check-In page component
│   ├── Footer.js             # Footer component
│   ├── Header.js             # Navbar component
│   ├── Login.js              # Login page component
│   ├── Register.js           # Register page component
│   ├── ThankYou.js           # Thank You page component
├── App.js                    # Main application component (routes, state management)
├── index.js                  # Entry point of the app
├── styled-components/        # Custom styled components
└── utils/                    # Utility functions (e.g., API calls, validation)
```

## Features Overview

### Register Component

- Users can register by providing their details (username, password).
- The data is sent to the backend API for validation.

### Login Component

- Users can log in by entering their username and password.
- Successful login redirects to the booking page.

### Booking Component

- Users can select a hotel from a dropdown list.
- Users can input check-in and check-out dates.
- Users can add family members by providing their names and Aadhaar numbers.
- Family members can be removed from the list.

### CheckIn Component

- After successful booking, users can check in to the hotel.

### ThankYou Component

- Displays a confirmation message after a successful booking.

## API Endpoints

### /api/hotels

- **GET**: Fetch all hotels available for booking.

### /api/booking

- **POST**: Submit a booking with user details, hotel choice, dates, and family members.

## Environment Variables

- Make sure to set up the environment variables as required by your backend API server (e.g., database configurations).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React and styled-components for building modern web applications.
- Axios for handling API requests.
- React Router for managing routes in a single-page application.
- React Toastify for notifications.

## Future Improvements

- Implement user authentication with JWT tokens.
- Improve error handling and validation.
- Add a payment gateway for booking confirmations.

