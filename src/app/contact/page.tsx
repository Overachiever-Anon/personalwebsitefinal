import { ContactForm } from '@/components/contact/ContactForm';
import { Bento, BentoCard } from '@/components/ui/bento';
import { Separator } from '@/components/ui/separator';
import { SOCIALS } from '@/lib/consts';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Get in Touch</h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl">
          Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you.
          Fill out the form below or reach out through one of my social channels.
        </p>
      </div>

      <Separator className="my-8 md:my-12" />

      <div className="max-w-6xl w-full mx-auto">
        <Bento>
          <BentoCard className="col-span-12 md:col-span-8 min-h-[300px]">
            <h2 className="text-2xl font-semibold mb-4">Send me a message</h2>
            <ContactForm />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-4 flex flex-col justify-center items-start">
            <h2 className="text-2xl font-semibold mb-4">Contact Details</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <a href="mailto:Ejames1998@icloud.com" className="text-lg hover:underline">
                Ejames1998@icloud.com
              </a>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <p className="text-lg">Munich, Germany</p>
            </div>
            <h3 className="text-xl font-semibold mb-3">Follow me</h3>
            <div className="flex space-x-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </BentoCard>
        </Bento>
      </div>
    </div>
  );
}
