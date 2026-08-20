import React from 'react'
import SEO from '../components/SEO'
import TestimonialsSection from '../components/TestimonialsSection'

const TestimonialsPage: React.FC = () => (
  <div className="bg-white min-h-screen pt-20 md:pt-24">
    <SEO
      title="Client Testimonials — Dewalesamue | Adewale Samuel Reviews"
      description="5-star client reviews for Dewalesamue (Adewale Samuel). Trusted by TechCorp Solutions, FoodTech Inc, FUTA, and MedAssist. Frontend and Software Engineer for remote projects."
      keywords="Dewalesamue reviews, Adewale Samuel testimonials, frontend developer reviews Nigeria, software engineer reviews, client feedback"
      url="https://dewalesamue.vercel.app/testimonials"
    />
    <TestimonialsSection />
  </div>
)

export default TestimonialsPage
