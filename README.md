# Zentry - Gaming Landing Page

A modern, animated gaming landing page built with React, Vite, Tailwind CSS, and GSAP. Features smooth scroll-triggered animations, video backgrounds, and a responsive design.

## Live Demo

[View Live Site](https://your-vercel-url.vercel.app)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v4** - Styling
- **GSAP** - Animations (ScrollTrigger, tweens)
- **React Icons** - Icon library

## Features

- Smooth scroll-triggered animations with GSAP ScrollTrigger
- Video background hero section with dynamic loading states
- Animated title reveals on scroll
- Responsive navigation with hide/show on scroll
- Bento grid features section with tilt effects
- Audio toggle indicator
- Custom font faces (Zentry, General, Circular Web, Robert)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/gasp_first.git
cd gasp_first

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
gasp_first/
├── public/
│   ├── audio/          # Background music
│   ├── fonts/          # Custom font files
│   ├── img/            # Images and icons
│   └── videos/         # Hero and feature videos
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── AnimatedTitle.tsx
│   │   ├── Button.tsx
│   │   ├── Contact.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── Story.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vercel.json
├── vite.config.ts
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel auto-detects Vite - no configuration needed
4. Click Deploy

### Other Platforms

The project builds to a `dist/` directory. Deploy it to any static hosting service:

```bash
npm run build
# Upload the dist/ folder to your hosting provider
```

## License

MIT
