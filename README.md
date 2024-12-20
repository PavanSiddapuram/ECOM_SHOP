# E-Commerce Application  

An advanced, full-stack e-commerce application with modern features, built to deliver a seamless shopping experience.  

## Features  
- **User Authentication:** Secure JWT-based login with refresh/access tokens.  
- **Product Management:** CRUD operations for products and categories.  
- **Shopping Cart:** Add, update, and remove items from the cart.  
- **Checkout:** Integrated Stripe for secure payments.  
- **Coupons & Discounts:** Apply promotional codes for discounts.  
- **Admin Dashboard:** Manage products, categories, and view analytics.  
- **Sales Analytics:** Track sales and revenue with dynamic data visualization.  
- **Performance Optimization:** Redis caching for faster responses.  

---

## Tech Stack  
**Frontend:** React.js, Tailwind CSS, Vite  
**Backend:** Node.js, Express.js, MongoDB, Redis  
**Payments:** Stripe  

---

## Installation and Setup  

### Prerequisites  
Ensure the following are installed:  
- [Node.js](https://nodejs.org/)  
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)  
- [MongoDB](https://www.mongodb.com/)  
- [Redis](https://redis.io/)  

### Steps to Run Locally  

#### 1. Clone the Repository  
```bash
git clone <repository-url>
cd Ecoms
2. Install Dependencies
Navigate to each directory and install the required dependencies:

For the frontend:

bash
Copy code
cd frontend
npm install
For the backend:

bash
Copy code
cd backend
npm install
3. Configure Environment Variables
Create a .env file in both the frontend and backend directories with the necessary keys:

Backend .env Example:

env
Copy code
MONGO_URI=<your-mongo-db-connection-string>
REDIS_URL=<your-redis-connection-string>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
JWT_SECRET=<your-jwt-secret>
JWT_REFRESH_SECRET=<your-jwt-refresh-secret>
Frontend .env Example:

env
Copy code
VITE_BACKEND_URL=http://localhost:5000
4. Start the Servers
Frontend:

bash
Copy code
cd frontend
npm run dev
Access the frontend at http://localhost:5173/.

Backend:

bash
Copy code
cd backend
npm run dev
Access the backend at http://localhost:5000/.

Ensure MongoDB and Redis are running before starting the backend
