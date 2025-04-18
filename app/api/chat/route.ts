import { NextResponse } from 'next/server';
import { linkedinSummary } from '@/config/linkedinData';
import { resumeData } from '@/config/resume';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const context = `
Resume:
${JSON.stringify(resumeData, null, 2)}

LinkedIn Profile Summary:
${linkedinSummary}
`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are a professional AI chatbot that answers queries about a portfolio using this context:\n${context}\n\nQuestion: ${message}`
            }
          ]
        }
      ]
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process your request' },
      { status: 500 }
    );
  }
} 