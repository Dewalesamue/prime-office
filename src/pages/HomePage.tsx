import React from 'react'
import HeroSection from '../components/HeroSection'
import HomePreviewSections from '../components/HomePreviewSections'

const HomePage: React.FC = () => {
  return (
    <div style={{ overflowX: 'clip' }}>
      <HeroSection />
      <HomePreviewSections />
    </div>
  )
}

export default HomePage
