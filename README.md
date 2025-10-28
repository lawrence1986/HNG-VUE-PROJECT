<h1 align="center">Project By: 👋,ɭaƜƦ៩♬c៩ Maduabuc♬ι </h1>

<p align="center">
  <!-- Typing SVG by Lawrence-Maduabuchi - https://github.com/Lawrence-Maduabuchi/readme-typing-svg -->
  <a href="https://github.com/Lawrence-Maduabuchi/readme-typing-svg">
    <img src="https://readme-typing-svg.demolab.com/?lines=Front-End%20web%20developer;Ticketing%20Sys%tem%;Scalable%2B%20%2System%20codec%20;Always%20learning%20new%20things&font=Fira%20Code&center=true&width=440&height=45&color=f75c7e&vCenter=true&pause=1000&size=22" /></a>
</p>
<h3 align="center"> TicketingSystem – Multi-Framework Ticket  💻 App (Vue), that harnesses the power of Vue.js  🏗🏛 TypeScript 🎙, and Vite!</h3>
<hr>



# TicketingSystem – Multi-Framework Ticket App (Vue)

This repository contains the Vue 3 implementation of the TicketingSystem Stage 2 challenge. Two additional framework builds live in companion repositories and ship the same user experience: a React SPA and a Twig (server-rendered) application.

## Implementations Overview

- Vue (this repo)
- React: [github.com/lawrence1986/ReactProject]

- Twig (PHP): [github.com/lawrence1986/TwigProject]

## Frameworks & Libraries (Vue Version)

- Vue 3, TypeScript, Vite
- Pinia for state management and persistence
- Vue Router for protected routing
- Tailwind CSS 4 via `@tailwindcss/vite` for styling and responsive layout
- Reka UI primitives plus custom UI components (`Button`, `Dialog`, `Select`, etc.)
- Lucide icons and `vue-sonner` for toast notifications

## Vue Quickstart

1. Install dependencies: `pnpm install`
2. Start the dev server: `pnpm dev`
3. Build for production: `pnpm build`
4. Preview the production build: `pnpm preview`

The app runs on http://localhost:5173 by default.


### Multi-Framework Implementations

| Framework      | Repository                                                         | Live URL                                                                                       |
| -------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **Vue.js**      | *This repository*                                                 |  [ticketingsystem-vue.netlify.app](https://ticketingsystem-vue.netlify.app/)              
| **React**     | [HNG-REACT-PROJECT](https://github.com/lawrence1986/HNG-REACT-PROJECT) | [ticketingsystem-react.netlify.app](https://ticketingsystem-react.netlify.app/)             |
| **Twig (PHP)** | [TwigProject](https://github.com/lawrence1986/TwigProject)         | [twigproject-production-e03.up.railway.app](https://twigproject-production-e03.up.railway.app) |

1. Clone each repository into sibling folders (Vue, React, Twig).
2. Stop any running dev server before switching frameworks.
3. Vue: `pnpm install` then `pnpm dev`.
4. React: `pnpm install` then `pnpm dev` (see the React repo README for environment specifics).
5. Twig: install PHP dependencies (`composer install`) and run the development server as described in the Twig README.
6. Shared assets (hero wave SVG, decorative circles) are stored alongside each repo to maintain visual parity.

## UI Layout Summary

- Max-width 1440px container centered on large screens with responsive stacks on mobile.
- Landing page hero includes a wavy SVG footer, overlapping decorative circles (`src/components/Cicle.vue`), and CTA buttons ("Login" and "Get Started").
- Feature highlights and statistics use card-style boxes with soft shadows and rounded corners.
- Dashboard summarises ticket counts with status-aware color coding.
- Ticket management view presents cards, modal dialogs, and confirmation alerts for CRUD flows.
- Shared footer (`src/components/Footer.vue`) persists across every route.

## State & Data Flow

- Authentication: `src/stores/auth.ts` tracks the active user and the directory of registered users via Pinia, persisting to `localStorage` using `ticketapp_session` (active session) and `ticketapp_users` (registered accounts).
- Tickets: `src/stores/tickets.ts` owns the ticket list, offering create, update, and delete actions.
- Composables (e.g., `src/composables/useAuth.ts`) expose store helpers to components and pages.

## Authentication Simulation

- Login and signup forms validate email format, password length, and required fields before hitting the store.
- Successful auth writes the session object to `localStorage` under the `ticketapp_session` key.
- Logout clears the session and navigates back to the landing page.
- Route guards protect `/dashboard` and `/dashboard/tickets`, redirecting unauthenticated visitors to `/auth/login` with a return URL query.

## Ticket Validation & Feedback

- Required fields: `title` and `status` (`open`, `in_progress`, `closed`).
- Description remains optional but must contain text when provided.
- Modal forms block submission until validation passes and display inline error messaging.
- Toast notifications communicate success or error states for authentication and ticket CRUD operations.

## Error Handling Conventions

- Invalid credentials, duplicate accounts, and CRUD failures produce descriptive inline errors or toast notifications.
- Route guard messaging guides users back to the login flow when sessions expire.
- Local-only operations fall back gracefully if attempting to mutate missing tickets.

## Accessibility & Responsiveness

- Semantic structure for navigation, main content, and footer sections.
- Visible focus states retained on all interactive elements.
- Mobile navigation collapses behind an accessible toggle with `aria` attributes.
- Status colors follow the spec: open → green, in_progress → amber, closed → gray, with contrast-checked palettes.

## Example Test Credentials

- Recommended: sign up with `demo@ticketflow.app` / `demo123` via the Signup form. The account is persisted locally, so you can reuse it for login tests.

## Known Issues & Notes

- LocalStorage persistence is browser-specific; clearing storage removes registered users and tickets.
- Run only one framework dev server at a time to avoid port conflicts when switching implementations.

## Project Structure Highlights

- `src/pages` – route-level views (Landing, Auth, Dashboard, Tickets).
- `src/components` – UI building blocks (Navbar, Footer, Ticket cards, dialogs, decorative circles).
- `src/stores` – Pinia stores for authentication and tickets.
- `public` / `src/assets` – shared branding elements for the wavy hero and decorative shapes.

## License
- This project was developed as part of the HNG Stage 2 task.
- No explicit license has been defined at this time.
