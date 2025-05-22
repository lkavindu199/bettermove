import { WorkProcess } from '@/components/WorkProcess';
import AboutUs from '@/components/AboutUs';
import { Testimonials } from '@/components/Testimonials';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { FaqSection } from '@/components/FaqSection';
import { OurTeam } from '@/components/OurTeam';

export default function HomePage() {
  return (
    <main>
      <AboutUs/>
      <WhyChooseUs />
      <WorkProcess/>
      <OurTeam />
      <Testimonials/>
      <FaqSection />
    </main>
  );
}
