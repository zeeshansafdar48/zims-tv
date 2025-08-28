# 🧠 React Vite App Boilerplate (TS + ShadCN + Redux + React Query)

A modern and scalable React application built with:

- ⚡ **Vite** for fast builds
- ✨ **TypeScript** for type safety
- 🧯 **React Router DOM** for routing
- 🧠 **Redux Toolkit** for state management
- 📂 **Redux Persist** for persistent auth/user state
- 🔐 **Axios** with interceptors for API calls
- 🌐 **React Query (TanStack)** for caching and server state
- 🧹 **ShadCN UI + Tailwind CSS** for beautiful, componentized UI
- 💥 **Error Boundaries** for graceful fallback rendering

---

## 📦 Tech Stack

| Feature        | Tool                                         |
| -------------- | -------------------------------------------- |
| Build Tool     | [Vite](https://vitejs.dev)                   |
| Type System    | [TypeScript](https://www.typescriptlang.org) |
| Routing        | `react-router-dom`                           |
| Global State   | `@reduxjs/toolkit`, `redux-persist`          |
| Server State   | `@tanstack/react-query`                      |
| API Layer      | `axios` with interceptors                    |
| Styling        | `tailwindcss`, `shadcn/ui`                   |
| Error Handling | Custom Error Boundary                        |

---

## 🧱 Project Structure

```
src/
│
├── api/                 # Axios instance + interceptors
├── components/          # Shared reusable components
├── hooks/               # Custom React Query or utility hooks
├── layouts/             # Page layout wrappers (e.g. DashboardLayout)
├── pages/               # Route views
├── routes/              # Route definitions with lazy loading
├── services/            # Data-fetching logic (axios + query-friendly)
├── store/               # Redux Toolkit slices + persisted store
├── types/               # Shared TypeScript types
├── utils/               # Utilities and helpers
├── App.tsx              # Main app entry
├── main.tsx             # Root rendering + providers
└── index.css            # Tailwind & global styles
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-name/your-project.git
cd your-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env` file:

```env
VITE_API_URL=https://api.example.com
```

### 4. Start the development server

```bash
npm run dev
```

---

## ✅ Features

### 🔐 Authentication (Token-based)

- Stored in Redux `auth` slice
- Persisted in `localStorage` via `redux-persist`
- Automatically attached to Axios headers

### ⚙️ Axios Interceptors

- Request: Adds auth token
- Response: Global error handling, 401 redirect

### 📂 Redux + Redux Persist

- Configure your slices in `store/slices/`
- Store created with persist reducer and middleware

### 🌐 React Query + Axios

- Central data-fetching with caching
- Create hooks in `hooks/useX.ts` using `useQuery`
- Mutations supported with `useMutation`

### ⚡ ShadCN UI + TailwindCSS

- Pre-configured with Tailwind 4.x
- All UI components use ShadCN’s best practices
- Use `className="..."` or `cn()` utility for merging styles

### 🧹 Error Boundaries

- Top-level boundary handles render errors gracefully
- Customize fallback UI in `components/ErrorBoundary.tsx`

---

## ➕ Adding a New Component

1. **Create your component:**

```bash
mkdir src/components/MyComponent
touch src/components/MyComponent/index.tsx
```

2. **Use Tailwind + ShadCN:**

```tsx
import { Button } from "@/components/ui/button";

const MyComponent = () => (
  <div className="p-4 border rounded-2xl shadow">
    <h2 className="text-xl font-semibold">Hello</h2>
    <Button variant="default">Click Me</Button>
  </div>
);
export default MyComponent;
```

3. **Follow naming conventions:**

- Component folders should be PascalCase
- Always export default
- Use TypeScript interfaces for props
- Keep UI dumb (logic in container or hook)

---

## ➕ Adding a New Page + Route

1. Create the page:

```tsx
// src/pages/About.tsx
const About = () => <div className="p-4">About Page</div>;
export default About;
```

2. Add route:

```tsx
// src/routes/AppRoutes.tsx
<Route path="/about" element={<About />} />
```

---

## 🧠 Redux Best Practices

- Keep logic inside slices (reducers, thunks)
- Use selectors for accessing state
- Avoid deep prop drilling
- Persist only what's necessary (e.g., avoid persisting large lists)

---

## 𞷼 Clean Code Practices

- ✅ Use `hooks/` for logic
- ✅ Use `services/` for API abstraction
- ✅ Keep `components/` dumb & reusable
- ✅ Separate layout wrappers in `layouts/`
- ✅ Type everything (`Props`, API, Redux)
- ✅ Use `className` over inline styles

---

## 🔧 Available Commands

```bash
npm run dev         # Start local dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 🛠 To-Do / Enhancements

- [ ] Add authentication guard with `PrivateRoute`
- [ ] Add loading & error UI states globally
- [ ] Integrate toast notifications
- [ ] Add ShadCN dark mode toggle
- [ ] Write unit tests with `Vitest` or `Jest`

---

## 🙌 Credits

- [Vite](https://vitejs.dev)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Query](https://tanstack.com/query)
- [ShadCN UI](https://ui.shadcn.dev)
- [Tailwind CSS](https://tailwindcss.com)
