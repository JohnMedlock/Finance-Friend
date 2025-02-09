# Financial Helper

A modern web application that provides AI-powered financial advice and portfolio management with interactive 3D visualization.

---

## Overview

Financial Helper is a full-stack application that combines artificial intelligence, real-time analytics, and interactive 3D dashboards to help users make smarter financial decisions.

---

## Features

- **AI Financial Advisor**  
  - Customize your personal AI advisor  
  - Receive tailored financial guidance through natural conversations  
  - Engage with a 3D character for real-time interactions

- **Smart Dashboard**  
  - Interactive charts and data visualization  
  - Real-time financial analytics  
  - Portfolio performance tracking

- **Goal Management**  
  - Set and track financial goals  
  - Intelligent progress monitoring  
  - Personalized achievement strategies

- **Secure Platform**  
  - JWT authentication  
  - Protected API routes  
  - Encrypted data transmission

---

## Tech Stack

**Frontend**  
- [React](https://reactjs.org/) for UI development  
- [Three.js](https://threejs.org/) for 3D rendering  
- [Framer Motion](https://www.framer.com/motion/) for animations  
- [Axios](https://axios-http.com/) for API communication

**Backend**  
- [Node.js](https://nodejs.org/) for the runtime environment  
- [Express.js](https://expressjs.com/) for the web framework  
- [MongoDB](https://www.mongodb.com/) for the database  
- [JSON Web Tokens (JWT)](https://jwt.io/) for authentication

**AI/ML**  
- Custom AI models for financial advice  
- Natural Language Processing  
- 3D character generation

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)  
- [MongoDB](https://www.mongodb.com/)  
- npm (included with Node.js) or [Yarn](https://classic.yarnpkg.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JohnMedlock/Financial-Helper.git
cd Financial-Helper
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

5. Start the development servers:

**Backend**  
```bash
cd backend
npm run dev
```

**Frontend**  
```bash
cd frontend
npm run dev
```

After both servers start, you can access:  
- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Public Routes
- `POST /register` → User registration  
- `POST /login` → User authentication

### Protected Routes
- `GET /api/users/models/getModelsByUser/:email` → Get user's AI models  
- `POST /api/textTo3D` → Generate 3D character from text  
- Additional financial and portfolio management endpoints

---

## Contributing

1. Fork the repository  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:  
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:  
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [React](https://reactjs.org/) Community  
- [Three.js](https://threejs.org/) Community for 3D rendering  
- [MongoDB](https://www.mongodb.com/) team for database solutions  
- [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/) for the backend  
- Contributors and maintainers
