import React from 'react'
import FadeIn from './FadeIn'

const SERVICES = [
  {
    number: '01',
    name: 'Web Development',
    description:
      'Professional websites that are modern, responsive, and aligned with business goals — from personal portfolios to full-scale e-commerce platforms. Fast, secure, and SEO optimized.',
    price: '$500 – $5,000',
    time: '2–8 weeks',
  },
  {
    number: '02',
    name: 'Web Application Development',
    description:
      'Advanced web applications featuring real-time data, complex state management, and seamless user experiences. Specializing in SaaS platforms, internal tools, and Supabase-powered systems.',
    price: '$1,000 – $8,000',
    time: '3–10 weeks',
  },
  {
    number: '03',
    name: 'BaaS Integration',
    description:
      'Seamless backend integration with Supabase for authentication, real-time databases, edge functions, and storage — turning your frontend into a full-stack product without a separate backend.',
    price: '$300 – $3,000',
    time: '1–4 weeks',
  },
  {
    number: '04',
    name: 'UI / UX Design',
    description:
      'Clean, modern, and conversion-focused interfaces built with attention to layout, typography, and user experience. Responsive design across all screen sizes using Tailwind CSS.',
    price: '$200 – $2,000',
    time: '1–3 weeks',
  },
  {
    number: '05',
    name: 'Consulting & Code Review',
    description:
      'Technical consulting for startups and teams — architecture decisions, code reviews, performance audits, and AI prompt engineering to get the most out of modern tooling.',
    price: '$50/hr',
    time: 'Flexible',
  },
]

const ServicesSection: React.FC = () => {
  const handleInquiry = (name: string) => {
    const subject = encodeURIComponent(`Inquiry about ${name}`)
    const body = encodeURIComponent(
      `Hi Adewale,\n\nI'm interested in your ${name} service. Could we discuss my project?\n\nBest regards,`
    )
    window.location.href = `mailto:primesameade@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="services" className="bg-white px-4 sm:px-8 md:px-10 py-16 sm:py-24 md:py-32">
      <FadeIn y={40}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-10 sm:mb-16 md:mb-24"
          style={{ fontSize: 'clamp(2.5rem, 11vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <ul className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.08} y={30}>
            <li
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 md:gap-10
                         py-7 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12,12,12,0.15)',
                ...(i === SERVICES.length - 1 ? { borderBottom: '1px solid rgba(12,12,12,0.15)' } : {}),
              }}
            >
              {/* Number — large on desktop, smaller pill on mobile */}
              <span
                className="font-black text-[#0C0C0C] leading-none flex-shrink-0
                           text-5xl sm:text-[clamp(3rem,10vw,140px)]
                           opacity-20 sm:opacity-100"
              >
                {service.number}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <span
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}
                >
                  {service.name}
                </span>
                <span
                  className="font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: 'clamp(0.82rem, 1.5vw, 1.2rem)' }}
                >
                  {service.description}
                </span>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 mt-2">
                  <span className="text-[#0C0C0C] font-medium opacity-50 text-sm">
                    💰 {service.price}
                  </span>
                  <span className="text-[#0C0C0C] font-medium opacity-50 text-sm">
                    ⏱ {service.time}
                  </span>
                  <button
                    onClick={() => handleInquiry(service.name)}
                    className="text-[#0C0C0C] font-medium uppercase tracking-wider underline
                               underline-offset-4 opacity-50 hover:opacity-100
                               transition-opacity duration-200 cursor-pointer text-sm
                               min-h-[44px] flex items-center"
                  >
                    Get Quote →
                  </button>
                </div>
              </div>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  )
}

export default ServicesSection
