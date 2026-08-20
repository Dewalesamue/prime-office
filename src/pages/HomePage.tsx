import React from 'react'
import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import GitHubActivity from '../components/GitHubActivity'
import HomePreviewSections from '../components/HomePreviewSections'
import FadeIn from '../components/FadeIn'

const BASE = 'https://dewalesamue.vercel.app'

const HomePage: React.FC = () => (
  <div style={{ overflowX: 'clip' }}>
    <SEO
      title="Dewalesamue — Frontend & Software Engineer | Adewale Samuel"
      description="Adewale Samuel (Dewalesamue) — Frontend Engineer and Software Engineer building modern web applications with React, Python, Tailwind CSS, and Supabase. Available for remote work worldwide. Based in Akure, Nigeria."
      url={BASE}
    />

    {/* Hero */}
    <HeroSection />

    {/* GitHub Activity — right after hero, dark bg */}
    <section className="bg-[#0C0C0C] px-4 sm:px-8 md:px-12 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <FadeIn y={30}>
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40 text-xs">
                Open Source Activity
              </span>
              <h2
                className="hero-heading font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 5rem)' }}
              >
                GitHub
              </h2>
            </div>
            <a
              href="https://github.com/Dewalesamue"
              target="_blank"
              rel="noreferrer"
              className="text-[#D7E2EA] font-light uppercase tracking-widest opacity-40
                         hover:opacity-80 transition-opacity text-xs border-b border-[#D7E2EA]/20
                         hover:border-[#D7E2EA]/60 pb-0.5 min-h-[44px] flex items-center"
            >
              @Dewalesamue →
            </a>
          </div>
        </FadeIn>
        <FadeIn y={20} delay={0.1}>
          <GitHubActivity />
        </FadeIn>
      </div>
    </section>

    {/* All other preview sections */}
    <HomePreviewSections />
  </div>
)

export default HomePage
