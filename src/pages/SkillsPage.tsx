import React from 'react'
import SEO from '../components/SEO'
import SkillsSection from '../components/SkillsSection'

const SkillsPage: React.FC = () => (
  <div className="bg-white min-h-screen pt-20 md:pt-24">
    <SEO
      title="Skills — Dewalesamue | React, TypeScript, Python, Supabase"
      description="Dewalesamue's skills: React 95%, JavaScript 95%, Tailwind CSS 94%, Supabase 92%, Python. B.Tech Information Technology at FUTA. FreeCodeCamp certified. AI Prompt Engineering specialist."
      keywords="Dewalesamue skills, Adewale Samuel skills, React TypeScript Python developer, FUTA information technology, frontend skills Nigeria, software engineer skills Nigeria"
      url="https://dewalesamue.vercel.app/skills"
    />
    <SkillsSection />
  </div>
)

export default SkillsPage
