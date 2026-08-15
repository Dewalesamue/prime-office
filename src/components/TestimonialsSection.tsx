import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechCorp Solutions',
    avatar: 'SJ',
    text: "Adewale delivered an outstanding portfolio website that perfectly captured our brand identity. His attention to detail and technical expertise transformed our vision into reality. The project was completed ahead of schedule with outstanding quality.",
    rating: 5,
    project: 'Prime Office',
    date: 'January 2024',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Product Manager, FoodTech Inc',
    avatar: 'MC',
    text: "Working with Prime on Adefood was a game-changer. His expertise in React and modern frontend tooling helped us build a beautiful, fast food subscription platform. Highly professional and communicative throughout the entire process.",
    rating: 5,
    project: 'Adefood',
    date: 'March 2024',
  },
  {
    id: 3,
    name: 'Dr. Amaka Osei',
    role: 'Head of E-Learning, FUTA',
    avatar: 'AO',
    text: "The FUTA Campus LearnHub has transformed how our students access learning materials. Adewale's attention to UX and performance made the platform a joy to use. Student engagement has increased significantly since launch!",
    rating: 5,
    project: 'FUTA Campus LearnHub',
    date: 'April 2024',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Clinical Training Lead, MedAssist',
    avatar: 'JW',
    text: "The web platform Adewale built has been invaluable for our clinical training program. The interface is intuitive for medical professionals and the integration is seamless. Outstanding technical skills and great communication!",
    rating: 5,
    project: 'MedAssist AI',
    date: 'May 2024',
  },
]

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} className="text-yellow-400 text-sm">★</span>
    ))}
  </div>
)

const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[current]

  return (
    <section
      className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40} className="mb-16 sm:mb-20 md:mb-28">
        <h2
          className="text-[#0C0C0C] font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 140px)' }}
        >
          Testimonials
        </h2>
      </FadeIn>

      <div className="max-w-3xl mx-auto">
        {/* Testimonial card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col gap-6 text-center"
          >
            {/* Stars */}
            <div className="flex justify-center">
              <Stars count={t.rating} />
            </div>

            {/* Quote */}
            <p
              className="text-[#0C0C0C] font-light leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            >
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex flex-col items-center gap-2">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full bg-[#0C0C0C] text-white flex items-center justify-center
                           font-black text-sm"
              >
                {t.avatar}
              </div>
              <div>
                <p className="text-[#0C0C0C] font-medium" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}>
                  {t.name}
                </p>
                <p className="text-[#0C0C0C] font-light opacity-50" style={{ fontSize: 'clamp(0.75rem, 1.1vw, 0.9rem)' }}>
                  {t.role}
                </p>
                <p
                  className="text-[#0C0C0C] font-light opacity-40 mt-1 uppercase tracking-wider"
                  style={{ fontSize: 'clamp(0.65rem, 0.9vw, 0.8rem)' }}
                >
                  Project: {t.project} · {t.date}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-[#0C0C0C]/20 flex items-center justify-center
                       text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white transition-colors duration-200"
            aria-label="Previous"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 h-2 bg-[#0C0C0C]' : 'w-2 h-2 bg-[#0C0C0C]/20 hover:bg-[#0C0C0C]/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-[#0C0C0C]/20 flex items-center justify-center
                       text-[#0C0C0C] hover:bg-[#0C0C0C] hover:text-white transition-colors duration-200"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
