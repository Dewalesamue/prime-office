import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => (
  <footer className="bg-[#0C0C0C] border-t border-[#D7E2EA]/10 px-5 sm:px-8 md:px-10 py-10">
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-4">
      <Link
        to="/"
        className="hero-heading font-black uppercase text-2xl sm:text-3xl md:text-4xl"
      >
        Dewalesamue
      </Link>

      <p className="text-[#D7E2EA] font-light opacity-40 text-center text-xs sm:text-sm">
        © {new Date().getFullYear()} Adewale Samuel (Prime). All rights reserved.
      </p>

      <div className="flex gap-6 sm:gap-8">
        {[
          { label: 'GitHub', url: 'https://github.com/Dewalesamue' },
          { label: 'LinkedIn', url: 'https://www.linkedin.com/in/adewale-samuel-b8915b395' },
          { label: 'Twitter', url: 'https://x.com/Dewalesamue' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="text-[#D7E2EA] font-light opacity-40 hover:opacity-80 transition-opacity
                       uppercase tracking-widest text-xs sm:text-sm min-h-[44px] flex items-center"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
)

export default Footer
