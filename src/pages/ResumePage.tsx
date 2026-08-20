import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import FadeIn from '../components/FadeIn'

const RESUME = {
  name: 'Adewale Samuel',
  nickname: 'Dewalesamue (Prime)',
  title: 'Frontend Engineer · Web Application Developer · Supabase Specialist',
  location: 'Akure, Ondo State, Nigeria — Available Worldwide',
  email: 'primesameade@gmail.com',
  phone: '+234 903 411 042',
  website: 'https://prime-office-smoky.vercel.app',
  github: 'https://github.com/Dewalesamue',
  linkedin: 'https://www.linkedin.com/in/adewale-samuel-b8915b395',
  summary:
    'Dynamic Information Technology student at FUTA and specialized Frontend Engineer with a proven track record in building scalable, high-performance Web Applications. Expert in the React ecosystem, Tailwind CSS, and Supabase, with a deep focus on integrating Generative AI to create intuitive, next-generation user experiences.',

  experience: [
    {
      role: 'Frontend Engineer (Contract)',
      company: 'Various Tech Solutions',
      location: 'Remote',
      period: '2023 – Present',
      points: [
        'Architected and deployed high-performance React web applications focused on seamless UX.',
        'Integrated AI APIs (Gemini, OpenAI) to build smart features — automated content generation and chat assistants.',
        'Leveraged Supabase for real-time data sync, secure authentication, and complex relational data management.',
        'Optimized frontend performance metrics achieving significantly faster load times and improved Lighthouse scores.',
      ],
    },
    {
      role: 'Web Application Developer',
      company: 'Freelance Portfolio Projects',
      location: 'Remote',
      period: '2022 – 2023',
      points: [
        'Developed custom web applications using the React/Tailwind ecosystem based on client requirements.',
        'Implemented robust state management and optimized data fetching for complex web apps.',
        'Focused on accessibility (A11y) and responsive design ensuring cross-device compatibility.',
        'Managed the full SDLC from initial concept to Vercel/Netlify deployment.',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Technology in Information Technology',
      institution: 'Federal University of Technology Akure (FUTA)',
      location: 'Akure, Ondo State, Nigeria',
      period: '2023 – Present',
      notes: ['Specializing in Web Technology & Frontend Systems', 'Active member of the FUTA Tech Community'],
    },
  ],

  certifications: [
    { name: 'Full Stack Web Development', issuer: 'FreeCodeCamp', year: '2023' },
    { name: 'AI Prompt Engineering Specialist', issuer: 'Emerging Tech Academy', year: '2024' },
  ],

  skills: {
    Frontend: ['React.js', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux / Context API', 'Framer Motion'],
    'Backend & BaaS': ['Supabase', 'PostgreSQL', 'Firebase', 'Node.js (Basics)', 'REST APIs'],
    'AI & Tools': ['Gemini & ChatGPT API', 'Prompt Engineering', 'Midjourney / DALL-E', 'Figma to Code', 'Git / GitHub', 'Vite', 'Vercel / Netlify'],
    'Soft Skills': ['Problem Solving', 'Agile Collaboration', 'Technical Communication', 'Product Design Thinking'],
  },

  languages: [
    { name: 'English', level: 'Native' },
    { name: 'Yoruba', level: 'Native' },
    { name: 'French', level: 'Intermediate' },
    { name: 'Spanish', level: 'Basic' },
  ],
}

// ── tiny helpers ──────────────────────────────────────────────────────────
const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <FadeIn y={24}>
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span
          className="text-[#D7E2EA] font-black uppercase tracking-tight leading-none opacity-20"
          style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)' }}
        >
          //
        </span>
        <h3
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 4rem)' }}
        >
          {title}
        </h3>
      </div>
      <div className="w-full h-px bg-[#D7E2EA]/10" />
      {children}
    </div>
  </FadeIn>
)

const ResumePage: React.FC = () => {
  return (
    <div className="bg-[#0C0C0C] min-h-screen pt-24 pb-24 px-5 sm:px-8 md:px-12">
      <SEO
        title="Resume — Adewale Samuel (Dewalesamue) | Frontend Engineer"
        description="Official resume of Adewale Samuel (Dewalesamue). Frontend Engineer with 2+ years experience in React, TypeScript, Tailwind CSS, and Supabase. B.Tech student at FUTA. Available for remote work."
        keywords="Adewale Samuel resume, Dewalesamue CV, frontend engineer resume Nigeria, React developer CV, FUTA student resume"
        url="https://dewalesamue.vercel.app/resume"
      />
      <div className="max-w-4xl mx-auto flex flex-col gap-20">

        {/* ── Header ── */}
        <FadeIn y={40}>
          <div className="flex flex-col gap-5 pt-4">
            <div>
              <h1
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 100px)' }}
              >
                {RESUME.name}
              </h1>
              <p
                className="text-[#D7E2EA] font-light opacity-50 mt-1"
                style={{ fontSize: 'clamp(0.75rem, 1.2vw, 1rem)' }}
              >
                {RESUME.nickname}
              </p>
            </div>

            <p
              className="text-[#D7E2EA] font-medium uppercase tracking-wider opacity-60"
              style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.95rem)' }}
            >
              {RESUME.title}
            </p>

            {/* Contact chips */}
            <div className="flex flex-wrap gap-3 mt-2">
              {[
                { label: RESUME.email, href: `mailto:${RESUME.email}` },
                { label: RESUME.phone, href: `tel:${RESUME.phone.replace(/\s/g, '')}` },
                { label: RESUME.location, href: null },
                { label: 'GitHub', href: RESUME.github },
                { label: 'LinkedIn', href: RESUME.linkedin },
              ].map((c) =>
                c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-[#D7E2EA] font-light border border-[#D7E2EA]/20 rounded-full
                               px-4 py-1.5 hover:border-[#D7E2EA]/60 transition-colors duration-200"
                    style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}
                  >
                    {c.label}
                  </a>
                ) : (
                  <span
                    key={c.label}
                    className="text-[#D7E2EA] font-light border border-[#D7E2EA]/10 rounded-full
                               px-4 py-1.5 opacity-40"
                    style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}
                  >
                    {c.label}
                  </span>
                )
              )}
            </div>

            {/* Print / Download button */}
            <motion.button
              onClick={() => window.print()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-2 w-fit rounded-full font-medium uppercase tracking-widest text-white
                         px-8 py-3 text-xs sm:text-sm transition-opacity hover:opacity-90 cursor-pointer print:hidden"
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1',
                outline: '2px solid white',
                outlineOffset: '-3px',
              }}
            >
              ↓ Download / Print Resume
            </motion.button>
          </div>
        </FadeIn>

        {/* ── Summary ── */}
        <Block title="Summary">
          <p
            className="text-[#D7E2EA] font-light leading-relaxed opacity-70 max-w-2xl"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)' }}
          >
            {RESUME.summary}
          </p>
        </Block>

        {/* ── Experience ── */}
        <Block title="Experience">
          <div className="flex flex-col gap-10">
            {RESUME.experience.map((exp) => (
              <div key={exp.role} className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <span
                    className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                  >
                    {exp.role}
                  </span>
                  <span
                    className="text-[#D7E2EA] font-light opacity-40 uppercase tracking-wider"
                    style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                  >
                    {exp.period}
                  </span>
                </div>
                <span
                  className="text-[#D7E2EA] font-light opacity-50"
                  style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}
                >
                  {exp.company} · {exp.location}
                </span>
                <ul className="flex flex-col gap-2 pl-4">
                  {exp.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-[#D7E2EA] font-light opacity-60 leading-relaxed relative
                                 before:absolute before:-left-4 before:content-['–'] before:opacity-30"
                      style={{ fontSize: 'clamp(0.8rem, 1.3vw, 1rem)' }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>

        {/* ── Education ── */}
        <Block title="Education">
          {RESUME.education.map((edu) => (
            <div key={edu.degree} className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                <span
                  className="text-[#D7E2EA] font-medium uppercase tracking-wide"
                  style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                >
                  {edu.degree}
                </span>
                <span
                  className="text-[#D7E2EA] font-light opacity-40 uppercase tracking-wider"
                  style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                >
                  {edu.period}
                </span>
              </div>
              <span
                className="text-[#D7E2EA] font-light opacity-50"
                style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.95rem)' }}
              >
                {edu.institution} · {edu.location}
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {edu.notes.map((n) => (
                  <span
                    key={n}
                    className="text-[#D7E2EA] border border-[#D7E2EA]/15 rounded-full px-3 py-1 font-light opacity-60"
                    style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)' }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Block>

        {/* ── Skills ── */}
        <Block title="Skills">
          <div className="flex flex-col gap-8">
            {Object.entries(RESUME.skills).map(([category, skills]) => (
              <div key={category} className="flex flex-col gap-3">
                <span
                  className="text-[#D7E2EA] font-medium uppercase tracking-wider opacity-50"
                  style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                >
                  {category}
                </span>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[#D7E2EA] border border-[#D7E2EA]/15 rounded-full px-4 py-1.5 font-light
                                 hover:border-[#D7E2EA]/40 transition-colors duration-200"
                      style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.9rem)' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>

        {/* ── Certifications ── */}
        <Block title="Certifications">
          <div className="flex flex-col gap-4">
            {RESUME.certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center justify-between gap-4 border border-[#D7E2EA]/10
                           rounded-2xl px-6 py-4 hover:border-[#D7E2EA]/30 transition-colors duration-200"
              >
                <div className="flex flex-col gap-0.5">
                  <span
                    className="text-[#D7E2EA] font-medium"
                    style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}
                  >
                    {cert.name}
                  </span>
                  <span
                    className="text-[#D7E2EA] font-light opacity-40"
                    style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
                  >
                    {cert.issuer}
                  </span>
                </div>
                <span
                  className="text-[#D7E2EA] font-light opacity-30 uppercase tracking-wider flex-shrink-0"
                  style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                >
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </Block>

        {/* ── Languages ── */}
        <Block title="Languages">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RESUME.languages.map((lang) => (
              <div
                key={lang.name}
                className="flex flex-col gap-1 border border-[#D7E2EA]/10 rounded-2xl p-5 text-center
                           hover:border-[#D7E2EA]/30 transition-colors duration-200"
              >
                <span
                  className="text-[#D7E2EA] font-medium"
                  style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)' }}
                >
                  {lang.name}
                </span>
                <span
                  className="text-[#D7E2EA] font-light opacity-40 uppercase tracking-wider"
                  style={{ fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)' }}
                >
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </Block>

      </div>
    </div>
  )
}

export default ResumePage
