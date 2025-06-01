# Car Buddy

Car Buddy is a Node.js backend API for managing car listings, user authentication, and orders. Built with Express, TypeScript, and MongoDB, it supports dealers and buyers with secure authentication and robust validation.

## Features
- User registration and login (JWT-based authentication)
- Car CRUD operations (add, update, get, list)
- Order creation and management
- Role-based access (dealer, buyer)
- Input validation with Joi
- Error handling middleware
- Comprehensive testing with Jest and Supertest

## Project Structure
```
src/
  app.ts                # Express app setup
  main.ts               # Entry point
  auth/                 # Auth controllers, services, DTOs
  cars/                 # Car controllers, services, DTOs
  orders/               # Order controllers, services, DTOs
  users/                # User models and services
  middleware/           # Auth and error middleware
  config/               # Config and DB connection
  utils/                # App error utilities
  validators/           # Request body/query validators
```

## Getting Started

### Prerequisites
- Node.js >= 18
- npm
- MongoDB instance (local or cloud)

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd car-buddy
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root with:
   ```env
    PORT=your-port-number
    NODE_ENV=development
    CONNECTION_STRING=your-mongodb-connection-string
    JWT_SECRET=your-jwt-secret
    JWT_EXPIRATION=your-jwt-expiration-time
    SALT_ROUNDS=your-salt-rounds
    DATABASE=car-buddy
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

### Build and Run
```sh
npm run build
npm start
```

### Run Tests
```sh
npm test
```

## API Documentation

### Auth
- **POST /auth/register** — Register a new user
  - Body: `{ firstName, lastName, email, password, role }`
- **POST /auth/login** — Login and receive JWT
  - Body: `{ email, password }`

### Cars
- **POST /cars/add** — Add a new car (dealer only)
- **GET /cars/all** — List all cars (dealers see their own, supports query params)
- **GET /cars/:id/get** — Get car by ID
- **PATCH /cars/:id/update** — Update car (dealer only)
- **DELETE /cars/:id/delete** — Delete car (dealer only)

### Orders
- **POST /orders/create** — Create a new order
  - Body: `{ carId, dealerId, note(optional) }`
- **GET /orders/all** — List orders (dealers see all, users see their own, supports query params)

### Users
- **GET /users/:id** — Get user profile

## Usage Example
Register, login, and use the JWT token in the `Authorization` header:
```http
Authorization: Bearer <token>
```

## Contributing
Pull requests are welcome. For major changes, open an issue first.

## License
ISC

