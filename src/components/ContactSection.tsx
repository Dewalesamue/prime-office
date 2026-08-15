import React, { useState } from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import ContactButton from './ContactButton'

const SOCIALS = [
  {
    name: 'GitHub',
    handle: '/Dewalesamue',
    url: 'https://github.com/Dewalesamue',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '/adewale-samuel',
    url: 'https://www.linkedin.com/in/adewale-samuel-b8915b395',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    handle: '@Dewalesamue',
    url: 'https://x.com/Dewalesamue',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    handle: '+234 904 380 9970',
    url: 'https://wa.me/2349043809970',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
]

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const subject = encodeURIComponent((data.get('subject') as string) || 'Project Inquiry')
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`
    )
    window.location.href = `mailto:primesameade@gmail.com?subject=${subject}&body=${body}`
    setStatus('sent')
    form.reset()
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section
      id="contact"
      className="bg-[#0C0C0C] px-4 sm:px-8 md:px-10 pt-16 sm:pt-24 md:pt-32 pb-20 sm:pb-32"
    >
      <FadeIn y={40} className="mb-12 sm:mb-20 md:mb-24">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 11vw, 160px)' }}
        >
          Contact
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-20">
        {/* ── Info ── */}
        <FadeIn delay={0.1} y={30}>
          <div className="flex flex-col gap-6 sm:gap-8">
            <p
              className="text-[#D7E2EA] font-light leading-relaxed opacity-70"
              style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.25rem)' }}
            >
              Ready to bring your vision to life? I'd love to collaborate — website, web app,
              or anything in between.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:primesameade@gmail.com"
                className="flex items-center gap-3 text-[#D7E2EA] hover:opacity-70
                           transition-opacity duration-200 min-h-[44px]"
              >
                <span className="text-base sm:text-lg flex-shrink-0">✉️</span>
                <span className="font-medium text-sm sm:text-base break-all">
                  primesameade@gmail.com
                </span>
              </a>
              <a
                href="tel:+2349034110942"
                className="flex items-center gap-3 text-[#D7E2EA] hover:opacity-70
                           transition-opacity duration-200 min-h-[44px]"
              >
                <span className="text-base sm:text-lg flex-shrink-0">📞</span>
                <span className="font-medium text-sm sm:text-base">+234 903 411 0942</span>
              </a>
              <div className="flex items-center gap-3 text-[#D7E2EA] opacity-60">
                <span className="text-base sm:text-lg flex-shrink-0">🌍</span>
                <span className="font-light text-sm sm:text-base">
                  Available for Remote Work Worldwide
                </span>
              </div>
            </div>

            {/* Schedule call */}
            <a
              href="https://calendar.app.google/s8HyT2Z4k7gFbaFL8"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[#D7E2EA] font-medium uppercase
                         tracking-wider border-2 border-[#D7E2EA]/30 rounded-full
                         px-5 py-3 hover:bg-[#D7E2EA]/10 transition-colors duration-200
                         w-fit text-xs sm:text-sm min-h-[44px]"
            >
              📅 Schedule a Call
            </a>

            {/* Social links */}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#D7E2EA]/10">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[#D7E2EA] hover:opacity-70
                             transition-opacity duration-200 min-h-[44px]"
                >
                  <span className="opacity-60">{s.icon}</span>
                  <span className="font-medium text-sm sm:text-base">{s.name}</span>
                  <span className="opacity-40 font-light text-xs sm:text-sm ml-auto truncate max-w-[140px]">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Form ── */}
        <FadeIn delay={0.2} y={30}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              { id: 'subject', label: 'Subject', type: 'text', placeholder: 'Project inquiry…' },
            ].map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label
                  htmlFor={field.id}
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider opacity-60
                             text-[11px] sm:text-xs"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  className="bg-transparent border-b border-[#D7E2EA]/20 text-[#D7E2EA] font-light
                             pb-3 outline-none focus:border-[#D7E2EA]/60 transition-colors duration-200
                             placeholder:opacity-30 text-sm sm:text-base w-full"
                />
              </div>
            ))}

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-[#D7E2EA] font-medium uppercase tracking-wider opacity-60
                           text-[11px] sm:text-xs"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell me about your project, timeline, and budget…"
                className="bg-transparent border-b border-[#D7E2EA]/20 text-[#D7E2EA] font-light
                           pb-3 outline-none focus:border-[#D7E2EA]/60 transition-colors duration-200
                           placeholder:opacity-30 resize-none text-sm sm:text-base w-full"
              />
            </div>

            <div className="pt-2">
              {status === 'sent' ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[#D7E2EA] font-medium text-sm sm:text-base"
                >
                  ✅ Opening your email client…
                </motion.p>
              ) : (
                <ContactButton type="submit" />
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </section>
  )
}

export default ContactSection
