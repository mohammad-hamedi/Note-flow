# NoteFlow

A clean, keyboard-friendly workspace for notes, tags, and notebooks. Built with Next.js and designed for focused writing on desktop and mobile.

---

## Features

### Writing & organization

- **Rich text editor** — Bold, italic, underline, headings, bullet and numbered lists, blockquotes, and links
- **Notebooks** — Group notes by notebook; filter the sidebar and list by notebook
- **Tags** — Add tags to any note; click a tag in the list to search by it
- **Pin & star** — Pin important notes to the top; star favorites for quick access
- **Archive** — Move notes out of the main view without deleting them

### Find & manage

- **Search** — Search across titles, body text, tags, and notebook names
- **Filters** — Switch between All, Starred, and Archived views
- **Share** — Copy a note’s title and plain-text body to the clipboard
- **Auto-save** — Changes persist automatically to the browser with a saving/saved indicator

### Experience

- **Dark & light themes** — Toggle from the top bar; preference is remembered
- **English & Persian (فارسی)** — Full UI translation with RTL layout for Persian
- **Responsive layout** — Three-column desktop view; mobile list/editor flow with a slide-out navigation drawer
- **Accessibility** — Keyboard-navigable note list, ARIA labels, and `Escape` to close the mobile sidebar

### Authentication

Sign-in is required via [Clerk](https://clerk.com). The app gates access to signed-in users; note data is stored locally in the browser (see [Data storage](#data-storage)).

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/), [Tailwind CSS 3](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Auth | [Clerk](https://clerk.com/docs/quickstarts/nextjs) |
| Language | TypeScript |

---

## Getting started

### Prerequisites

- **Node.js** 20 or later
- A **Clerk** application with the Next.js integration enabled

### Installation

```bash
git clone <your-repo-url>
cd note-app
npm install
```

### Environment variables

Copy the example env file and add your Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com):

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk **publishable** key (safe for client-side use; never add the secret key here) |

In the Clerk Dashboard, configure:

- **Sign-in URL:** `/sign-in`
- **After sign-in redirect:** `/`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to `/sign-in` until you authenticate.

### Production build

```bash
npm run build
npm start
```

The project is configured with `output: "standalone"` for container-friendly deployments.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run Next.js ESLint |

---

## Project structure

```
note-app/
├── app/                    # Next.js App Router pages and global styles
│   ├── layout.tsx          # Root layout, fonts (Inter + Vazirmatn)
│   ├── page.tsx            # Main app (auth-gated)
│   ├── sign-in/            # Clerk sign-in page
│   └── providers.tsx       # Clerk + preferences providers
├── components/             # UI components
│   ├── app-shell.tsx       # Main layout orchestration
│   ├── sidebar.tsx         # Navigation drawer / sidebar
│   ├── topbar.tsx          # Search, theme, locale, auth
│   ├── notes-list.tsx      # Note list with filters and tags
│   ├── note-editor.tsx     # Note detail view
│   └── rich-text-editor.tsx
├── contexts/
│   └── app-preferences.tsx # Theme, locale, i18n
├── hooks/
│   ├── use-notes.ts        # Notes state, filtering, persistence
│   └── use-save-status.ts  # Saving / saved indicator
└── lib/
    ├── types.ts            # Note and filter types
    ├── storage.ts          # localStorage helpers
    ├── format.ts           # Sorting, truncation, colors
    └── i18n/               # English & Persian translations
```

---

## Data storage

Notes are persisted in the browser via `localStorage`:

| Key | Contents |
| --- | --- |
| `noteflow-notes` | All notes (JSON array) |
| `noteflow-active-id` | Currently selected note ID |
| `noteflow-locale` | UI language (`en` or `fa`) |
| `noteflow-theme` | Color theme (`light` or `dark`) |

Data is scoped to the browser and device. Clearing site data or using a different browser will not show the same notes. Cloud sync is not implemented yet.

Each note includes:

```ts
{
  id: string;
  title: string;
  content: string;      // HTML from the rich text editor
  tags: string[];
  notebook: string;
  createdAt: string;    // ISO 8601
  updatedAt: string;
  favorite?: boolean;
  pinned?: boolean;
  archived?: boolean;
}
```

Pinned notes sort to the top; remaining notes sort by most recently updated.

---

## Layout overview

**Desktop (lg and up)** — Sidebar, note list, and editor appear side by side.

**Mobile** — A single view at a time:

1. **List** — Browse and search notes
2. **Editor** — Read and edit the selected note (back arrow returns to the list)
3. **Sidebar** — Open from the menu button; close with the × button, backdrop tap, nav selection, or `Escape`

---

## Internationalization

NoteFlow ships with two locales:

- **English (`en`)** — LTR, Inter font
- **Persian (`fa`)** — RTL, Vazirmatn font

Switch language from the **FA / EN** button in the top bar. Strings live in `lib/i18n/index.ts`.

---

## License

Private project — all rights reserved unless otherwise specified.
