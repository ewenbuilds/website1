/**
 * @file src/components/HeroSlideshow.tsx
 * ============================================================================
 * EWENBUILDS.xyz - HERO SECTION & PROJECT SHOWCASE SLIDESHOW
 * ============================================================================
 * 
 * Production filler material loaded for Cloudflare deployment.
 * Showcases completed projects with rich CAD blueprints, dynamic schematics,
 * and high-fidelity hardware specifications.
 */

import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Cpu, 
  FileText, 
  Play, 
  Pause, 
  ExternalLink, 
  Download, 
  Terminal, 
  Maximize2,
  Activity,
  Compass,
  CheckCircle2,
  Box
} from 'lucide-react';
import { analytics } from '../utils/analytics';

interface SlideItem {
  id: number;
  projectTitle: string;
  subsystemTag: string;
  specs: string;
  targetSection: string;
  blueprintType: 'actuator' | 'cycloid' | 'pcb' | 'kinematic';
  highlightMetric: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    projectTitle: 'QDD-100: Quasi-Direct Drive High-Torque Rotary Actuator',
    subsystemTag: 'MECHATRONICS & MOTOR DRIVE',
    specs: '14.8 Nm Peak Torque · 840g Dry Mass · 14-Bit AS5048A · 1.0 kHz CAN-FD',
    targetSection: '#build-guides',
    blueprintType: 'actuator',
    highlightMetric: '14.8 Nm/kg Torque Density'
  },
  {
    id: 2,
    projectTitle: 'Cycloid-X: Zero-Backlash 50:1 Compound Cycloidal Reducer',
    subsystemTag: 'CAD & NON-LINEAR CONTACT FEA',
    specs: '50:1 Reduction · < 0.8 Arc-Min Backlash · Hardened AISI O1 Tool Steel Discs',
    targetSection: '#projects',
    blueprintType: 'cycloid',
    highlightMetric: '< 0.8 Arc-Min Backlash'
  },
  {
    id: 3,
    projectTitle: 'AeroDAQ-H7: 64kSPS Deterministic Telemetry Platform',
    subsystemTag: 'EMBEDDED HARDWARE & FREERTOS',
    specs: 'STM32H753 Dual-Core · 4-Layer HDI PCB · 24-Bit ADS131M04 ADCs · SDIO DMA',
    targetSection: '#projects',
    blueprintType: 'pcb',
    highlightMetric: '64,000 Samples / Sec / Ch'
  },
  {
    id: 4,
    projectTitle: 'SubMicron-Kinematics: 3-Axis Kinematic Metrology Stage',
    subsystemTag: 'PRECISION METROLOGY & COUPLING',
    specs: '< 0.22 µm Thermal Drift over 48h · Invar-36 Base · 485 Hz Resonant Mode',
    targetSection: '#projects',
    blueprintType: 'kinematic',
    highlightMetric: '0.22 µm Thermal Stability'
  }
];

export const HeroSlideshow: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    analytics.logEvent('nav_click', 'Next Hero Slide');
  };

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    analytics.logEvent('nav_click', 'Previous Hero Slide');
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <section id="hero" className="relative pt-24 pb-16 md:pt-32 md:pb-24 border-b border-neutral-800 bg-neutral-950 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Branding Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          
          {/* Main Title & Engineering Bio */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Engineering Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-neutral-800 bg-neutral-900/80 font-mono text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>OPEN HARDWARE ARCHIVE</span>
              <span className="text-neutral-600">/</span>
              <span className="text-sky-400 font-semibold">CLOUDFLARE PRODUCTION BUILD</span>
            </div>

            {/* Prominent Website Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-sans">
                EWENBUILDS<span className="text-sky-400">.xyz</span>
              </h1>
              <p className="mt-2 font-mono text-sm sm:text-base text-neutral-300 tracking-wide font-medium">
                MECHANICAL DESIGN · DYNAMIC ROBOTICS · EMBEDDED REAL-TIME SYSTEMS
              </p>
            </div>

            {/* Introduction / Bio Paragraph */}
            <div className="p-5 rounded-xl border border-neutral-800/90 bg-neutral-900/40 backdrop-blur-sm space-y-3">
              <p className="text-neutral-200 text-sm sm:text-base leading-relaxed font-sans">
                Welcome to <strong className="text-white">EWENBUILDS.xyz</strong>. I engineer high-torque quasi-direct drive actuators, zero-backlash robotic transmissions, and deterministic embedded telemetry. Every project includes fully open CAD assemblies, verified Bill of Materials (BOM), firmware source code, and empirical dynamometer validation data.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 border-t border-neutral-800/60 font-mono text-xs text-neutral-400">
                <div>
                  <span className="text-neutral-500">LAB: </span>
                  <span className="text-neutral-300">Biomimetic Robotics & Autonomous Systems Lab</span>
                </div>
                <div>
                  <span className="text-neutral-500">LOCATION: </span>
                  <span className="text-neutral-300">San Francisco / Bay Area, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => analytics.logEvent('nav_click', 'Hero CTA: Explore Projects')}
                className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-mono text-xs font-bold rounded-lg transition-colors shadow-md flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-neutral-950" />
                <span>Explore Projects & Reports</span>
              </a>

              <a
                href="#build-guides"
                onClick={() => analytics.logEvent('nav_click', 'Hero CTA: 3D CAD & Build Guides')}
                className="px-5 py-2.5 bg-neutral-900 text-neutral-200 font-mono text-xs font-semibold rounded-lg border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>Inspect 3D CAD Models</span>
              </a>

              <a
                href="#resume"
                onClick={() => analytics.logEvent('nav_click', 'Hero CTA: Integrated Resume')}
                className="px-4 py-2.5 bg-transparent text-neutral-400 hover:text-white font-mono text-xs transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </a>
            </div>

          </div>

          {/* Quick Stats / Repository Index Card */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  Engineering Manifest
                </span>
                <span className="font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded font-semibold">
                  ACTIVE REPOSITORY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/70">
                  <span className="text-neutral-500 block text-[10px]">ENGINEERING REPORTS</span>
                  <span className="text-xl font-bold text-white">04 Complete</span>
                  <span className="text-sky-400 text-[10px] block mt-0.5">Abstract · BOM · FEA</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/70">
                  <span className="text-neutral-500 block text-[10px]">3D CAD INSPECTOR</span>
                  <span className="text-xl font-bold text-sky-400">WebGL Ready</span>
                  <span className="text-neutral-400 text-[10px] block mt-0.5">Three.js Orbit Engine</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/70">
                  <span className="text-neutral-500 block text-[10px]">TOTAL ARCHIVES</span>
                  <span className="text-xl font-bold text-emerald-400">100% Downloadable</span>
                  <span className="text-neutral-400 text-[10px] block mt-0.5">.ZIP, STEP, Gerber</span>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/70">
                  <span className="text-neutral-500 block text-[10px]">OPEN LICENSE</span>
                  <span className="text-base font-bold text-neutral-200">CERN OHL / MIT</span>
                  <span className="text-neutral-400 text-[10px] block mt-0.5">OSHWA Certified</span>
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-400 pt-1 flex items-center justify-between">
                <span>Repository Mirror:</span>
                <a 
                  href="https://github.com/ewenbuilds" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  github.com/ewenbuilds
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================= */}
        {/* HARDWARE PHOTO & CAD BLUEPRINT SLIDESHOW                          */}
        {/* ================================================================= */}
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl">
          
          {/* Top Slideshow Status Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Featured Hardware Showcase
              </span>
              <span className="text-neutral-700">|</span>
              <span className="font-mono text-xs text-neutral-300">
                System 0{currentSlideIndex + 1} of 0{slides.length}
              </span>
            </div>

            {/* Slideshow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
                title={isAutoPlaying ? "Pause slideshow" : "Resume auto-play"}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAutoPlaying ? 'Auto (6s)' : 'Paused'}</span>
              </button>

              <div className="h-4 w-px bg-neutral-800 mx-1" />

              <button
                onClick={goToPrevSlide}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={goToNextSlide}
                className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slideshow Display Canvas */}
          <div className="relative h-[360px] sm:h-[440px] lg:h-[480px] bg-neutral-950 flex flex-col justify-end p-6 sm:p-10 overflow-hidden">
            
            {/* Visual Engineering Grid & Blueprint SVG Background Effect */}
            <div className="absolute inset-0 bg-tech-dots opacity-30" />
            
            {/* Rich Engineering Blueprint Isometric Graphics Container */}
            <div className="absolute inset-x-4 top-6 bottom-28 rounded-xl border border-neutral-800 bg-neutral-900/30 overflow-hidden flex items-center justify-center">
              
              {/* Technical Radial Coordinates */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                <div className="w-[320px] h-[320px] rounded-full border border-sky-500/40 border-dashed" />
                <div className="w-[460px] h-[460px] rounded-full border border-sky-400/20" />
                <div className="w-[620px] h-[620px] rounded-full border border-neutral-700/40" />
                <div className="absolute w-full h-px bg-neutral-800" />
                <div className="absolute h-full w-px bg-neutral-800" />
              </div>

              {/* Dynamic Engineering CAD Blueprint Visualization */}
              <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                
                {/* Visual Icon Header with Precision CAD Framing */}
                <div className="w-20 h-20 rounded-2xl bg-neutral-900 border border-sky-500/50 flex items-center justify-center mb-4 text-sky-400 shadow-2xl relative">
                  <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-sky-400" />
                  <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-sky-400" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-sky-400" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-sky-400" />
                  
                  {currentSlide.blueprintType === 'actuator' && <Cpu className="w-10 h-10 text-sky-400" />}
                  {currentSlide.blueprintType === 'cycloid' && <Box className="w-10 h-10 text-amber-400" />}
                  {currentSlide.blueprintType === 'pcb' && <Activity className="w-10 h-10 text-emerald-400" />}
                  {currentSlide.blueprintType === 'kinematic' && <Compass className="w-10 h-10 text-purple-400" />}
                </div>

                {/* Subsystem & CAD Title */}
                <span className="font-mono text-xs uppercase tracking-widest text-sky-400 font-bold mb-1">
                  [CAD SPECIFICATION: {currentSlide.subsystemTag}]
                </span>
                <h4 className="font-sans text-xl sm:text-2xl font-bold text-white max-w-xl">
                  {currentSlide.projectTitle}
                </h4>
                
                {/* Metric pill */}
                <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/80 font-mono text-xs text-sky-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  <span>Empirical Benchmark: {currentSlide.highlightMetric}</span>
                </div>
              </div>

            </div>

            {/* Gradient Mask to ensure bottom text readability */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />

            {/* Active Slide Metadata Overlay */}
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-sky-400 font-bold">
                    {currentSlide.subsystemTag}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans">
                  {currentSlide.projectTitle}
                </h3>
                <p className="font-mono text-xs text-neutral-300">
                  {currentSlide.specs}
                </p>
              </div>

              <a
                href={currentSlide.targetSection}
                onClick={() => analytics.logEvent('nav_click', `Slideshow Jump: ${currentSlide.projectTitle}`)}
                className="self-start sm:self-end px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs rounded-lg border border-neutral-700 hover:border-sky-400 transition-all flex items-center gap-2 font-semibold shadow-md"
              >
                <span>Inspect Technical Documentation</span>
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              </a>
            </div>

          </div>

          {/* Bottom Progress Bar & Thumbnail Indicators */}
          <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    analytics.logEvent('nav_click', `Slide indicator jump: ${idx + 1}`);
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === currentSlideIndex 
                      ? 'w-8 bg-sky-400' 
                      : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="font-mono text-[11px] text-neutral-400">
              CAD ASSET DISPLAY ENGINE · HARDWARE v2.4
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
