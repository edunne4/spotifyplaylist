# Project overview
Use this guide to build a webapp where users can give a text prompt and some fine tuning controls to generate a spotify playlist using an ai model hosted on Make.com

# Feature requirements
- We will use Next.js, Shadcn, and Clerk
- User can enter a text prompt and select some fine tuning controls
- User can click a generate button
- A spotify playlist is generated using the ai model and user is shown a link to the playlist in spotify
- previous playlists are shown in a list
- The ai model is hosted on Make.com, provide a fake url for now

# Relevant docs
- [Make.com](https://www.make.com/)
- [Spotify API](https://developer.spotify.com/documentation/web-api)

# Nice to have features
- User can add genres to the playlist and decide the percentage of each genre
- PLaylists are displayed with their name, description, and image that come from the backend

# Rules
- All new components should be added to the /components folder and be named with the following format: `[name]-component.tsx` unless otherwise specified.
- All new pages should be added to the /app folder

# Current file structure
SPOTIFYPLAYLIST [WSL: UBUNTU]
├── .next
├── app
│   ├── fonts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
├── lib
├── node_modules
├── requirements
│   ├── backend_instructions.md
│   └── frontend_instructions.md
├── .eslintrc.json
├── .gitignore
├── components.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

