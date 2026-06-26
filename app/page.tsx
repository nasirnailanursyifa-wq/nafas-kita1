import { HeroSection } from './components/home/HeroSection'
import { Statistics } from './components/home/Statistics'
import { Facts } from './components/home/Facts'

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <Statistics />
      <Facts />
    </div>
  )
}