import React, { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  url?: string
  type?: 'website' | 'profile'
  image?: string
}

export const BASE_URL = 'https://dewalesamue.vercel.app'
export const PHOTO_URL = `${BASE_URL}/images/dewalesamue.png`

const DEFAULT_KEYWORDS =
  'Dewalesamue, Adewale Samuel, Frontend Engineer, Software Engineer, Python Developer, ' +
  'React Developer, Web Developer Nigeria, Tailwind CSS, Supabase, FUTA, Akure, ' +
  'Remote Frontend Developer, JavaScript Developer, TypeScript Developer, Portfolio, ' +
  'Web Application Developer, Adewale Samuel FUTA, Dewalesamue Prime, prime developer Nigeria'

const SEO: React.FC<SEOProps> = ({
  title = 'Dewalesamue — Frontend & Software Engineer | Adewale Samuel',
  description =
    'Adewale Samuel (Dewalesamue) — Nigerian software engineer and product builder specializing in ' +
    'distributed systems, scalable applications, SaaS, and modern web technologies. ' +
    'Based in Akure, Nigeria. Available for remote work worldwide.',
  keywords = DEFAULT_KEYWORDS,
  url = BASE_URL,
  type = 'website',
  image = PHOTO_URL,
}) => {
  useEffect(() => {
    document.title = title

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', description)
    setMeta('keywords', keywords)
    setMeta('author', 'Adewale Samuel (Dewalesamue)')
    setMeta('robots', 'index, follow, max-image-preview:large')
    setMeta('language', 'English')

    setMeta('og:type', type, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:image', image, 'property')
    setMeta('og:image:alt', 'Adewale Samuel (Dewalesamue) — Frontend & Software Engineer', 'property')
    setMeta('og:image:width', '800', 'property')
    setMeta('og:image:height', '800', 'property')
    setMeta('og:image:type', 'image/png', 'property')
    setMeta('og:site_name', 'Dewalesamue Portfolio', 'property')
    setMeta('og:locale', 'en_US', 'property')
    if (type === 'profile') {
      setMeta('og:profile:first_name', 'Adewale', 'property')
      setMeta('og:profile:last_name', 'Samuel', 'property')
      setMeta('og:profile:username', 'Dewalesamue', 'property')
    }

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:site', '@Dewalesamue')
    setMeta('twitter:creator', '@Dewalesamue')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', image)
    setMeta('twitter:image:alt', 'Adewale Samuel (Dewalesamue) — Frontend & Software Engineer')

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, keywords, url, type, image])

  return null
}

export const PersonSchema: React.FC = () => {
  useEffect(() => {
    const id = 'person-schema'
    let script = document.getElementById(id) as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.id = id
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Adewale Samuel',
      alternateName: ['Dewalesamue', 'Dewalesamue Prime', 'Prime Samuel'],
      url: BASE_URL,
      image: {
        '@type': 'ImageObject',
        '@id': `${BASE_URL}/#photo`,
        url: PHOTO_URL,
        contentUrl: PHOTO_URL,
        caption: 'Adewale Samuel — Frontend & Software Engineer',
        description:
          'Profile photo of Adewale Samuel (Dewalesamue), Frontend and Software Engineer from Akure, Nigeria',
        representativeOfPage: true,
        width: 800,
        height: 800,
      },
      jobTitle: 'Frontend Engineer & Software Engineer',
      description:
        'Nigerian software engineer and product builder specializing in distributed systems, ' +
        'scalable applications, SaaS, and modern web technologies. ' +
        'Information Technology student at Federal University of Technology Akure (FUTA). ' +
        'Available for remote work worldwide.',
      email: 'primesameade@gmail.com',
      telephone: '+234-903-411-042',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Akure',
        addressRegion: 'Ondo State',
        addressCountry: 'NG',
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Federal University of Technology Akure (FUTA)',
        url: 'https://www.futa.edu.ng',
      },
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance / Remote',
      },
      knowsAbout: [
        'React.js', 'TypeScript', 'JavaScript', 'Python', 'Tailwind CSS',
        'Supabase', 'PostgreSQL', 'Web Development', 'Frontend Engineering',
        'Software Engineering', 'UI/UX Design', 'Framer Motion', 'Vite', 'Next.js',
        'AI Prompt Engineering', 'Supabase BaaS',
      ],
      sameAs: [
        'https://github.com/Dewalesamue',
        'https://www.linkedin.com/in/adewale-samuel-b8915b395',
        'https://x.com/Dewalesamue',
        'https://dewalesamue.vercel.app',
      ],
    })
  }, [])
  return null
}

export default SEO
