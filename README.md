# Personal Finance App — Scaffold (Sprint 1)

Overview
- Backend: Node.js + Express (plain JS), SQLite database (local file)
- Frontend: React (Vite) + Material UI
- Purpose: start with a running local app showing a transactions list; we'll extend it step-by-step.

Prerequisites (macOS)
1. Install Homebrew (if not installed):
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
2. Install Node.js (LTS):
   brew install node
   Confirm: `node -v` (recommended >= 18)
3. Install Git (if needed):
   brew install git

Project structure (created by scaffold)
- backend/
  - package.json
  - server.js
  - db.js
- frontend/
  - package.json
  - index.html
  - src/
    - main.jsx
    - App.jsx
    - components/TransactionsList.jsx
    - services/api.js
- sample_data/transactions.csv

Run the project (two terminals)

1) Backend
- Open Terminal, cd into backend folder:
  cd backend
  npm install
  npm run start
- Server runs on http://localhost:4000
  Endpoints:
  - GET /api/health
  - GET /api/transactions
  - POST /api/transactions

2) Frontend
- Open a second Terminal, cd into frontend:
  cd frontend
  npm install
  npm run dev
- Vite will show the local dev URL, usually http://localhost:5173 — open it in your browser.

Notes
- The backend will auto-create `data/finance.db` and seed sample transactions if database is empty.
- Transactions include a `currency` field (AUD or USD). Aggregation and currency conversion will be added in later sprints.
- If you run into permission or build issues when installing, paste the terminal error here and I’ll help fix it.

What I’ll walk you through after you confirm the scaffold runs:
1. Explain backend files and how the DB & seed work.
2. Explain frontend files and how it fetches the API.
3. Add POST (create) transaction flow and editing.
4. Add dashboard KPIs and charts.
5. Add calendar + journal.

If you’re ready, create the files below, run the two start commands, and paste any output you get. I’ll guide you through the next steps and explain everything line-by-line.
