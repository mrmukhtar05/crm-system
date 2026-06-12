# Support CRM System

A full-stack customer support ticketing system built with FastAPI and React.

## Live Demo
- **Frontend:** [Vercel URL yahan daalo]
- **Backend API:** [Railway URL yahan daalo]

## Tech Stack
- **Backend:** Python, FastAPI, SQLite
- **Frontend:** React, Vite, Tailwind CSS
- **Deployment:** Railway (Backend), Vercel (Frontend)

## Features
- Create support tickets with auto-generated ID
- List all tickets with search and filter
- Filter by status — Open, In Progress, Closed
- View ticket details and update status
- Add notes/comments on tickets

## Local Setup

### Backend
cd Backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/tickets | Create new ticket |
| GET | /api/tickets | List all tickets |
| GET | /api/tickets/{id} | Get ticket details |
| PUT | /api/tickets/{id} | Update ticket status |