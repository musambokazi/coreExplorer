# CoreExplore

CoreExplore is a full-stack web application designed to help students explore career paths. By leveraging a quiz-based assessment, it connects personal values and interests to specific subjects, careers, institutions, and learning resources.

This project features a sleek, Minimalist 60-30-10 design aesthetic on the frontend for optimal UI/UX.

## Project Structure

- `backend/` — FastAPI application, SQLAlchemy models, SQLite database, and API endpoints.
- `frontend/` — React frontend built with Vite and styled with Tailwind CSS v4.

## Prerequisites

Ensure you have the following installed before starting:
- **Python 3.8+** (for the backend)
- **Node.js (v18+)** and **npm** (for the frontend)

## Quick Start

### 1. Backend Setup (FastAPI & SQLite)

The backend uses FastAPI and an SQLite database (`coreexplore.db`).

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the FastAPI server (it runs on port 8000 by default):
   ```bash
   uvicorn fastapi_app.main:app --reload
   ```
   *The API will be available at `http://127.0.0.1:8000`*

### 2. Frontend Setup (React & Vite)

The frontend is a modern React application utilizing Tailwind CSS v4.

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will be available at `http://localhost:3000` (or the next available port like 3001 if 3000 is occupied).*

## API Endpoints

The FastAPI backend exposes the following primary routes (see `http://127.0.0.1:8000/docs` for the interactive Swagger UI):
- `GET /api/institutions`
- `GET /api/questions`

## Design System

The frontend strictly adheres to a **Minimalist 60-30-10** design system:
- **60% Dominant:** Clean white (`#FFFFFF`) and off-white backgrounds with generous whitespace.
- **30% Secondary:** Slate gray text and crisp, thin structural borders.
- **10% Accent:** Electric Blue (`#2563EB`) utilized exclusively for primary actions, links, and highlights.

## Troubleshooting

### Backend Fails to Start
- Ensure the virtual environment is activated.
- Verify `requirements.txt` dependencies are correctly installed.

### Frontend Cannot Reach Backend
- Ensure the backend is actively running on port 8000 in a separate terminal.
- Check the console for CORS errors (CORS is enabled in `fastapi_app/main.py`).

### Port Already in Use
- If `npm run dev` fails due to port 3000 being in use, close old terminal sessions or let Vite automatically assign `3001`.
- For the backend, you can specify a different port using `--port 8001` if necessary.
