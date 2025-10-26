🎫 TicketingSystem – Multi-Framework Ticket App (Vue)

This repository contains the Vue 3 implementation of the TicketingSystem (Stage 2 Challenge).
It’s part of a multi-framework suite with React and Twig (PHP) versions, each delivering the same user experience.

🌐 Other Implementations

Vue (this repo)

React: github.com/lawrence1986/ReactProject

Twig (PHP): github.com/lawrence1986/TwigProject

🧩 Frameworks & Libraries (Vue Version)

Vue 3, TypeScript, and Vite

Pinia – State management + persistence

Vue Router – Protected routing

Tailwind CSS 4 via @tailwindcss/vite – Styling & responsive layout

Reka UI primitives + custom UI components (Button, Dialog, Select, etc.)

Lucide Icons and vue-sonner – Toast notifications

🚀 Quickstart (Vue)
# 1️⃣ Install dependencies
pnpm install

# 2️⃣ Start the dev server
pnpm dev

# 3️⃣ Build for production
pnpm build

# 4️⃣ Preview production build
pnpm preview


By default, the app runs on http://localhost:5173
.

🔁 Switching Between Frameworks

Clone each repository into sibling folders: Vue, React, Twig.

Stop any running dev server before switching.

Run for each framework:

Framework	Command	Notes
Vue	pnpm install && pnpm dev	Default port 5173
React	pnpm install && pnpm dev	See React README
Twig (PHP)	composer install then run dev server	See Twig README

Shared assets (hero wave SVGs, decorative circles) are duplicated per repo to ensure consistent visuals.

🧱 UI Layout Overview

Max-width: 1440px, centered layout

Landing Page:

Hero section with wavy SVG footer

Overlapping decorative circles (src/components/Circle.vue)

CTA buttons: “Login” & “Get Started”

Feature Highlights: Card-style boxes with soft shadows & rounded corners

Dashboard: Summarizes ticket counts with color-coded statuses

Ticket Management: Cards, modals, and alerts for CRUD flows

Footer: src/components/Footer.vue — persistent across routes

🔄 State & Data Flow

Authentication:

src/stores/auth.ts → Manages users & sessions

Uses Pinia + localStorage (ticketapp_session and ticketapp_users)

Tickets:

src/stores/tickets.ts → Handles create, update, and delete actions

Composables:

src/composables/useAuth.ts → Helper functions for authentication logic

🔐 Authentication Simulation

Validates email format, password length, and required fields

On success → session stored in localStorage (ticketapp_session)

Logout: Clears session and redirects to /

Protected Routes:

/dashboard and /dashboard/tickets require authentication

Unauthenticated users redirected to /auth/login?returnUrl=<path>

✅ Ticket Validation & Feedback

Required fields: title, status (open, in_progress, closed)

Optional field: description (must contain text if provided)

Validation: Inline error messages & modal-level checks

Toasts: Success/error notifications for auth & CRUD actions

⚙️ Error Handling

Descriptive messages for invalid credentials, duplicate accounts, or CRUD errors

Session expiry → route guards redirect to login

Local operations (no backend) → graceful fallback on missing data

♿ Accessibility & Responsiveness

Semantic HTML for nav, main, and footer

Visible focus states on all interactive elements

Mobile navigation toggle with proper aria attributes

Status color scheme:

🟢 open → Green

🟠 in_progress → Amber

⚪ closed → Gray

All colors are contrast-checked for accessibility

👤 Example Test Account

You can sign up directly or use this demo account:

Email: demo@ticketingsystem.app
Password: demo123


Account is stored locally via localStorage and can be reused until cleared.

⚠️ Known Issues & Notes

LocalStorage: Clearing browser data removes users & tickets

Framework Switching: Run only one dev server at a time to avoid port conflicts

📂 Project Structure Highlights
Path	Description
src/pages	Route-level pages (Landing, Auth, Dashboard, Tickets)
src/components	Reusable UI elements (Navbar, Footer, Ticket Cards, Modals)
src/stores	Pinia stores for auth and tickets
src/composables	Custom composables for store logic
public / src/assets	Hero SVGs and decorative shapes
🧭 Additional Notes

For deployment instructions and environment-specific guidance,
refer to the React and Twig companion repositories linked above.
