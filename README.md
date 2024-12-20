# E-Commerce Application

## Overview
This project is a full-stack e-commerce application designed to deliver an engaging and seamless online shopping experience. It features a scalable backend, a modern and responsive frontend, and advanced functionalities for users, administrators, and payment integrations.

## Features

### Frontend
- **Technology Stack**: React.js, Tailwind CSS
- **Features**:
  - Responsive and clean user interface
  - Featured products slider
  - Shopping cart system with dynamic quantity updates
  - Coupon system for discounts
  - User dashboard for order tracking
  - Sales analytics for customers

### Backend
- **Technology Stack**: Node.js, Express.js, MongoDB
- **Features**:
  - Product and category management
  - JWT-based authentication for secure sessions
  - Redis caching for improved performance
  - RESTful API design for seamless client-server communication
  - Admin Dashboard with product and order management features

### Payment Integration
- Integrated with **Stripe** for secure and efficient checkout.

## Deployment
- **Frontend Deployment**: Deployed on a modern hosting platform with CDN support for optimal performance.
- **Backend Deployment**: Optimized Node.js server with a connection to MongoDB Atlas.

## Project Highlights
1. **Scalability**: The backend is designed to handle high traffic and large datasets efficiently.
2. **Security**: Implemented best practices like JWT authentication, password hashing, and secure payment integrations.
3. **Performance**: Used Redis caching to minimize database queries and improve load times.
4. **User Experience**: Delivered a modern, intuitive, and responsive UI with smooth navigation.

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- MongoDB (or use MongoDB Atlas)
- Redis (for caching)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables:
   ```env
   PORT=5000
   MONGO_URI=<Your MongoDB connection string>
   REDIS_URI=<Your Redis connection string>
   JWT_SECRET=<Your JWT secret key>
   STRIPE_SECRET_KEY=<Your Stripe secret key>
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables:
   ```env
   REACT_APP_API_URL=<Backend API URL>
   REACT_APP_STRIPE_PUBLIC_KEY=<Your Stripe publishable key>
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Usage
1. Access the application at the specified URL after deployment.
2. Register as a user to start shopping or log in as an admin to manage the store.
3. Add products to the cart, apply coupons, and proceed to checkout using Stripe.
4. Use the Admin Dashboard for managing products, categories, and orders.

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Axios (for API requests)

### Backend
- Node.js
- Express.js
- MongoDB
- Redis

### Payment
- Stripe

### Deployment
- MongoDB Atlas (Database)
- Hosting platforms with CDN

## Future Enhancements
- Add support for multiple languages and currencies.
- Implement advanced analytics for administrators.
- Integrate real-time order tracking.

## Contributions
Contributions are welcome! Feel free to fork this repository and submit pull requests for new features, improvements, or bug fixes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

## Contact
For any inquiries or feedback, feel free to reach out to:
- **Email**: siddapurampavan9381@gmail.com

