import React from 'react'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const FRONTEND = [
  { name: 'React.js', level: 95, desc: 'Advanced component development, hooks, context API' },
  { name: 'JavaScript', level: 95, desc: 'ES6+, async/await, DOM manipulation' },
  { name: 'HTML5 & CSS3', level: 98, desc: 'Semantic markup, flexbox, grid, animations' },
  { name: 'Tailwind CSS', level: 94, desc: 'Utility-first design and custom layouts' },
  { name: 'TypeScript', level: 85, desc: 'Typed React components, interfaces, generics' },
]

const BACKEND = [
  { name: 'Supabase', level: 92, desc: 'Auth, Real-time DB, Edge Functions, Storage' },
  { name: 'PostgreSQL', level: 88, desc: 'Relational database design and queries' },
  { name: 'REST APIs', level: 90, desc: 'Designing and consuming clean web APIs' },
]

const AI_TOOLS = [
  { name: 'AI Prompt Engineering', level: 95, tools: ['Gemini', 'ChatGPT', 'Claude', 'LangChain'] },
  { name: 'AI Image Generation', level: 90, tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'] },
  { name: 'AI Content Writing', level: 92, tools: ['ChatGPT', 'Gemini', 'Jasper', 'WriteSonic'] },
]

const EDUCATION = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Federal University of Technology Akure (FUTA)',
    year: '2023 – Present',
    tags: ['Software Development', 'Data Management', 'Information Systems'],
  },
  {
    degree: 'Full Stack Web Development Certification',
    institution: 'FreeCodeCamp',
    year: '2023',
    tags: ['React', 'Supabase', 'Tailwind CSS', 'API Integration'],
  },
]

const LANGUAGES = [
  { name: 'English', level: 'Native', flag: '🇺🇸' },
  { name: 'Yoruba', level: 'Native', flag: '🇳🇬' },
  { name: 'French', level: 'Intermediate', flag: '🇫🇷' },
  { name: 'Spanish', level: 'Basic', flag: '🇪🇸' },
]

interface SkillBarProps {
  name: string
  level: number
  desc?: string
  delay?: number
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, desc, delay = 0 }) => {
  return (
    <FadeIn delay={delay} y={20}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-baseline">
          <span
            className="text-[#0C0C0C] font-medium"
            style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
          >
            {name}
          </span>
          <span className="text-[#0C0C0C] font-light opacity-40 text-sm">{level}%</span>
        </div>
        {/* Bar */}
        <div className="h-1.5 bg-[#0C0C0C]/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#0C0C0C] rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: delay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </div>
        {desc && (
          <p
            className="text-[#0C0C0C] font-light opacity-50"
            style={{ fontSize: 'clamp(0.7rem, 1vw, 0.85rem)' }}
          >
            {desc}
          </p>
        )}
      </div>
    </FadeIn>
  )
}

const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40} className="mb-16 sm:mb-20 md:mb-28">
        <h2
          className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
        >
          Skills
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col gap-20">
        {/* Frontend */}
        <div>
          <FadeIn y={20}>
            <h3
              className="text-[#0C0C0C] font-black uppercase tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Frontend
            </h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {FRONTEND.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.07} />
            ))}
          </div>
        </div>

        {/* Backend */}
        <div>
          <FadeIn y={20}>
            <h3
              className="text-[#0C0C0C] font-black uppercase tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Backend & BaaS
            </h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {BACKEND.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.07} />
            ))}
          </div>
        </div>

        {/* AI Tools */}
        <div>
          <FadeIn y={20}>
            <h3
              className="text-[#0C0C0C] font-black uppercase tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              AI Capabilities
            </h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8">
            {AI_TOOLS.map((ai, i) => (
              <FadeIn key={ai.name} delay={i * 0.1} y={20}>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-[#0C0C0C] font-medium" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                      {ai.name}
                    </span>
                    <span className="text-[#0C0C0C] opacity-40 text-sm">{ai.level}%</span>
                  </div>
                  <div className="h-1.5 bg-[#0C0C0C]/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#0C0C0C] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${ai.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ai.tools.map((t) => (
                      <span
                        key={t}
                        className="text-[#0C0C0C] opacity-50 border border-[#0C0C0C]/20 rounded-full px-3 py-0.5 font-light"
                        style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)' }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <FadeIn y={20}>
            <h3
              className="text-[#0C0C0C] font-black uppercase tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Education
            </h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {EDUCATION.map((edu, i) => (
              <FadeIn key={edu.degree} delay={i * 0.1} y={20}>
                <div
                  className="border border-[#0C0C0C]/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-3
                             hover:border-[#0C0C0C]/30 transition-colors duration-200"
                >
                  <span
                    className="text-[#0C0C0C] font-medium"
                    style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
                  >
                    {edu.degree}
                  </span>
                  <span
                    className="text-[#0C0C0C] font-light opacity-60"
                    style={{ fontSize: 'clamp(0.8rem, 1.2vw, 1rem)' }}
                  >
                    {edu.institution}
                  </span>
                  <span
                    className="text-[#0C0C0C] font-light opacity-40 uppercase tracking-wider"
                    style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                  >
                    {edu.year}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {edu.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#0C0C0C]/5 text-[#0C0C0C] rounded-full px-3 py-1 font-light"
                        style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <FadeIn y={20}>
            <h3
              className="text-[#0C0C0C] font-black uppercase tracking-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
            >
              Languages
            </h3>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {LANGUAGES.map((lang, i) => (
              <FadeIn key={lang.name} delay={i * 0.08} y={20}>
                <div className="flex flex-col items-center gap-3 border border-[#0C0C0C]/10 rounded-3xl p-6 text-center">
                  <span className="text-4xl">{lang.flag}</span>
                  <span className="text-[#0C0C0C] font-medium" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                    {lang.name}
                  </span>
                  <span
                    className="text-[#0C0C0C] opacity-40 font-light uppercase tracking-wider"
                    style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)' }}
                  >
                    {lang.level}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
