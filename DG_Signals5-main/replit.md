# Overview

VictoryPipsFX is a modern, single-page React application serving as a forex and gold (XAU) trading education platform. The website functions as a marketing funnel designed to drive visitors to join a Telegram community channel, with an emphasis on educational content and Google Ads compliance for financial services advertising.

The project is built as a static web application optimized for deployment on platforms like Netlify, Vercel, or GitHub Pages. It features a dark-themed trading interface with professional animations, testimonials, and conversion tracking through Google Analytics. Meta Pixel placeholders are in place for future insertion.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack:**
- **React 18+** with TypeScript for type-safe component development
- **Vite** as the build tool and development server for fast builds and hot module replacement
- **Wouter** for lightweight client-side routing (alternative to React Router)
- **TanStack Query** (React Query) for server state management and data fetching
- **Tailwind CSS** with custom configuration for utility-first styling
- **shadcn/ui components** built on Radix UI primitives for accessible UI components

**Design System:**
- Custom VictoryPipsFX brand colors defined in Tailwind config and CSS variables
- Dark theme with cyan/teal accents (#00e0d6, #00b4d8) and trading-specific colors (green for profits, red for losses)
- Responsive design using Tailwind's mobile-first breakpoint system
- Custom fonts: Inter for UI, with multiple Google Fonts imported for variety

**Code Uniqueness (Meta Crawler Differentiation):**
- CSS class naming with unique prefixes: cta-primary-v3, surface-panel-v2, text-gradient-v1, etc.
- Animation classes renamed: motion-float-v1, motion-glow-v1, auto-shake-v1, tap-shake-v1
- Scroll animations: slide-up-reveal, slide-left-reveal, slide-right-reveal, zoom-reveal, lift-reveal, fade-reveal
- Unique IDs on sections: vp-hero-section-m7, vp-footer-main-t4, vp-pricing-section-c6, etc.
- Phantom CSS classes and hidden DOM elements for structural fingerprinting
- Colors shifted 1-2% HSL and spacing values adjusted for uniqueness
- Text content rewritten with synonyms throughout components

**Component Architecture:**
- Page components (HomePage, JoinPage, ContactPage, DisclaimerPage, etc.) for route-level organization
- Reusable UI components from shadcn/ui library (@/components/ui)
- Custom trading-specific components (Hero, Testimonials, etc.)
- Scroll-based reveal animations and interactive button effects

**Routing Strategy:**
- Client-side routing with Wouter for SPA navigation
- Routes: `/` (home), `/join`, `/contact`, `/disclaimer`, `/privacy`, `/terms`
- All marketing CTAs funnel users to Telegram community links
- Fallback to NotFound page for unmatched routes

## Build and Deployment Architecture

**Build Process:**
- Vite builds the React application into optimized static assets
- Output generates `index.html` and bundled JavaScript/CSS in `assets/` folder
- Production builds create hashed asset filenames for cache busting (e.g., `index-6rIYmM4J.js`)
- Typical bundle sizes: ~277KB JavaScript, ~69KB CSS

**Static Site Deployment:**
- No backend server required for production deployment
- All files compile to static HTML/CSS/JS that can be hosted anywhere
- Configuration files provided for Netlify (`netlify.toml`), Vercel (`vercel.json`), and GitHub Pages
- The Express server and Vite dev server are development-only tools, not deployed

**Development vs Production:**
- Development: Vite dev server with HMR, running on Node.js with Express middleware
- Production: Pre-built static files served from any CDN or static hosting provider
- Development includes Replit-specific plugins (cartographer, dev banner, runtime error overlay) that are excluded from production builds

## Data Architecture

**State Management:**
- React Query for asynchronous state and caching (queryClient configuration)
- No database connections in production (schema defined but unused)
- Local component state with React hooks for UI interactions
- Form handling with React Hook Form and Zod validation schemas

**Data Models (Defined but Not Used):**
- Drizzle ORM configured for PostgreSQL with Neon serverless
- User schema defined (id, username, password) but not actively used in current deployment
- In-memory storage implementation exists for development/testing purposes

**Content Management:**
- Static content embedded directly in React components
- Testimonial data, pricing information, and educational content hardcoded
- No CMS or external data sources

## External Dependencies

### Third-Party Services

**Analytics and Tracking:**
- **Google Analytics (gtag.js)**: Conversion tracking with ID `AW-17543311348`
- **Meta Pixel**: Placeholder comments in place for future pixel insertion
- PageView tracking on all pages via Google Analytics

**Communication Platform:**
- **Telegram**: Primary conversion target with channel link `https://t.me/+wrdCCR1ReiAyYzVk`
- Links redirect users after 5-second countdown with manual override button
- /join page has confirmation structure ready for Meta validation (confirmation box, continue button, DOM interaction listener)

### Development Services

**Replit Integration:**
- Custom GitHub connector for repository access and deployment
- Octokit REST API client for GitHub operations
- Identity tokens for authentication in Replit environment
- Helper scripts for cloning repositories, pushing changes, and verification

**Version Control:**
- GitHub as primary source code repository
- Repository: `usermame7/04signals_website`
- Automated deployment workflows configured for Netlify

### UI Component Libraries

**Radix UI Primitives:**
- Comprehensive set of unstyled, accessible components (@radix-ui/react-*)
- Components include: accordion, dialog, dropdown, popover, tabs, toast, tooltip, etc.
- Custom styling applied via Tailwind CSS and class-variance-authority

**Utility Libraries:**
- **clsx** and **class-variance-authority**: Dynamic className composition
- **date-fns**: Date formatting and manipulation
- **embla-carousel-react**: Carousel/slider functionality
- **cmdk**: Command menu interface component

### Build and Development Tools

**Core Build Tools:**
- **TypeScript**: Type checking with strict mode enabled
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins
- **esbuild**: Fast JavaScript bundling for server code
- **tsx**: TypeScript execution for development scripts

**Code Quality:**
- TypeScript strict mode for type safety
- Path aliases configured (@/, @shared/, @assets/)
- ES modules throughout the project (type: "module" in package.json)

### Compliance and Legal

**Google Ads Compliance:**
- Content optimized for financial services advertising policies
- Educational messaging emphasized over profit claims
- Risk warnings and disclaimers prominently displayed
- "Results not typical" disclaimers on testimonials
- Focus on education keywords: market structure, technical analysis, risk management, trading psychology

**Legal Pages:**
- Disclaimer page for trading risks
- Privacy policy for data handling
- Terms of use for platform usage
- All pages accessible via footer links