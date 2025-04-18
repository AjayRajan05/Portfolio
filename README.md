# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🌙 Dark/Light mode support
- 📱 Fully responsive design
- 🚀 Fast page loads with Next.js
- 💅 Styled with Tailwind CSS
- 🔍 SEO optimized
- 💬 Interactive chat feature
- 📊 Project showcase
- 📝 Skills and achievements section

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AjayRajan05/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/config` - Configuration files including resume data
- `/public` - Static assets (images, fonts, etc.)
- `/styles` - Global styles and Tailwind CSS configuration

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

1. Update your personal information in `/config/resume.ts`
2. Replace profile image in `/public/images/profile.jpg`
3. Modify project images in `/public/images/projects/`
4. Update theme colors in `tailwind.config.js`

## License

MIT License - feel free to use this project for your own portfolio! 