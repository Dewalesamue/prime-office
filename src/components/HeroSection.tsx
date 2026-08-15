import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Magnet from './Magnet'
import ContactButton from './ContactButton'

const fadeIn = (delay: number, y = 0) => ({
  initial: { opacity: 0, y },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  },
})

const PORTRAIT_URL = '/images/dewalesamue.png'

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative h-screen flex flex-col bg-[#0C0C0C] overflow-hidden"
    >
      {/* ── Hero heading ── */}
      <div className="overflow-hidden pt-20 md:pt-24 px-3 sm:px-4">
        <motion.h1
          className="hero-heading font-black uppercase tracking-tight leading-none
                     w-full text-center whitespace-nowrap
                     text-[8vw] sm:text-[8.5vw] md:text-[9vw] lg:text-[9.5vw]"
          {...fadeIn(0.15, 40)}
        >
          Dewalesamue
        </motion.h1>
      </div>

      {/* ── Portrait — centered ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div className="pointer-events-auto" {...fadeIn(0.6, 30)}>
          <Magnet
            padding={100}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <img
              src={PORTRAIT_URL}
              alt="Dewalesamue — Frontend Engineer"
              className="w-[200px] sm:w-[280px] md:w-[380px] lg:w-[460px] object-contain select-none"
              draggable={false}
            />
          </Magnet>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="mt-auto flex justify-between items-end
                      px-4 sm:px-6 md:px-10 pb-5 sm:pb-7 md:pb-10 relative z-20 gap-3">
        <motion.p
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug
                     max-w-[130px] sm:max-w-[200px] md:max-w-[260px]
                     text-[10px] sm:text-xs md:text-sm"
          {...fadeIn(0.35, 20)}
        >
          Frontend Engineer · React · Tailwind · Supabase · Remote
        </motion.p>

        <motion.div className="flex-shrink-0" {...fadeIn(0.5, 20)}>
          <Link to="/contact">
            <ContactButton />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
