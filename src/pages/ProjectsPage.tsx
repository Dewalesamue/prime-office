import React from 'react'
import SEO from '../components/SEO'
import ProjectsSection from '../components/ProjectsSection'

const ProjectsPage: React.FC = () => (
  <div className="bg-[#0C0C0C] min-h-screen pt-20 md:pt-24">
    <SEO
      title="Projects — Dewalesamue | 7 Web Projects by Adewale Samuel"
      description="Explore Dewalesamue's portfolio of 7 web projects: Prime Office, Adefood, MedAssist AI, FUTA LearnHub, My Coffee, FUTA Map, and 44StreetLuxe fashion store."
      keywords="Dewalesamue projects, Adewale Samuel portfolio, Prime Office, Adefood, MedAssist AI, FUTA LearnHub, 44StreetLuxe, React projects Nigeria"
      url="https://dewalesamue.vercel.app/projects"
    />
    <ProjectsSection />
  </div>
)

export default ProjectsPage
