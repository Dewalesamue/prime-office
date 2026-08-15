import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Skills', to: '/skills' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-between items-center
                   px-8 lg:px-12 pt-6 pb-4
                   bg-gradient-to-b from-[#0C0C0C]/90 to-transparent backdrop-blur-sm"
      >
        {/* Logo */}
        <Link
          to="/"
          className="hero-heading font-black uppercase leading-none"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.6rem)' }}
        >
          Dew.
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium uppercase tracking-wider text-sm lg:text-base
                          transition-opacity duration-200
                          ${pathname === link.to
                            ? 'text-[#D7E2EA] opacity-100'
                            : 'text-[#D7E2EA] opacity-50 hover:opacity-100'
                          }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.nav>

      {/* Mobile nav */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center
                   px-5 pt-5 pb-3
                   bg-gradient-to-b from-[#0C0C0C]/95 to-transparent"
      >
        <Link
          to="/"
          className="hero-heading font-black uppercase leading-none text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          Dew.
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[#D7E2EA] origin-center transition-all"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-[#D7E2EA]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-[#D7E2EA] origin-center transition-all"
          />
        </button>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-40 bg-[#0C0C0C] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`font-black uppercase tracking-wider text-4xl
                              transition-opacity duration-200
                              ${pathname === link.to
                                ? 'hero-heading'
                                : 'text-[#D7E2EA] opacity-50 hover:opacity-100'
                              }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
