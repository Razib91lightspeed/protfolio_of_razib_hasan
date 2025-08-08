import SectionHero from './(sections)/hero/SectionHero';
import SectionAbout from './(sections)/about/SectionAbout';
import SectionResume from './(sections)/resume/SectionResume';
import SectionProjects from './(sections)/projects/SectionProjects';
import SectionCertifications from './(sections)/certifications/SectionCertifications';
import SectionContact from './(sections)/contact/SectionContact';

export default function Page() {
  return (
    <main>
      <SectionHero />
      <SectionAbout />
      <SectionResume />     
      <SectionProjects />
      <SectionCertifications />
      <SectionContact />
    </main>
  );
}
