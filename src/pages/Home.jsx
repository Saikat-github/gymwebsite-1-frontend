
import { Hero, Features, CallToAction, Gallery, GymTiming, ServicesSection } from '../components'

const Home = () => {
  return (
    <div className="flex flex-col gap-y-12">
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