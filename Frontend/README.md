# YNR Aquatics frontend

Responsive React and TypeScript frontend for YNR Aquatics.

## Run locally

```sh
cd Frontend
npm install
npm run dev
```

Run the production TypeScript check and build with `npm run build`, lint with
`npm run lint`, and run the registration tests with `npm test`.

The registration form posts `{ "username": "...", "password": "..." }` to
`<VITE_AUTH_API_BASE_URL>/auth/register`. Set `VITE_AUTH_API_BASE_URL` in a
local `.env` file to the user API base URL; it defaults to
`http://localhost:8081/users` for the local gateway.

The current user service does not implement `POST /auth/register`. Until that
endpoint exists, valid submissions will show an error and the UI will not claim
that an account was created. The registration endpoint must validate submitted
data on the server, use HTTPS in production, and return a successful HTTP
status only after account creation succeeds.

## Registration page files

- `src/pages/auth/LoginPage.tsx` — matching login form and existing
  authentication flow.
- `src/pages/auth/SignupPage.tsx` — form, validation state, and accessible
  submission feedback.
- `src/pages/auth/AuthPage.css` — shared responsive aquatic styling.
- `src/features/auth/registration.ts` — registration types and validation.
- `src/features/auth/registrationService.ts` — registration API request.
- `src/features/auth/registration.test.tsx` — validation, form, password toggle,
  and navigation tests.
