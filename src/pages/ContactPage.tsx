import React from 'react'
import SEO from '../components/SEO'
import ContactSection from '../components/ContactSection'

const ContactPage: React.FC = () => (
  <div className="bg-[#0C0C0C] min-h-screen pt-20 md:pt-24">
    <SEO
      title="Contact Dewalesamue | Hire Frontend & Software Engineer"
      description="Contact Adewale Samuel (Dewalesamue) for freelance web development, React apps, Python projects, or Supabase integration. Email: primesameade@gmail.com | WhatsApp: +234 904 380 9970."
      keywords="contact Dewalesamue, hire Adewale Samuel, freelance React developer Nigeria, Python developer for hire, primesameade gmail, frontend engineer contact"
      url="https://dewalesamue.vercel.app/contact"
    />
    <ContactSection />
  </div>
)

export default ContactPage
