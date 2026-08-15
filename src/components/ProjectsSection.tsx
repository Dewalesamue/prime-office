import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import FadeIn from './FadeIn'
import LiveProjectButton from './LiveProjectButton'

export interface Project {
  number: string
  name: string
  category: string
  liveUrl: string
  githubUrl?: string
  col1img1: string
  col1img2: string
  col2img: string
  tags: string[]
  description: string
}

export const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'Prime Office',
    category: 'Personal Branding',
    liveUrl: 'https://prime-office-smoky.vercel.app',
    githubUrl: 'https://github.com/Dewalesamue/prime-office.git',
    col1img1: '/images/myportfolio.jpg',
    col1img2: '/images/dewalesamue.png',
    col2img: '/images/myportfolio.jpg',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    description: 'Personal portfolio and branding website with a modern, professional design.',
  },
  {
    number: '02',
    name: 'Adefood',
    category: 'Web Application',
    liveUrl: 'https://adefood.netlify.app',
    githubUrl: 'https://github.com/Dewalesamue/adefood.git',
    col1img1: '/images/adefood.jpg',
    col1img2: '/images/adefood.jpg',
    col2img: '/images/adefood.jpg',
    tags: ['React', 'Tailwind CSS', 'Food API'],
    description: '24/7 food subscription service — 5,000+ recipes, meal plans & video tutorials.',
  },
  {
    number: '03',
    name: 'MedAssist AI',
    category: 'AI Platform',
    liveUrl: 'https://med-assis.netlify.app',
    col1img1: '/images/medai.jpg',
    col1img2: '/images/medai.jpg',
    col2img: '/images/medai.jpg',
    tags: ['React', 'AI Integration', 'Tailwind CSS'],
    description: 'Clinical training simulator powered by AI for medical students and professionals.',
  },
  {
    number: '04',
    name: 'FUTA LearnHub',
    category: 'EdTech',
    liveUrl: 'https://futacampuslearnhub.netlify.app',
    col1img1: '/images/Futalearnhub.jpg',
    col1img2: '/images/Futamap.jpg',
    col2img: '/images/Futalearnhub.jpg',
    tags: ['React', 'Tailwind CSS', 'Education'],
    description: 'Online learning platform for FUTA students — materials, resources & tools.',
  },
  {
    number: '05',
    name: 'My Coffee',
    category: 'Web Development',
    liveUrl: 'https://my-cofe.netlify.app',
    col1img1: '/images/My coffe.jpg',
    col1img2: '/images/My coffe.jpg',
    col2img: '/images/My coffe.jpg',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    description: 'Premium coffee brand website with menu showcase and rich visual storytelling.',
  },
  {
    number: '06',
    name: 'FUTA Map',
    category: 'Web Application',
    liveUrl: 'https://futamap.netlify.app',
    col1img1: '/images/Futamap.jpg',
    col1img2: '/images/Futalearnhub.jpg',
    col2img: '/images/Futamap.jpg',
    tags: ['React', 'Leaflet / Maps', 'Tailwind CSS'],
    description: 'Interactive campus navigation map for FUTA students and visitors.',
  },
  {
    number: '07',
    name: '44StreetLuxe',
    category: 'Fashion & E-Commerce',
    liveUrl: 'https://44streetluxe.com',
    githubUrl: 'https://github.com/Dewalesamue/44streetluxe.git',
    col1img1: '/images/image.png',
    col1img2: '/images/image copy.png',
    col2img: '/images/image copy.png',
    tags: ['React', 'E-Commerce', 'Tailwind CSS'],
    description:
      '44th Street — clothing for a generation unafraid to stand out. Graffiti walls, neon lights, raw concrete textures — every piece transforms street energy into wearable art.',
  },
]

const TOTAL = PROJECTS.length

interface ProjectCardProps {
  project: Project
  index: number
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(innerRef, { once: true, margin: '0px' })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const scaleEnd = Math.max(0.85, 1 - (TOTAL - 1 - index) * 0.03)
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, scaleEnd])

  // On mobile use smaller parallax to avoid layout shifts
  const leftY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])

  // Cards stack tighter — smaller offset per card
  const stickyTop = 72 + index * 16

  return (
    <div
      ref={containerRef}
      // Last card needs extra height so it fully scrolls into view
      className={`${index === TOTAL - 1 ? 'h-[110vh]' : 'h-[70vh] sm:h-[80vh] md:h-[90vh]'}`}
    >
      <motion.div
        className="sticky w-full"
        style={{ top: stickyTop, scale, transformOrigin: 'top center', zIndex: index + 1 }}
      >
        <motion.div
          ref={innerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
          whileHover={{
            y: -4,
            boxShadow: '0 0 0 2px rgba(215,226,234,0.5), 0 20px 60px rgba(0,0,0,0.5)',
            transition: { duration: 0.25 },
          }}
          className="rounded-[24px] sm:rounded-[36px] md:rounded-[48px]
                     border-2 border-[#D7E2EA] bg-[#0C0C0C]
                     p-3 sm:p-5 md:p-8 cursor-pointer"
        >
          {/* ── Header ── */}
          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-3 sm:mb-5">
            {/* Number */}
            <span
              className="font-black text-[#D7E2EA] leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(2rem, 6vw, 100px)' }}
            >
              {project.number}
            </span>

            {/* Meta — fills remaining space */}
            <div className="flex flex-col flex-1 min-w-0 px-2 sm:px-3">
              <span
                className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-50 truncate"
                style={{ fontSize: 'clamp(0.55rem, 0.9vw, 0.85rem)' }}
              >
                {project.category}
              </span>
              <span
                className="text-[#D7E2EA] font-medium uppercase tracking-wide leading-tight"
                style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.7rem)' }}
              >
                {project.name}
              </span>
              <span
                className="text-[#D7E2EA] font-light opacity-40 mt-0.5 normal-case leading-snug
                           line-clamp-2"
                style={{ fontSize: 'clamp(0.6rem, 1vw, 0.9rem)' }}
              >
                {project.description}
              </span>
              {/* Tags — hide on very small, show from xs up */}
              <div className="hidden xs:flex flex-wrap gap-1.5 mt-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#D7E2EA]/20 text-[#D7E2EA] opacity-40
                               rounded-full px-2 py-0.5 font-light text-[10px] sm:text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons — stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-2 items-end sm:items-center flex-shrink-0">
              {project.githubUrl && (
                <button
                  onClick={() => window.open(project.githubUrl, '_blank')}
                  className="rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium
                             uppercase tracking-widest px-3 py-1.5 text-[10px] sm:text-xs
                             hover:bg-[#D7E2EA]/10 transition-colors min-h-[36px]"
                >
                  GitHub
                </button>
              )}
              <div
                onClick={() => window.open(project.liveUrl, '_blank')}
                className="scale-75 sm:scale-90 md:scale-100 origin-right"
              >
                <LiveProjectButton />
              </div>
            </div>
          </div>

          {/* ── Images ── */}
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            {/* Left col — 40% */}
            <motion.div
              className="flex flex-col gap-2 sm:gap-3"
              style={{ flex: '0 0 40%', y: leftY }}
            >
              <div className="overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[40px]">
                <img
                  src={project.col1img1}
                  alt={`${project.name} 1`}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ height: 'clamp(80px, 12vw, 200px)' }}
                />
              </div>
              <div className="overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[40px]">
                <img
                  src={project.col1img2}
                  alt={`${project.name} 2`}
                  loading="lazy"
                  className="w-full object-cover"
                  style={{ height: 'clamp(100px, 16vw, 280px)' }}
                />
              </div>
            </motion.div>

            {/* Right col — 60% */}
            <motion.div
              className="overflow-hidden rounded-[16px] sm:rounded-[28px] md:rounded-[40px]"
              style={{ flex: '1 1 60%', y: rightY }}
            >
              <img
                src={project.col2img}
                alt={`${project.name} 3`}
                loading="lazy"
                className="w-full h-full object-cover"
                style={{ minHeight: 'clamp(180px, 28vw, 500px)' }}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

const ProjectsSection: React.FC = () => {
  return (
    <section className="bg-[#0C0C0C] px-3 sm:px-5 md:px-10 pt-8 sm:pt-12 pb-16 sm:pb-20">
      <FadeIn y={40} className="mb-8 sm:mb-14 md:mb-20">
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 11vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
