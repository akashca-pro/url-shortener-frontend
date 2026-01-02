# URL Shortener Frontend

A modern, responsive URL shortener dashboard built with React, Vite, Redux Toolkit, and TailwindCSS. Features a beautiful dark theme, form validation, and seamless integration with the backend API.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Routing](#routing)
- [Components](#components)
- [Scripts](#scripts)

## Features

- **Authentication** - Login and signup with comprehensive form validation
- **Dashboard** - View, create, copy, and delete shortened URLs
- **Analytics** - View click counts for each URL
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark Theme** - Sleek dark mode interface
- **Error Handling** - Custom error boundary with helpful recovery options
- **Persistent State** - Redux state persisted across page refreshes
- **Logout Confirmation** - Modal confirmation before logout

## Tech Stack

| Category         | Technology                    |
| ---------------- | ----------------------------- |
| Framework        | React 18                      |
| Build Tool       | Vite                          |
| Language         | TypeScript                    |
| State Management | Redux Toolkit + Redux Persist |
| Routing          | React Router DOM v6           |
| Styling          | TailwindCSS                   |
| Forms            | React Hook Form + Zod         |
| Animations       | Framer Motion                 |
| Icons            | Lucide React                  |
| Notifications    | Sonner                        |

## Getting Started

### Prerequisites

- Node.js v18 or higher

### Installation

```bash
# Navigate to frontend directory
cd url-shortener/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:5173`

> **Note**: Ensure the backend is running at `http://localhost:9000` for API requests.

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE_URL=http://localhost:9000/api/v1
```

| Variable            | Description          | Default                        |
| ------------------- | -------------------- | ------------------------------ |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:9000/api/v1` |

## Project Structure

```
src/
├── components/           # Shared UI components
│   ├── layout/          # Layout components (Header)
│   └── shared/          # Reusable components (Button, Input, Card, Modal)
├── features/            # Feature-based modules
│   ├── auth/            # Authentication (login, signup, API, guards)
│   ├── dashboard/       # Dashboard (pages, components, API)
│   └── layouts/         # Layout wrappers (Auth, Dashboard)
├── hooks/               # Custom React hooks
├── lib/                 # Utilities (http client, error handling)
├── store/               # Redux store configuration
│   └── slices/          # Redux slices
├── main.tsx             # Application entry point
├── router.tsx           # Route definitions
└── index.css            # Global styles and Tailwind config
```

## State Management

### Redux Store

The app uses Redux Toolkit with persistence:

```typescript
// Auth state shape
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
```

### Custom Hooks

- `useAppSelector` - Typed Redux selector hook
- `useAppDispatch` - Typed dispatch hook

### Persistence

Auth state is persisted to localStorage using `redux-persist`, ensuring users stay logged in across page refreshes.

## Routing

| Path         | Component                 | Auth Required |
| ------------ | ------------------------- | ------------- |
| `/`          | Redirects to `/dashboard` | -             |
| `/login`     | Login page                | Public only   |
| `/signup`    | Signup page               | Public only   |
| `/dashboard` | URL dashboard             | Yes           |
| `*`          | Error page                | -             |

### Route Guards

- **ProtectedRoute** - Redirects to login if not authenticated
- **PublicOnlyRoute** - Redirects to dashboard if already authenticated

## Components

### Shared Components

| Component       | Description                                    |
| --------------- | ---------------------------------------------- |
| `Button`        | Styled button with variants and loading state  |
| `Input`         | Form input with label and error state          |
| `Card`          | Container component with header/content/footer |
| `ConfirmModal`  | Confirmation dialog with keyboard support      |
| `ErrorBoundary` | Error page with recovery options               |

### Layout Components

| Component         | Description                        |
| ----------------- | ---------------------------------- |
| `Header`          | App header with logo and user menu |
| `AuthLayout`      | Centered layout for auth pages     |
| `DashboardLayout` | Layout with header for dashboard   |

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |
| `npm run lint`    | Run ESLint               |

## Design System

The app uses a custom design system built on TailwindCSS with CSS variables for theming:

```css
/* Color tokens (dark theme) */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 217.2 91.2% 59.8%;
--destructive: 0 62.8% 30.6%;
--muted: 217.2 32.6% 17.5%;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
