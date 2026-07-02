# CoreExplorer

CoreExplorer is a full-stack web app with a Flask backend and a React frontend. It helps students explore career paths by using quiz results, subjects, careers, institutions, and learning resources.

## Project structure

- backend/ — Flask app, SQLAlchemy models, and API routes
- frontend/ — React app built with Vite

## Prerequisites

Make sure you have the following installed:

- Python 3
- Node.js and npm
- PostgreSQL (for the default database configuration)

## Backend setup

1. Open the project folder:
   ```bash
   cd /home/m_h_t-musa/Documents/personal_github/coreExplorer
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Install backend dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Make sure PostgreSQL is running and that a database named coreexplore exists, or set a different database URL:
   ```bash
   export DATABASE_URL="postgresql://postgres:password@localhost/coreexplore"
   ```
5. Start the Flask backend:
   ```bash
   cd backend
   python app.py
   ```
6. The backend will run at:
   ```text
   http://127.0.0.1:5000
   ```

## Frontend setup

1. Open the frontend folder:
   ```bash
   cd /home/m_h_t-musa/Documents/personal_github/coreExplorer/frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. The frontend will usually be available at:
   ```text
   http://localhost:5173
   ```

## API endpoints

The backend currently exposes these routes:

- GET /api/institutions
- GET /api/questions

## Run both servers together

Open two terminals.

### Terminal 1: backend
```bash
cd /home/m_h_t-musa/Documents/personal_github/coreExplorer
source .venv/bin/activate
cd backend
python app.py
```

### Terminal 2: frontend
```bash
cd /home/m_h_t-musa/Documents/personal_github/coreExplorer/frontend
npm install
npm run dev
```

Once both are running, open the frontend URL shown by Vite and make sure the backend is reachable at http://127.0.0.1:5000.

## Troubleshooting

### Backend fails to start
- Check that PostgreSQL is running.
- Make sure the database URL is correct.
- Verify that the Python dependencies were installed successfully.

### Frontend cannot reach the backend
- Make sure the backend is still running.
- Confirm the frontend is calling the correct backend address.
- If needed, update the fetch URL in the frontend code to match your local backend host.

### Port already in use
- If port 5000 is busy, stop the old Flask process or change the port.
- If port 5173 is busy, Vite will usually suggest another port.

## Development notes

- The frontend talks to the backend using fetch requests.
- The backend uses Flask, SQLAlchemy, and PostgreSQL.
- If you change the database connection string, make sure the new value is available to the backend process.
- The project is still growing, so keeping the backend logic organized and the frontend components small will make future development much easier.
