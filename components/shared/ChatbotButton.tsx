"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send, Bot } from "lucide-react"
import { searchResumeChunks } from "@/lib/resume-search"

// Section: Type Definitions
// Purpose: Define message structure for chat interface
type Message = {
  text: string
  sender: "user" | "bot"
}

// Section: Component Definition
// Purpose: Provide an interactive chatbot interface for portfolio visitors
export function ChatbotButton() {
  // Section: State Management
  // Purpose: Track chat state, messages, and UI elements
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hi! I'm Ajay's AI assistant. I can answer questions about his experience, skills, and projects. How can I help you?",
      sender: "bot"
    }
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Section: Message Handling
  // Purpose: Process user messages and generate AI responses
  const handleSendMessage = async () => {
    if (!message.trim()) return

    // Add user message
    setMessages(prev => [...prev, { text: message, sender: "user" }])
    setIsLoading(true)

    try {
      // Get relevant context from resume
      const context = searchResumeChunks(message)

      // Call Gemini API
      const res = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message, context })
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      const data = await res.json()
      
      // Add bot response
      setMessages(prev => [...prev, { text: data.reply, sender: "bot" }])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: "bot" 
      }])
    } finally {
      setIsLoading(false)
      setMessage("")
    }
  }

  // Section: Component UI
  // Purpose: Render chat interface with message history and input
  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Chat with Ajay's AI Assistant
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col h-[calc(100vh-8rem)]">
            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.2s" }}></div>
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Optional Email Collection */}
            <SheetFooter className="px-4 py-3 border-t flex flex-col sm:flex-row gap-3">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  placeholder="your.email@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Provide your email if you'd like Ajay to get back to you directly.
                </p>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}