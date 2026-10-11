/**
 * @file src/App.tsx
 * ============================================================================
 * EWENBUILDS.xyz - HIGH-END ENGINEERING PORTFOLIO & OPEN-SOURCE ARCHIVE
 * ============================================================================
 * 
 * Master layout orchestrating:
 * 1. Fixed Navbar with smooth scroll links
 * 2. Hero Section with Project Photo Slideshow & calls-to-action
 * 3. Structured Projects & Technical Reports with .ZIP download
 * 4. Build Guides & 3D CAD Repository with Three.js CAD model viewer & dual download buttons
 * 5. Native Integrated Engineering Resume with PDF download
 * 6. Contact Form & Professional Networks
 * 7. Secure Private Admin & Analytics Portal (Default passcode: admin2026)
 * 8. Hosting & Domain Routing Guide (ewenbuilds.xyz)
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshow } from './components/HeroSlideshow';
import { ProjectsSection } from './components/ProjectsSection';
import { BuildGuidesSection } from './components/BuildGuidesSection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { ShieldCheck, CloudUpload } from 'lucide-react';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isDeployGuideOpen, setIsDeployGuideOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* 1. Fixed Header & Navigation */}
      <Navbar 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section with Slideshow */}
        <HeroSlideshow />

        {/* 3. Structured Engineering Projects & Reports (.ZIP Download) */}
        <ProjectsSection />

        {/* 4. Build Guides & 3D CAD Repository (Three.js Viewer & Dual Download Buttons) */}
        <BuildGuidesSection />

        {/* 5. Native Integrated Resume & PDF Download */}
        <ResumeSection />

        {/* 6. Contact Form & Professional Profiles */}
        <ContactSection />
      </main>

      {/* 7. Footer */}
      <Footer 
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenDeployGuide={() => setIsDeployGuideOpen(true)}
      />

      {/* Floating Quick Utility Dock (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2">
        <button
          onClick={() => setIsDeployGuideOpen(true)}
          className="px-3 py-2 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs rounded-lg border border-neutral-800 hover:border-neutral-700 shadow-xl backdrop-blur-md transition-all flex items-center gap-1.5 cursor-pointer"
          title="Cloudflare Pages instructions & custom domain setup"
        >
          <CloudUpload className="w-3.5 h-3.5 text-amber-400" />
          <span>Cloudflare Guide</span>
        </button>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="px-3 py-2 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white font-mono text-xs rounded-lg border border-neutral-800 hover:border-neutral-700 shadow-xl backdrop-blur-md transition-all flex items-center gap-1.5"
          title="Private Admin & Analytics Portal"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Admin</span>
        </button>
      </div>

      {/* 8. Admin Portal & User Telemetry Modal */}
      <AdminDashboardModal 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* 9. Deployment & Hosting Guide Modal */}
      <DeploymentGuideModal 
        isOpen={isDeployGuideOpen}
        onClose={() => setIsDeployGuideOpen(false)}
      />
    </div>
  );
}
