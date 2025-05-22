import {Header} from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider'; 
import { WorkProcess } from '@/components/WorkProcess';
import AboutUs from '@/components/AboutUs';
import { Testimonials } from '@/components/Testimonials';
import { OurServices } from '@/components/OurServices';
import { OurProjects } from '@/components/OurProjects';
import { OurSkills } from '@/components/OurSkills';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FaqSection } from '@/components/FaqSection';
import { ScrollingTicker } from '@/components/ScrollingTicker';
import { OurTeam } from '@/components/OurTeam';
import { OurBlog } from '@/components/OurBlog';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSlider/>
      <AboutUs/>
      <OurServices/>
      <OurProjects/>
      <WorkProcess/>
      <OurSkills/>
      <WhyChooseUs />
      <Testimonials/>
      <FaqSection />
      <ScrollingTicker />
      <OurTeam />
      <OurBlog />
      <Footer />
    </main>
  );
}
