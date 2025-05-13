import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google AI SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { query, context } = await req.json()

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set')
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })

    // Create the prompt
    const prompt = `Context: ${context}\n\nQuestion: ${query}\n\nPlease provide a helpful and accurate response based on the context provided. If the context doesn't contain enough information to answer the question, please say so.`

    // Generate content
    const result = await model.generateContent(prompt)
    const response = await result.response
    const reply = response.text() || "Sorry, I couldn't generate a response."

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Gemini chat error:', error)
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    )
  }
} 