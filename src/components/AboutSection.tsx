import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'

const ABOUT_TEXT =
  "Adewale is a Nigerian software engineer and product builder specializing in distributed systems, " +
  "scalable applications, SaaS, and modern web technologies. With a focus on React, Python, TypeScript, " +
  "and Supabase, he builds high-performance products that solve real problems — from sleek web interfaces " +
  "to full-stack SaaS platforms. With 2+ years of experience and 15+ projects delivered for clients across " +
  "5+ countries, he brings both technical depth and product thinking to every build. " +
  "Explore his projects, engineering work, and technical writing."

const MOON_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png'
const BOTTOM_LEFT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png'
const LEGO_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png'
const BOTTOM_RIGHT_URL =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'

const STATS = [
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Projects Completed' },
  { value: '12+', label: 'Happy Clients' },
  { value: '5+', label: 'Countries Served' },
]

const ROLES = [
  'Frontend Engineer',
  'Software Engineer',
  'React Developer',
  'Python Developer',
  'Supabase Specialist',
  'UI/UX Designer',
]

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-5 sm:px-8 md:px-10 py-24 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Decorative images — hidden on mobile */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}
        className="absolute top-[3%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none hidden sm:block">
        <img src={MOON_URL} alt="" className="w-[100px] sm:w-[140px] md:w-[200px]" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}
        className="absolute bottom-[5%] left-[2%] sm:left-[5%] md:left-[10%] pointer-events-none hidden sm:block">
        <img src={BOTTOM_LEFT_URL} alt="" className="w-[80px] sm:w-[120px] md:w-[170px]" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9}
        className="absolute top-[3%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none hidden sm:block">
        <img src={LEGO_URL} alt="" className="w-[100px] sm:w-[140px] md:w-[200px]" draggable={false} />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9}
        className="absolute bottom-[5%] right-[2%] sm:right-[5%] md:right-[10%] pointer-events-none hidden sm:block">
        <img src={BOTTOM_RIGHT_URL} alt="" className="w-[100px] sm:w-[140px] md:w-[210px]" draggable={false} />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 w-full max-w-4xl">

        {/* Heading */}
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* ── Photo + bio — side by side on md+ ── */}
        <FadeIn delay={0.1} y={30} className="w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">

            {/* Photo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-[28px] sm:rounded-[36px]
                                bg-gradient-to-b from-[#D7E2EA]/20 to-[#D7E2EA]/5 blur-sm" />
                <img
                  src="/images/dewalesamue.png"
                  alt="Adewale Samuel — Dewalesamue"
                  className="relative w-[200px] sm:w-[240px] md:w-[260px]
                             rounded-[28px] sm:rounded-[36px] object-cover
                             border border-[#D7E2EA]/15"
                  style={{ aspectRatio: '3/4', objectPosition: 'top' }}
                />
                {/* Availability badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2
                                bg-[#0C0C0C] border border-[#D7E2EA]/20 rounded-full
                                px-4 py-1.5 flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[#D7E2EA] font-light text-[11px] uppercase tracking-widest">
                    Available for Work
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bio + roles */}
            <div className="flex flex-col gap-5 flex-1">
              {/* Role pills */}
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <span
                    key={role}
                    className="text-[#D7E2EA] border border-[#D7E2EA]/20 rounded-full
                               px-3 py-1 font-light text-[11px] sm:text-xs uppercase tracking-wider"
                  >
                    {role}
                  </span>
                ))}
              </div>

              {/* Animated bio */}
              <AnimatedText
                text={ABOUT_TEXT}
                className="text-[#D7E2EA] font-medium leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.1rem)' }}
              />

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {STATS.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span
                      className="hero-heading font-black leading-none"
                      style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[#D7E2EA] font-light uppercase tracking-wider
                                     opacity-50 text-[10px] sm:text-xs leading-tight">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* What I'm currently working with */}
        <FadeIn delay={0.2} y={20} className="w-full">
          <div className="border border-[#D7E2EA]/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7
                          flex flex-col gap-4">
            <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40 text-xs">
              Currently working with
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                'React.js', 'TypeScript', 'Python', 'Tailwind CSS',
                'Supabase', 'PostgreSQL', 'Framer Motion', 'Next.js',
                'Vite', 'Git / GitHub', 'Figma', 'Vercel',
              ].map((tech) => (
                <span
                  key={tech}
                  className="bg-[#D7E2EA]/5 border border-[#D7E2EA]/10 text-[#D7E2EA]
                             rounded-full px-3 py-1 font-light text-xs sm:text-sm
                             hover:bg-[#D7E2EA]/10 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <Link to="/contact">
          <ContactButton />
        </Link>
      </div>
    </section>
  )
}

export default AboutSection
