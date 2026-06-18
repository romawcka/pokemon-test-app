# PRD — Full-Stack Engineer Live AI Coding Assignment

Transcribed from `Stack Engineer - Home Assignment - V2.pdf` (Firefly). This
file is the source of truth for requirements — no need to re-open the PDF.

## Objective

Create a full-stack application using React for the frontend and Node.js
for the backend. The application fetches data from the PokéAPI
(www.pokeapi.co) and allows users to view and manage a list of Pokémon.
Favorites are managed and persisted through the Node.js backend.

## Requirements

### Main features — Frontend

- Fetch and display the first 150 Pokémon in a scrollable list.
- Clicking a Pokémon displays its:
  - Abilities
  - Types
  - Evolution options (if available)
- Add or remove a Pokémon from the favorites list through a backend request.
- Allow users to filter the list to show only their favorite Pokémon.

### Main features — Backend

- Use Node.js to route requests from the frontend to the PokéAPI.
- Implement a simple favorites management system:
  - Add a favorite: save a Pokémon to the user's favorites list.
  - Delete a favorite: remove a Pokémon from the user's favorites list.
  - List favorites: return the current list of favorite Pokémon.
- Persist favorite Pokémon (in-memory or simple file-based storage is acceptable).

### UI/UX

- Build a clean and intuitive interface.
- Highlight favorite Pokémon in the list (e.g. with a badge or icon).

### Data handling

- Use the Node.js backend as a proxy to fetch data from the PokéAPI — the
  frontend never calls PokéAPI directly.
- Handle API loading states and errors gracefully on the frontend.

### State management

- Manage state on the frontend using React (or a library like Redux, if preferred).

### Storage

- The backend persists favorite Pokémon in a DB of choosing.

## Technical guidelines

1. **Tech stack**: Frontend = React, Backend = Node.js. Any framework
   relevant to the task is acceptable.
2. **Frontend**: implement filtering and interaction with the backend for favorites.
3. **Backend**:
   - Proxy requests from the frontend to the PokéAPI.
   - Expose REST API endpoints for:
     - Fetching the first 150 Pokémon from the PokéAPI.
     - Adding a Pokémon to the favorites list.
     - Removing a Pokémon from the favorites list.
     - Getting the current list of favorite Pokémon.
4. **Styling**: any preferred approach (CSS modules, styled-components,
   plain CSS, Tailwind, etc.).
5. **Code quality**: clean, modular, testable, well-documented (production ready).

## Bonus points

1. **Frontend**:
   - Search feature to quickly find a Pokémon by name.
   - Animations or transitions for improved UX.
   - Lazy-loading or infinite scrolling for the Pokémon list.
2. **Deployment**:
   - Deploy the app (e.g. Vercel/Netlify for the frontend, Render for the backend).
   - Include the live link in the submission.

## Submission

- Submit the project as a GitHub repository.
- Include a `README.md` with:
  - A brief overview of the approach.
  - Instructions on how to run both the frontend and backend locally.
  - Any additional features or assumptions made.
