import React from 'react'
import SEO from '../components/SEO'
import ServicesSection from '../components/ServicesSection'

const ServicesPage: React.FC = () => (
  <div className="bg-white min-h-screen pt-20 md:pt-24">
    <SEO
      title="Services — Dewalesamue | Web Dev, React Apps, Python, Supabase"
      description="Hire Dewalesamue (Adewale Samuel) for web development, React web apps, Python scripting, Supabase BaaS integration, UI/UX design, and technical consulting. Serving clients worldwide remotely."
      keywords="hire frontend developer Nigeria, hire software engineer Nigeria, React developer for hire, Python developer Nigeria, Supabase developer, Dewalesamue services"
      url="https://dewalesamue.vercel.app/services"
    />
    <ServicesSection />
  </div>
)

export default ServicesPage
