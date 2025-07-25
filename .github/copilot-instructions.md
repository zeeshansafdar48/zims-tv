<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This project is a modern, maintainable Smart TV application using React, TypeScript, and Vite. It targets Tizen, WebOS, Vidaa OS, PlayStation, and Xbox platforms. Please prioritize modular, reusable components, robust spatial navigation, dynamic theming, platform-specific builds, and internationalization/localization support. Use Redux Toolkit for state management. Developer experience should include ESLint, Prettier, Husky, and Jest.

# GitHub Copilot Instructions

These guidelines help Copilot generate high-quality, maintainable code for **React.js**, **JavaScript**, and **Next.js** projects. Follow these best practices:

---

## ✅ General JavaScript Best Practices

- Use **ES6+ syntax** (arrow functions, `const`/`let`, template literals, destructuring).
- Prefer **immutability**: avoid mutating state or objects directly.
- Always handle **errors gracefully** (e.g., `try/catch` around async calls).
- Write **clean and readable code** with clear variable names.
- Avoid using **var**, prefer `const` and `let`.
- Follow **DRY (Don't Repeat Yourself)** and **KISS** principles.
- Prefer **map, filter, reduce** over manual loops when possible.
- Always use **strict equality (===)**.

---

## ✅ React.js Best Practices

- Use **functional components** with **Hooks** (avoid class components unless necessary).
- Prefer **React hooks** over HOCs where possible.
- Use **useState** and **useReducer** for state management.
- Use **useEffect** for side effects; always clean up subscriptions in return function.
- Write **controlled components** for forms.
- Always include **key props** when rendering lists.
- Avoid unnecessary re-renders:
  - Use `React.memo` for memoization.
  - Use **dependency arrays correctly** in hooks.
- Separate **logic from UI** (custom hooks for logic, components for rendering).
- Use **PropTypes** or **TypeScript** for type safety.
- Organize components in a **clear folder structure** (e.g., `/components`, `/hooks`, `/pages`).

- Use following best practices for React components Structure:
  - Third-party libraries and React/Next imports should be imported at the top then empty line.
  - Component imports should follow, grouped by type (e.g., shared components, specific components) then empty line.
  - Any helper functions or utilities should be imported next, followed by an empty line.
  - CSS Imports should be imported next, followed by an empty line.
  - Constants and configuration variables should be imported next, followed by an empty line.
  - Add interfaces or types for props after the imports.
  - In functional components, custom hooks should be on top
  - Followed by the component's **state** and **effects**.
  - Followed by the component's **functions**.
  - Finally, the **return statement** of the component.

---

## ✅ Code Style

- Use **Prettier** for consistent formatting.
- Use **ESLint** with recommended and Next.js rules.
- Write **JSDoc comments** for complex functions.
- Prefer **async/await** over `.then()` for promises.
- Ensure **accessibility (a11y)**: add alt text for images, proper ARIA attributes.

---

## ✅ Example Patterns Copilot Should Follow

- Fetching data in Next.js:
  ```javascript
  export async function getStaticProps() {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    return { props: { data } };
  }
  ```
