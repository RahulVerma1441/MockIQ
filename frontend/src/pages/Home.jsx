import React from "react";
import Header from "../components/common/Header";
import HeroSection from "../components/Layout/HeroSection";
import CurriculumOverview from "../components/Layout/CurriculumOverview";
import PopularExams from "../components/Layout/PopularExams";
import WhyLearnSection from "../components/Layout/WhyLearnSection";
import SkillBuildingSection from "../components/Layout/SkillBuildingSection";
import JoinCommunitySection from "../components/Layout/JoinCommunitySection";
import Footer from "../components/common/Footer";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#2B0500] px-6 py-10 font-sans">
      <Header />
      <HeroSection />
      <CurriculumOverview />
      <PopularExams />
      <WhyLearnSection />
      <SkillBuildingSection />
      <JoinCommunitySection />
      <Footer />
    </div>
  );
}