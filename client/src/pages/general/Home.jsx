import React from 'react'
import { Hero } from '../../components/homepage/Hero'
import { CategorySection } from '../../components/homepage/CategorySection'
import { Section3 } from '../../components/homepage/Section3'
import { Section4 } from '../../components/homepage/section4'
import { Footer } from '../../components/homepage/Footer'
import { Section2 } from '../../components/homepage/Section2'
import { Nav } from '../../components/utils/Nav'

export const Home = () => {
  return (
    <div className='font-poppins'>
    {/* <main className="container mx-auto px-4 py-8 md:py-16"> */}
    {/* <Nav /> */}
      <Hero />
      <div className='px-4 lg:px-10'>
      <Section2 />
      <CategorySection />
      <Section3 />
      </div>
      <Section4 />
      <Footer />
    {/* </main> */}
    </div>
  )
}
