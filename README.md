# AI/ML Engineer Portfolio

A modern, responsive portfolio website built with Next.js and TailwindCSS, featuring GSAP animations.

## Features

- Responsive design optimized for all devices
- Dark mode support with toggle
- GSAP animations for smooth scrolling effects and transitions
- Modular component architecture for easy maintenance
- Custom data file for easy content updates
- Interactive project showcase
- Timeline-based experience section
- Skill visualization
- Contact form
- Floating AI chatbot component (placeholder)

## Tech Stack

- Next.js 13.5.1
- TypeScript
- TailwindCSS
- GSAP for animations
- Framer Motion for page transitions
- React Typed for typing animation
- Shadcn UI components
- Radix UI for accessible components
- Date-fns for date manipulation

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Install dependencies
```
npm install
# or
yarn install
```

3. Run the development server
```
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app directory containing pages
- `/components` - React components
  - `/home` - Homepage section components
  - `/layout` - Layout components (Header, Footer)
  - `/shared` - Shared/reusable components
  - `/ui` - UI components from shadcn/ui
- `/data` - Data files for content
- `/lib` - Utility functions and helpers
- `/public` - Static assets

## Customization

### Updating Content

The portfolio content is primarily stored in the `data/resume.ts` file. You can update:

- Personal information
- Skills
- Projects
- Work experience
- Education
- Certifications
- Awards
- Publications

### Styling

The site uses TailwindCSS for styling. Main theme colors and design tokens are defined in:

- `app/globals.css` - CSS variables for colors, etc.
- `tailwind.config.ts` - Tailwind configuration

### Adding New Pages/Sections

1. Create a new file in the `/app` directory
2. Import necessary components
3. Create your component/page
4. Add a link in the Header component

## Deployment

The site is configured for static export. To build for production:

```
npm run build
# or
yarn build
```

The output will be in the `out` directory, which can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## License

This project is licensed under the MIT License - see the LICENSE file for details.