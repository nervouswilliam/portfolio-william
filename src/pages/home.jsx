import Section from "../components/Section";
import ExperienceTimeline from "../components/ExperienceTimeline";
import ProjectGrid from "../components/ProjectGrid";
import ContactRow from "../components/ContactRow";
import HeroSection from "../components/HeroSection";
import EducationSection from "../components/EducationSection";

export default function Home() {
  return (
    <>
      <Section id="Introduction" bgColor="#0a192f">
        <HeroSection/>
      </Section>

      <Section id="Experience">
        <ExperienceTimeline />
      </Section>

      <Section id="Projects">
        <ProjectGrid />
      </Section>

      <Section id="Education">
        <EducationSection/>
      </Section>

      <Section id="Contact" bgColor="#f5f5f5">
        <ContactRow />
      </Section>
    </>
  );
}
