import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const ReadMore: React.FC<{ to: string; label?: string; dark?: boolean }> = ({
  to,
  label = 'Read More',
  dark = false,
}) => (
  <Link
    to={to}
    className={`inline-flex items-center gap-2 font-medium uppercase tracking-widest
               border-b pb-0.5 transition-colors duration-200 text-xs sm:text-sm min-h-[44px]
               ${dark
                 ? 'text-[#0C0C0C] border-[#0C0C0C]/30 hover:border-[#0C0C0C]'
                 : 'text-[#D7E2EA] border-[#D7E2EA]/30 hover:border-[#D7E2EA]'
               }`}
  >
    {label}
    <motion.span whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
      →
    </motion.span>
  </Link>
)

const HomePreviewSections: React.FC = () => {
  return (
    <div className="bg-[#0C0C0C] flex flex-col overflow-x-hidden">

      {/* ══ 1. ABOUT ════════════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
              >
                About
              </h2>
              <span className="text-[#D7E2EA] opacity-40 font-light uppercase tracking-widest text-xs">
                Who I am
              </span>
            </div>
            <div className="w-full h-px bg-[#D7E2EA]/10" />
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {[
                  { value: '2+', label: 'Years Experience' },
                  { value: '15+', label: 'Projects Completed' },
                  { value: '12+', label: 'Happy Clients' },
                  { value: '5+', label: 'Countries Served' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span
                      className="hero-heading font-black leading-none"
                      style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}
                    >
                      {s.value}
                    </span>
                    <span className="text-[#D7E2EA] font-light uppercase tracking-wider opacity-50 text-[10px] sm:text-xs">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[#D7E2EA] font-light leading-relaxed opacity-70 text-sm sm:text-base">
                  Frontend Engineer and Information Technology student at FUTA, specializing in
                  React, Tailwind CSS, and Supabase. I build modern, high-performance web
                  applications for clients worldwide.
                </p>
                <ReadMore to="/about" label="Full Story" />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ══ 2. SERVICES ═════════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="bg-white rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px]
                            px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <h2
                className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
              >
                Services
              </h2>
              <span className="text-[#0C0C0C] opacity-40 font-light uppercase tracking-widest text-xs">
                What I do
              </span>
            </div>
            <div className="w-full h-px bg-[#0C0C0C]/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { num: '01', name: 'Web Development', desc: 'Modern, responsive websites — portfolios to e-commerce.' },
                { num: '02', name: 'Web App Development', desc: 'SaaS platforms, dashboards, real-time Supabase apps.' },
                { num: '03', name: 'BaaS Integration', desc: 'Auth, real-time data, storage — wired with Supabase.' },
                { num: '04', name: 'UI / UX Design', desc: 'Conversion-focused interfaces with Tailwind CSS.' },
                { num: '05', name: 'Consulting', desc: 'Architecture reviews, code audits, AI engineering.' },
              ].map((s) => (
                <div
                  key={s.num}
                  className="flex flex-col gap-2 p-4 sm:p-5 border border-[#0C0C0C]/10
                             rounded-2xl sm:rounded-3xl hover:border-[#0C0C0C]/30 transition-colors"
                >
                  <span className="text-[#0C0C0C] font-black leading-none opacity-20 text-3xl sm:text-4xl">
                    {s.num}
                  </span>
                  <span className="text-[#0C0C0C] font-medium uppercase tracking-wide text-sm sm:text-base">
                    {s.name}
                  </span>
                  <span className="text-[#0C0C0C] font-light opacity-50 leading-relaxed text-xs sm:text-sm">
                    {s.desc}
                  </span>
                </div>
              ))}
              <div className="flex flex-col gap-3 p-4 sm:p-5 border-2 border-[#0C0C0C] rounded-2xl sm:rounded-3xl
                               items-start justify-end min-h-[120px]">
                <span className="text-[#0C0C0C] font-black uppercase tracking-tight text-sm sm:text-base leading-tight">
                  See pricing &amp; details
                </span>
                <ReadMore to="/services" label="All Services" dark />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ══ 3. PROJECTS ═════════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="bg-[#0C0C0C] rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px]
                            -mt-8 sm:-mt-10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
              >
                Projects
              </h2>
              <span className="text-[#D7E2EA] opacity-40 font-light uppercase tracking-widest text-xs">
                Selected work
              </span>
            </div>
            <div className="w-full h-px bg-[#D7E2EA]/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
              {[
                { name: 'Prime Office', cat: 'Personal Branding', img: '/images/myportfolio.jpg', url: 'https://prime-office-smoky.vercel.app' },
                { name: 'Adefood', cat: 'Web Application', img: '/images/adefood.jpg', url: 'https://adefood.netlify.app' },
                { name: 'MedAssist AI', cat: 'AI Platform', img: '/images/medai.jpg', url: 'https://med-assis.netlify.app' },
              ].map((p) => (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl
                             border border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40 transition-colors block"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: 'clamp(140px, 18vw, 260px)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-60 text-[10px] block">
                      {p.cat}
                    </span>
                    <span className="text-[#D7E2EA] font-medium uppercase text-sm sm:text-base">
                      {p.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <ReadMore to="/projects" label="View All 6 Projects" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ══ 4. SKILLS ═══════════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="bg-white rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px]
                            -mt-8 sm:-mt-10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <h2
                className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
              >
                Skills
              </h2>
              <span className="text-[#0C0C0C] opacity-40 font-light uppercase tracking-widest text-xs">
                Tech stack
              </span>
            </div>
            <div className="w-full h-px bg-[#0C0C0C]/10" />
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {['React.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL',
                'JavaScript', 'HTML5 & CSS3', 'REST APIs', 'Vite', 'Framer Motion',
                'AI Prompt Engineering', 'Figma to Code', 'Git / GitHub'].map((skill) => (
                <span
                  key={skill}
                  className="text-[#0C0C0C] border border-[#0C0C0C]/15 rounded-full
                             px-3 sm:px-4 py-1.5 sm:py-2 font-light text-xs sm:text-sm
                             hover:border-[#0C0C0C]/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
            <ReadMore to="/skills" label="Skills & Education" dark />
          </div>
        </section>
      </FadeIn>

      {/* ══ 5. TESTIMONIALS ═════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="bg-[#0C0C0C] rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px]
                            -mt-8 sm:-mt-10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex items-end justify-between gap-3 flex-wrap">
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2rem, 7vw, 110px)' }}
              >
                Kind Words
              </h2>
              <span className="text-[#D7E2EA] opacity-40 font-light uppercase tracking-widest text-xs">
                Client reviews
              </span>
            </div>
            <div className="w-full h-px bg-[#D7E2EA]/10" />
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  name: 'Sarah Johnson', role: 'CEO, TechCorp Solutions',
                  text: '"Adewale delivered an outstanding portfolio website. Completed ahead of schedule with outstanding quality."',
                  project: 'Prime Office',
                },
                {
                  name: 'Michael Chen', role: 'Product Manager, FoodTech Inc',
                  text: '"Working with Prime on Adefood was a game-changer. Beautiful, fast platform built with real expertise."',
                  project: 'Adefood',
                },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex flex-col gap-3 border border-[#D7E2EA]/15 rounded-2xl sm:rounded-3xl
                             p-5 sm:p-7 hover:border-[#D7E2EA]/35 transition-colors"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-[#D7E2EA] font-light leading-relaxed opacity-70 italic text-sm sm:text-base">
                    {t.text}
                  </p>
                  <div className="mt-auto pt-3 border-t border-[#D7E2EA]/10">
                    <span className="text-[#D7E2EA] font-medium text-sm block">{t.name}</span>
                    <span className="text-[#D7E2EA] font-light opacity-40 text-xs">
                      {t.role} · {t.project}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <ReadMore to="/testimonials" label="Read All Reviews" />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ══ 6. CONTACT ══════════════════════════════════════════════════ */}
      <FadeIn y={40}>
        <section className="bg-white rounded-t-[32px] sm:rounded-t-[44px] md:rounded-t-[56px]
                            -mt-8 sm:-mt-10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 md:py-32">
          <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-[#0C0C0C] opacity-40 font-light uppercase tracking-widest text-xs">
                Let's work together
              </span>
              <h2
                className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
              >
                Get in Touch
              </h2>
            </div>
            <div className="w-full h-px bg-[#0C0C0C]/10" />
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-start">
              <p className="text-[#0C0C0C] font-light leading-relaxed opacity-60 text-sm sm:text-base md:text-lg">
                Available for freelance projects, collaborations, and full-time remote
                opportunities. Let's build something great together.
              </p>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:primesameade@gmail.com"
                  className="text-[#0C0C0C] font-medium hover:opacity-60 transition-opacity
                             text-sm sm:text-base min-h-[44px] flex items-center gap-2"
                >
                  ✉️ primesameade@gmail.com
                </a>
                <a
                  href="https://wa.me/2349043809970"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#0C0C0C] font-medium hover:opacity-60 transition-opacity
                             text-sm sm:text-base min-h-[44px] flex items-center gap-2"
                >
                  💬 WhatsApp Chat
                </a>
                <ReadMore to="/contact" label="Open Contact Form" dark />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

    </div>
  )
}

export default HomePreviewSections
