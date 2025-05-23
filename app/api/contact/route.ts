import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { rateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

// Section: Configuration
// Purpose: Initialize email service and rate limiting parameters
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limit: 5 requests per hour per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Section: API Route Handler
// Purpose: Process contact form submissions and send emails
export async function POST(req: Request) {
  try {
    // Section: Rate Limiting
    // Purpose: Prevent abuse by limiting requests per IP
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    
    const rateLimitResult = await rateLimit(ip, RATE_LIMIT, RATE_LIMIT_WINDOW);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    // Section: Request Validation
    // Purpose: Ensure all required fields are present
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Section: Email Sending
    // Purpose: Send contact form submission via Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <contact@ajayrajan.dev>',
      to: process.env.TO_EMAIL || 'ajayrajan727@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Section: Success Response
    // Purpose: Return success status and email data
    return NextResponse.json({ success: true, data });
  } catch (error) {
    // Section: Error Handling
    // Purpose: Handle unexpected errors gracefully
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 