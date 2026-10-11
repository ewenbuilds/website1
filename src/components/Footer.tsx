/**
 * @file src/components/Footer.tsx
 * Precision Engineering Footer for EWENBUILDS.xyz
 */

import React from 'react';
import { 
  ArrowUp, 
  Terminal, 
  ShieldCheck, 
  CloudUpload, 
  ExternalLink,
  Github,
  Heart
} from 'lucide-react';
import { analytics } from '../utils/analytics';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenDeployGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analytics.logEvent('nav_click', 'Footer Scroll To Top');
  };

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 py-12 font-mono text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base font-sans tracking-tight">
                EWENBUILDS<span className="text-sky-400">.xyz</span>
              </span>
              <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                RELEASE v2.4
              </span>
            </div>

            <p className="text-neutral-400 font-sans text-xs max-w-md leading-relaxed">
              Open-source engineering repository and portfolio. Dedicated to transparent hardware designs, kinematic mechanisms, and reproducible experimental validation.
            </p>

            <div className="text-[11px] text-neutral-500 pt-1">
              DOMAIN: <code className="text-neutral-300">ewenbuilds.xyz</code> · HOSTING: CLOUDFLARE PAGES EDGE
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-2.5">
            <span className="text-white font-bold block uppercase tracking-wider text-[11px]">
              Directory Index
            </span>
            <ul className="space-y-1.5">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">01. Overview & Slideshow</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">02. Engineering Reports & .ZIPs</a>
              </li>
              <li>
                <a href="#build-guides" className="hover:text-white transition-colors">03. 3D CAD & Build Guides</a>
              </li>
              <li>
                <a href="#resume" className="hover:text-white transition-colors">04. Integrated Resume & PDF</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">05. Contact & Collaboration</a>
              </li>
            </ul>
          </div>

          {/* Utility Tools Col */}
          <div className="space-y-2.5">
            <span className="text-white font-bold block uppercase tracking-wider text-[11px]">
              System Administration
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Telemetry Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeployGuide}
                  className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <CloudUpload className="w-3.5 h-3.5" />
                  <span>Cloudflare & Domain Guide</span>
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/ewenbuilds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Mirror Repository</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} EWENBUILDS.xyz</span>
            <span>·</span>
            <span>LICENSED UNDER CERN OHL & MIT</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors flex items-center gap-1.5"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Back to top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
