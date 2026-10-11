/**
 * @file src/components/Navbar.tsx
 * Fixed Header & Navigation Bar for EWENBUILDS.xyz
 */

import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Layers, 
  FileText, 
  Mail, 
  ShieldCheck, 
  CloudUpload,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { analytics } from '../utils/analytics';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenDeployGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenDeployGuide }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', icon: Terminal },
    { name: 'Projects', href: '#projects', icon: Layers },
    { name: 'Build Guides & 3D CAD', href: '#build-guides', icon: Cpu },
    { name: 'Resume', href: '#resume', icon: FileText },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const handleNavClick = (name: string, href: string) => {
    analytics.logEvent('nav_click', `Nav Jump: ${name}`, { target: href });
    setMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 shadow-lg' 
          : 'bg-neutral-950/40 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          onClick={() => handleNavClick('Brand', '#hero')}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700/80 flex items-center justify-center text-white group-hover:border-neutral-500 transition-colors">
            <span className="font-mono font-bold text-xs tracking-tighter text-sky-400">EB</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm tracking-tight text-white group-hover:text-sky-300 transition-colors">
              EWENBUILDS<span className="text-neutral-500 font-normal">.xyz</span>
            </span>
            <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              OPEN HARDWARE ARCHIVE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.name, link.href)}
                className="px-3.5 py-1.5 text-xs font-mono text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-md transition-all duration-150 flex items-center gap-1.5 border border-transparent hover:border-neutral-800"
              >
                <Icon className="w-3.5 h-3.5 text-neutral-400" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Hosting Guide Modal Trigger */}
          <button
            onClick={() => {
              analytics.logEvent('nav_click', 'Open Cloudflare Deployment Guide Modal');
              onOpenDeployGuide();
            }}
            className="px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-md transition-all flex items-center gap-1.5 cursor-pointer"
            title="Cloudflare Pages & Domain Setup Guide for ewenbuilds.xyz"
          >
            <CloudUpload className="w-3.5 h-3.5 text-amber-400" />
            <span>Cloudflare Guide</span>
          </button>

          {/* Admin Dashboard Lock Trigger */}
          <button
            onClick={() => {
              analytics.logEvent('nav_click', 'Open Admin Portal Prompt');
              onOpenAdmin();
            }}
            className="px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-md transition-all flex items-center gap-1.5"
            title="Private Analytics & Admin Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white rounded-md bg-neutral-900 border border-neutral-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.name, link.href)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm font-mono text-neutral-300 hover:text-white hover:bg-neutral-900 rounded-md"
              >
                <Icon className="w-4 h-4 text-neutral-400" />
                <span>{link.name}</span>
              </a>
            );
          })}

          <div className="pt-3 border-t border-neutral-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeployGuide();
              }}
              className="px-3 py-2 text-xs font-mono text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md flex items-center justify-center gap-1.5"
            >
              <CloudUpload className="w-3.5 h-3.5 text-sky-400" />
              <span>Deploy Guide</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-3 py-2 text-xs font-mono text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
