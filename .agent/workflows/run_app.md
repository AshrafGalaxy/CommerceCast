---
description: How to run the CommerceCast application
---

### Option 1: Run Everything in One Terminal (Recommended)

Run the unified full-stack dev runner (starts both Python FastAPI backend and Next.js Turbopack frontend with unified colorized logs):

```powershell
npm run dev:all
# or
.\dev.ps1
```

- **Frontend:** `http://localhost:9002`
- **Backend API:** `http://localhost:8000`

---

### Option 2: Instant Local Verification & Test Suite

Run full-suite TypeScript check, Next.js build compilation test, and Python syntax validation before pushing:

```powershell
npm run verify
```

---

### Option 3: Run In Separate Terminals

**Terminal 1: Python Backend**
```powershell
cd python-backend
.\venv\Scripts\Activate
python main.py
```

**Terminal 2: Next.js Frontend**
```powershell
npm run dev
```
