
import { Hero, Features, CallToAction, Gallery, GymTiming, ServicesSection } from '../components'

const Home = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <ServicesSection />
      <Gallery />
      <GymTiming />
      <CallToAction />
    </div>
  )
}

export default Home