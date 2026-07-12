# IntervueAI — AI-Powered Interview Preparation Platform

<div align="center">

![IntervueAI Banner](https://via.placeholder.com/900x200/161616/b8456e?text=IntervueAI)

**Generate tailored interview questions, match scores, and personalised preparation plans using AI — in seconds.**

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v24-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Redis](https://img.shields.io/badge/Redis-Cloud-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![Gemini](https://img.shields.io/badge/Gemini-2.5--Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)

[Features](#features) · [Tech Stack](#tech-stack) · [Architecture](#architecture) · [Getting Started](#getting-started) · [API Reference](#api-reference) · [Screenshots](#screenshots)

</div>

---

## Overview

**IntervueAI** is a full-stack SaaS application that uses Google's Gemini 2.5 Flash model to generate personalised interview preparation reports. Candidates upload their resume and paste a job description — the AI analyses the match, generates role-specific technical and behavioral questions with detailed answer guides, identifies skill gaps, and builds a day-by-day preparation plan.

Built with a feature-based architecture on both the frontend (React + Vite) and backend (Node.js + Express), with MongoDB for persistence, Redis Cloud for OTP/session management, and Nodemailer for transactional email.

---

## Features

### Authentication
- **Register / Login** — JWT-based authentication stored in HTTP-only cookies
- **Forgot Password flow** — Email OTP via Nodemailer (SMTP), verified against Redis with a 5-minute TTL
- **OTP Verification** — 5-digit code with attempt limiting (max 3 attempts before forced reset), 30-second resend cooldown
- **Reset Password** — Single-use reset token issued after OTP verification, stored in Redis with a 10-minute TTL
- **Password strength indicator** — Real-time 4-level strength meter on the reset form
- **Protected routes** — Auth-gated layout with session bootstrapping via `/get-me`

### Report Generation
- **Resume upload** — PDF upload with drag-and-drop support, parsed server-side using `pdf-parse`
- **AI analysis** — Sends resume text + job description + self description to Gemini 2.5 Flash
- **Structured output** — Response enforced via `zod-to-json-schema` converting Zod schemas to JSON Schema for the Gemini API
- **Generating modal** — Step-by-step animated progress UI while the AI processes (typically 15–30 seconds)
- **Report ready modal** — Summary card with match score gauge, role, question counts, and top skill gaps shown immediately on completion

### Interview Reports
Each report contains:
- **Match score** (0–100%) — Overall candidate-to-role alignment
- **Technical questions** — Role-specific questions with interviewer intention and a full Markdown-formatted answer guide (approach, key concepts, experiences to highlight, mistakes to avoid, ideal structure)
- **Behavioral questions** — STAR-framework guided answers
- **Skill gaps** — Identified gaps with severity levels (high / medium / low)
- **Preparation plan** — Day-by-day action plan with concrete, measurable tasks

### Reports Management
- **Reports list** — Table view with match score badges (colour-coded), skill gap count, and date
- **Report detail** — Full report view with animated score gauge (0→score animation), collapsible question accordions, expandable summary cards, skill gap badges, and a timeline-style prep plan

### Dashboard & Analytics
All aggregated via a single MongoDB aggregation pipeline:
- **KPI cards** — Total reports, average match score, latest match score (colour-coded), total skill gaps flagged
- **Match score trend** — Pure SVG line chart with gradient area fill (no charting library)
- **Top skill gaps** — Horizontal bar chart sorted by severity then frequency
- **Recent reports** — Quick access to last 3 reports with inline score badges

### UX & Design
- Dark premium design system (wine/rose accent `#922d50`, `#161616` base)
- Manrope + Inter typography pairing
- Collapsible sidebar with active nav highlighting
- Animated 404 page (waveform signal-drop animation)
- Full-screen loader component with pulsing ring animation
- Reusable `Modal` component via React portal (backdrop blur, keyboard escape, focus lock)
- `ExpandableText` component for truncated long-form content
- Responsive layout (sidebar auto-collapses on mobile)
- `prefers-reduced-motion` respected on all animations

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| React Router v6 | Client-side routing with nested routes |
| Axios | HTTP client with interceptors |
| SCSS (Sass) | Styling with CSS custom properties design tokens |
| Google Fonts (Manrope + Inter) | Typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js (ESM) | Runtime (ES Modules throughout) |
| Express.js | HTTP framework |
| MongoDB + Mongoose | Primary database and ODM |
| Redis Cloud | OTP storage, reset token storage (TTL-based) |
| Google Gemini 2.5 Flash | AI report generation |
| `@google/genai` | Official Gemini SDK |
| `zod` + `zod-to-json-schema` | Schema definition and JSON Schema conversion for Gemini |
| `pdf-parse` | Server-side PDF text extraction |
| `multer` | Multipart file upload handling |
| `nodemailer` | Transactional email (SMTP) |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT generation and verification |
| `dotenv` | Environment variable management |
| `cookie-parser` | HTTP-only cookie handling |
| `cors` | Cross-origin resource sharing |

---

## Architecture

### Repository Structure
```
ai-interview-app/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── env.js              # dotenv bootstrap (imported first)
│       │   ├── db.js               # MongoDB connection
│       │   └── redis.js            # Redis client (lazy init via connectRedis())
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   └── report.controller.js
│       ├── services/
│       │   ├── auth.service.js
│       │   ├── report.service.js
│       │   └── ai.service.js       # Gemini API integration
│       ├── repositories/
│       │   └── auth.repository.js
│       ├── models/
│       │   ├── user.model.js
│       │   └── interviewReport.model.js
│       ├── routes/
│       │   ├── auth.routes.js
│       │   └── report.routes.js
│       ├── middleware/
│       │   └── authorize.js        # JWT verification middleware
│       ├── utils/
│       │   ├── helper.js           # generateOtp(), generateToken()
│       │   ├── mailer.js           # sendEmail() via Nodemailer
│       │   ├── emailTemplate.js    # otpEmailTemplate(), welcomeEmailTemplate()
│       │   ├── prompts.js          # Gemini prompt builder
│       │   └── ai-schemas.js       # Zod schema + zodToJsonSchema conversion
│       └── server.js
│
└── frontend/
    └── src/
        ├── components/             # Global shared components
        │   ├── Modal.jsx           # Portal-based reusable modal
        │   ├── ScreenLoader.jsx    # Full-screen loading state
        │   └── icons.jsx           # Custom inline SVG icons
        ├── features/
        │   ├── auth/
        │   │   ├── pages/          # Login, Register, ForgotPassword, VerifyOtp, ResetPassword
        │   │   ├── components/     # AuthBrandPanel, Protected
        │   │   ├── hooks/          # useAuth()
        │   │   ├── services/       # auth.api.js
        │   │   └── auth.context.jsx
        │   ├── layout/
        │   │   └── components/     # DashboardLayout, Sidebar, Topbar
        │   ├── dashboard/
        │   │   ├── pages/          # Dashboard.jsx
        │   │   ├── components/     # ScoreTrendChart, SkillGapBars
        │   │   └── hooks/          # useDashboard()
        │   └── interview/
        │       ├── pages/          # GenerateReport, Reports, ReportDetail
        │       ├── components/     # ResumeUploader, GeneratingModal, ReportReadyModal,
        │       │                   # ScoreGauge, QuestionAccordion, MarkdownLite,
        │       │                   # ExpandableText
        │       ├── hooks/          # useReports(), useReport()
        │       └── services/       # interview.api.js
        ├── utils/
        │   └── axiosInstance.js
        └── app.routes.jsx
```

### Key Design Decisions

**ESM throughout the backend** — `"type": "module"` in `package.json` means all imports use ES Module syntax. Every import must include the `.js` extension. `dotenv` is bootstrapped via a dedicated `src/config/env.js` file that is imported as the very first statement in `server.js`, before any other module — this solves the common problem of environment variables being `undefined` in module-level code (e.g. `createClient()`, `new GoogleGenAI()`).

**Lazy service client initialisation** — `redisClient`, `nodemailer` transporter, and `GoogleGenAI` are all created inside async functions rather than at module load time. This ensures `process.env` values are populated before the clients attempt to connect.

**Zod → JSON Schema for Gemini** — The Gemini API's `responseJsonSchema` expects a plain JSON Schema object, not a Zod instance. `zod-to-json-schema` with `{ $refStrategy: "none" }` converts the Zod schema inline (no `$ref` pointers) so Gemini can enforce the response structure.

**Redis route ordering** — Express matches routes top to bottom. `GET /dashboard` must be registered before `GET /:id`, otherwise `"dashboard"` is captured as a MongoDB ObjectId, causing a 500 error on every dashboard request.

**React Context + useCallback** — The `AuthContext` exposes `handleLogin`, `handleRegister`, `handleLogout` wrapped in `useCallback` with empty dependency arrays, preventing unnecessary re-renders across the component tree.

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Redis Cloud account (or local Redis)
- Google AI Studio API key (Gemini)
- Gmail account with App Password enabled (or any SMTP provider)

### 1. Clone the repository
```bash
git clone https://github.com/Amrik-Bhadra/ai-interview-app.git
cd ai-interview-app
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
# Server
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/ai-interview-app

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Redis Cloud
REDIS_HOST=your-redis-host.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=your_redis_password

# SMTP (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_16_char_app_password

# Google Gemini
GOOGLE_GENAI_API_KEY=AIza...

# Frontend origin (for CORS)
CLIENT_URL=http://localhost:5173
```

> **Gmail setup**: Enable 2-Step Verification → Google Account → Security → App passwords → generate a 16-character password. Use this as `SMTP_PASS`, not your Gmail password.

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:3000
```

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Reference

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register new user, returns JWT cookie |
| `POST` | `/login` | Public | Login, returns JWT cookie |
| `POST` | `/logout` | Private | Clear JWT cookie |
| `GET` | `/get-me` | Private | Returns current user from JWT |
| `POST` | `/forgot-password` | Public | Generates OTP, stores in Redis (5 min TTL), sends email |
| `POST` | `/verify-otp` | Public | Verifies OTP, returns single-use `resetToken` (10 min TTL) |
| `POST` | `/reset-password` | Public | Verifies `resetToken`, updates password, cleans up Redis |

### Reports — `/api/v1/report`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/dashboard` | Private | Aggregated analytics (KPIs, score trend, skill gaps, recent reports) |
| `GET` | `/` | Private | List all reports for logged-in user (lightweight) |
| `POST` | `/generate` | Private | Upload resume PDF + job/self description → AI report |
| `GET` | `/:id` | Private | Full report by ID (must belong to logged-in user) |

> **Route ordering matters**: `/dashboard` must be registered before `/:id` in Express or `"dashboard"` will be interpreted as a MongoDB ObjectId.

### Report Generation Request
```
POST /api/v1/report/generate
Content-Type: multipart/form-data

resume          File      PDF file (required)
jobDescription  string    Job description text (required)
selfDescription string    Candidate's self description (required)
```

### Dashboard Response Shape
```json
{
  "dashboard": {
    "totalReports": 5,
    "avgMatchScore": 79,
    "latestMatchScore": 82,
    "totalSkillGaps": 14,
    "scoreTrend": [
      { "_id": "...", "role": "Backend Developer", "matchScore": 82, "date": "Jul 12" }
    ],
    "topSkillGaps": [
      { "skill": "Redis Caching", "count": 3, "severity": "high" }
    ],
    "recentReports": [...]
  }
}
```

---

## Environment Variables Reference

### Backend
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 3000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | JWT expiry (e.g. `7d`) |
| `REDIS_HOST` | Redis Cloud hostname |
| `REDIS_PORT` | Redis Cloud port |
| `REDIS_PASSWORD` | Redis Cloud password |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port (465 for SSL, 587 for STARTTLS) |
| `SMTP_SECURE` | `true` for port 465, `false` for 587 |
| `SMTP_USER` | SMTP username / email |
| `SMTP_PASS` | SMTP password or App Password |
| `GOOGLE_GENAI_API_KEY` | Google AI Studio API key |
| `CLIENT_URL` | Frontend origin for CORS |

### Frontend
| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL |

---

## Forgot Password Flow

```
User enters email
      ↓
POST /forgot-password
      ↓
Redis: SET otp:<email> = <5-digit-otp>  TTL: 300s
Redis: DEL otp_attempts:<email>
      ↓
Nodemailer sends OTP email
      ↓
User enters OTP
      ↓
POST /verify-otp
      ├── Wrong OTP → increment otp_attempts:<email>
      │   └── >= 3 attempts → DEL otp:<email>, force re-request
      └── Correct OTP → DEL otp:<email>, DEL otp_attempts:<email>
                       → Redis: SET reset:<email> = <resetToken>  TTL: 600s
                       → return { resetToken }
                             ↓
                       POST /reset-password (email + resetToken + newPassword)
                             ↓
                       bcrypt.hash(newPassword) → updatePassword
                       Redis: DEL reset:<email>
```

---

## AI Report Generation Flow

```
Client uploads PDF + jobDescription + selfDescription
      ↓
multer stores file in memory (buffer)
      ↓
pdf-parse extracts raw text from buffer
      ↓
reportGenerationPrompt() builds structured prompt
      ↓
GoogleGenAI.models.generateContent()
  model: gemini-2.5-flash
  responseMimeType: application/json
  responseJsonSchema: zodToJsonSchema(interviewReportAISchema)
      ↓
JSON.parse(response.text)
      ↓
InterviewReport.create({ ...reportData, user: req.user.id })
      ↓
Returns saved report with _id for frontend navigation
```

---

## Common Issues & Fixes

### `ECONNREFUSED 127.0.0.1:<port>` on Redis or SMTP
Environment variables are `undefined` at module load time. The fix is to ensure `src/config/env.js` is imported before any other module in `server.js`, and to create service clients inside functions rather than at module scope.

### Gemini returns `{}` empty response
The `responseJsonSchema` field expects a plain JSON Schema object. Passing a Zod instance directly causes a silent empty response. Use `zod-to-json-schema` with `{ $refStrategy: "none" }` to convert.

### `crypto.randomBytes is not a function`
ESM does not auto-provide Node built-ins as globals. Add `import crypto from 'crypto'` explicitly.

### `Cannot find module '...'` (no extension)
ESM requires explicit `.js` extensions in all import paths. CommonJS auto-resolution does not apply.

### Dashboard returns 500 with `"Failed to fetch report."`
Express matched `GET /:id` before `GET /dashboard`. Register the `/dashboard` static route before the `/:id` dynamic route.

---

## Scripts

### Backend
```bash
npm run dev       # nodemon with ESM support
npm start         # node src/server.js
```

### Frontend
```bash
npm run dev       # Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
```

---

## Author

**Amrik Bhadra**

[![GitHub](https://img.shields.io/badge/GitHub-Amrik--Bhadra-181717?style=flat-square&logo=github)](https://github.com/Amrik-Bhadra)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/amrik-bhadra)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-b8456e?style=flat-square)](https://amrikbhadra.dev)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
Built with ❤️ using React, Node.js, MongoDB, Redis, and Google Gemini
</div>