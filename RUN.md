# Mental Health Hub - Run Guide

## Quick Start

### 1. Start the Backend Server
```bash
cd "/Users/nithishsaranks/Downloads/BPA 2025"
node backend/server.js
```
Backend runs on **http://localhost:5000**

Health check endpoint: `GET /api/ping` → `{ success: true, message: "pong" }`

### 2. Start the Frontend (in another terminal)
```bash
cd "/Users/nithishsaranks/Downloads/BPA 2025"
npm run dev
```
Frontend runs on **http://localhost:3000** (or next available port)

The browser should open automatically.

---

## API Endpoints (Backend)

### Health Check
- `GET /api/ping` → Returns pong

### Appointments
- `GET /api/appointments` → Fetch all appointments
- `GET /api/appointments/:email` → Get appointments by email
- `POST /api/appointments` → Create new appointment
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "sessionType": "Video Call",
    "date": "2025-12-20",
    "description": "Anxiety support"
  }
  ```

### Community Posts
- `GET /api/community/posts` → Fetch all posts
- `POST /api/community/posts` → Create a post
  ```json
  {
    "content": "Feeling better today",
    "author_name": "User Name"
  }
  ```
- `POST /api/community/posts/:id/like` → Like a post

### Blog & Resources
- `GET /api/blog/posts` → Fetch all blog posts
- `GET /api/blog/posts/:id` → Get single blog post
- `GET /api/resources` → Fetch all resources

### Statistics
- `GET /api/stats` → Get today's platform stats

### Counselor Availability
- `GET /api/counselors/available` → Get available counselor slots

---

## Configuration

### Backend (`.env`)
```
DATABASE_URL=postgresql://...  # Neon connection string
PORT=5000                       # Backend port
JWT_SECRET=...                  # JWT signing key
```

### Frontend API Base
Edit `index.jsx` to change backend URL:
```javascript
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
```

Or set via environment:
```bash
VITE_API_BASE=http://backend-url npm run dev
```

---

## Troubleshooting

**Backend won't start:**
- Ensure `PORT=5000` isn't in use (check: `lsof -i :5000`)
- Or change `PORT` in `.env` to a different number

**Frontend/Backend not communicating:**
- Check browser DevTools → Network tab → verify requests go to http://localhost:5000
- Check backend logs for errors

**Database connection issues:**
- The backend gracefully starts even if the database is unavailable
- API endpoints return empty data if DB queries fail
- Ensure `.env` has a valid `DATABASE_URL` (Neon requires SSL)

---

## Next Steps

1. Set up Neon database tables (if not already done)
2. Connect to a real database or switch to mock data
3. Add authentication/JWT routes
4. Deploy to hosting (e.g., Vercel for frontend, Heroku/Railway for backend)

