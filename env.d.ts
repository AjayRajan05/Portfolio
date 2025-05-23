declare namespace NodeJS {
  interface ProcessEnv {
    // Site Configuration
    SITE_URL: string;
    NEXT_PUBLIC_ALLOWED_DOMAINS: string;
    NEXT_PUBLIC_GA_ID?: string;

    // Admin Authentication
    ADMIN_EMAIL: string;
    ADMIN_PASSWORD: string;

    // AI Integration
    GEMINI_API_KEY: string;

    // Email Service
    RESEND_API_KEY: string;
    TO_EMAIL: string;
  }
} 