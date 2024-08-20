//Users/mohsinal/airesume-5/app/page.js

import { Suspense } from 'react'
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FeaturesGrid from "@/components/FeaturesGrid";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import TestimonialsLandingfolio from "@/components/TestimonialsLandingfolio";
import SolutionLandfolio from "@/components/SolutionLandfolio";
import LanguageToggle from "@/components/LanguageToggle";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      {/* <LanguageToggle /> */}
      <main>
        <Hero />
        <div id="testimonials">
          <TestimonialsLandingfolio />
        </div>
        <div id="solution">
          <SolutionLandfolio />
        </div>
        <Problem />
        {/* <FeaturesAccordion />
        <FeaturesGrid /> */}
        <div id="pricing">
          <Pricing />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        {/* <CTA /> */}
      </main>
      <Footer />
    </>
  );
}
