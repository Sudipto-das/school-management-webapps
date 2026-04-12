# School Management Webapp

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud instance)

### Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

```
Start the backend:
```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173` (default Vite port).
