import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import ResumePage from './pages/ResumePage'

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
)

const WHITE_PAGES = ['/services', '/skills', '/testimonials']

function App() {
  const location = useLocation()
  const isWhite = WHITE_PAGES.includes(location.pathname)

  return (
    <div
      className="font-kanit min-h-screen"
      style={{
        backgroundColor: isWhite ? '#ffffff' : '#0C0C0C',
        overflowX: 'clip',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/skills" element={<PageTransition><SkillsPage /></PageTransition>} />
          <Route path="/testimonials" element={<PageTransition><TestimonialsPage /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          <Route path="/resume" element={<PageTransition><ResumePage /></PageTransition>} />
          <Route path="*" element={<PageTransition><HomePage /></PageTransition>} />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default App
