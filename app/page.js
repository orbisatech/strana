import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Events from '@/components/Events'
import Gallery from '@/components/Gallery'
import Location from '@/components/Location'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Events />
      <Gallery />
      <Location />
      <Newsletter />
      <Footer />
    </>
  )
}
