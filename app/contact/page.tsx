import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - Ajay Rajan',
  description: 'Get in touch with me for collaborations, job opportunities, or just to say hello!',
}

export default function ContactPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground text-lg">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="space-y-2">
              <p className="font-medium">Email</p>
              <p className="text-muted-foreground">ajayrajan727@gmail.com</p>
            </div>
            <div className="space-y-2">
              <p className="font-medium">Location</p>
              <p className="text-muted-foreground">Kerala, India</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}