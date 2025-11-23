QA Checklist for BalPro Life (Frontend + Backend)
===============================================

Quick manual & automated checks to run after changes:

- Environment
  - Start backend: `cd server && npm run dev` (ensure server runs on configured port, default 4500)
  - Start frontend: `cd client && npm run dev`

- Smoke tests
  - Load homepage and verify hero, products, footer render.
  - Register a new user using a valid email (e.g., `test@example.com`).
  - Login with newly created user.
  - Add product to cart and open cart sidebar.
  - Place an order via checkout modal (if implemented).

- CORS / API
  - Verify no CORS errors in browser console when making API calls.
  - Confirm API base URL matches server port (client `src/utils/api.js`).

- Responsiveness
  - Test at mobile (375x812), tablet (768x1024), desktop (1366x768).
  - Ensure no content is hidden under the navbar on any viewport.
  - Verify large decorative elements are hidden on small screens.

- Linting / Static checks
  - From project root run: `cd client && npm run lint` to run ESLint for frontend.
  - Fix any high-priority lint errors.

- Visual / Functional
  - Verify hero video loads and autoplay/muted behavior works across browsers.
  - Check forms validate and show server-side validation messages when appropriate.

- Cleanup
  - Remove any temporary debug console.log statements after verification.
  - Run a final smoke test after removing logs.

Optional automation
- Add a CI workflow to run `cd client && npm run lint` on PRs and pushes.
- Consider integrating visual regression tests (Percy, Playwright snapshot) for critical pages.

Notes
- The project uses Tailwind utilities `section-below-navbar` and `content-container` for consistent layout behavior.
