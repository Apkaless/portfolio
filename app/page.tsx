import { About } from "@/components/About";
import { AudioControl } from "@/components/AudioControl";
import { BattlefieldBackground } from "@/components/BattlefieldBackground";
import { ContactSection } from "@/components/ContactSection";
import { CyberAttackOverlay } from "@/components/CyberAttackOverlay";
import { FeaturedMissions } from "@/components/FeaturedMissions";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LaserSight } from "@/components/LaserSight";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Minimap } from "@/components/Minimap";
import { Navbar } from "@/components/Navbar";
import { RepoArchive } from "@/components/RepoArchive";
import { SkillsArsenal } from "@/components/SkillsArsenal";
import { SniperScope } from "@/components/SniperScope";
import { ThreatLevel } from "@/components/ThreatLevel";
import { fetchApkalessRepos, getFeaturedRepos } from "@/lib/github";

export default async function Home() {
  const { repos, error } = await fetchApkalessRepos();
  const featuredRepos = getFeaturedRepos(repos);

  return (
    <>
      <SniperScope />
      <CyberAttackOverlay />
      <LaserSight />
      <BattlefieldBackground />
      <ThreatLevel />
      <LoadingOverlay />
      <Navbar />
      <AudioControl />
      <Minimap />
      <main>
        <Hero />
        <About />
        <SkillsArsenal />
        <FeaturedMissions repos={featuredRepos} />
        <RepoArchive repos={repos} error={error} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
