import React from 'react'
import { Link } from 'react-router-dom'
import FadeIn from './FadeIn'
import AnimatedText from './AnimatedText'
import ContactButton from './ContactButton'
import GitHubActivity from './GitHubActivity'

const ABOUT_TEXT =
  "I'm Dewalesamue (Prime), a Frontend Engineer and Information Technology student at FUTA. I specialize in building modern, high-performance web applications using React, Tailwind CSS, and Supabase. With 2+ years of experience and 15+ projects delivered, I enjoy working with clients worldwide to create fast, secure, and user-centered digital experiences. Let's build something great together."

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

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center
                 px-5 sm:px-8 md:px-10 py-24 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Decorative images — smaller on mobile, hidden on xs */}
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

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 w-full max-w-3xl">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 150px)' }}
          >
            About me
          </h2>
        </FadeIn>

        {/* Stats grid — 2 cols always on mobile, 4 on md+ */}
        <FadeIn delay={0.1} y={30} className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
                <span
                  className="hero-heading font-black leading-none"
                  style={{ fontSize: 'clamp(1.8rem, 6vw, 5rem)' }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-[#D7E2EA] font-light uppercase tracking-wider opacity-50 text-[11px] sm:text-xs"
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Bio text */}
        <AnimatedText
          text={ABOUT_TEXT}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed w-full"
          style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)' }}
        />

        {/* GitHub activity — live data, custom layout */}
        <FadeIn delay={0.2} y={20} className="w-full">
          <GitHubActivity />
        </FadeIn>

        <Link to="/contact">
          <ContactButton />
        </Link>
      </div>
    </section>
  )
}

export default AboutSection
