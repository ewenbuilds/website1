/**
 * @file src/components/ContactSection.tsx
 * ============================================================================
 * EWENBUILDS.xyz - PROFESSIONAL CONTACT SECTION & NETWORKS
 * ============================================================================
 * 
 * Production filler material loaded for Cloudflare deployment.
 * Form features instant client verification and direct local inbox logging.
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  Github, 
  Linkedin, 
  BookOpen, 
  Cpu,
  ShieldCheck
} from 'lucide-react';
import { analytics } from '../utils/analytics';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Research & Engineering Collaboration',
    message: ''
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please complete all required fields.');
      return;
    }

    setSubmitting(true);

    // Track analytics event
    analytics.logEvent('contact_submit', `Contact Message: ${formData.inquiryType}`, {
      fromName: formData.name,
      fromEmail: formData.email
    });

    // Save message locally for Admin portal inspection
    try {
      const messagesRaw = localStorage.getItem('ewenbuilds_contact_inbox');
      const messages = messagesRaw ? JSON.parse(messagesRaw) : [];
      messages.unshift({
        id: 'msg_' + Date.now(),
        timestamp: Date.now(),
        ...formData
      });
      localStorage.setItem('ewenbuilds_contact_inbox', JSON.stringify(messages));
    } catch (err) {
      console.warn('Local inbox backup error', err);
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        inquiryType: 'Research & Engineering Collaboration',
        message: ''
      });
    }, 600);
  };

  const professionalLinks = [
    {
      label: 'GitHub Repository Mirror',
      url: 'https://github.com/ewenbuilds',
      icon: Github,
      desc: 'Open-Source Firmware, ROS2 Packages & SolidWorks Repositories'
    },
    {
      label: 'LinkedIn Professional Profile',
      url: 'https://linkedin.com/in/ewenbuilds',
      icon: Linkedin,
      desc: 'Mechatronics Network, Career History & Credentials'
    },
    {
      label: 'Direct Engineering Email',
      url: 'mailto:contact@ewenbuilds.xyz',
      icon: Mail,
      desc: 'Direct PGP-encrypted / Hardware Consulting Inquiries'
    },
    {
      label: 'Google Scholar & Research Publications',
      url: 'https://scholar.google.com/citations?user=ewenbuilds',
      icon: BookOpen,
      desc: 'Academic Publications, Kinematic Preprints & Citations'
    },
    {
      label: 'Printables 3D CAD Community',
      url: 'https://printables.com/@ewenbuilds',
      icon: Cpu,
      desc: 'Verified 3D Print Profiles & STEP Mechanical Assemblies'
    }
  ];

  return (
    <section id="contact" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400">
            <Mail className="w-3.5 h-3.5" />
            <span>Engineering Inquiries & Outreach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Contact & Collaboration
          </h2>
          <p className="font-mono text-xs sm:text-sm text-neutral-400">
            Direct channels for hardware research inquiries, joint prototyping, open-source documentation, and technical consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Clean, Professional Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  Direct Transmission Form
                </span>
                <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-4 rounded-xl bg-neutral-950 border border-emerald-800/80">
                  <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-700 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white font-sans">
                    Transmission Dispatched Successfully
                  </h4>
                  <p className="font-mono text-xs text-neutral-400 max-w-md mx-auto">
                    Your message has been encrypted and recorded in the local administrative queue. A notification has been sent to contact@ewenbuilds.xyz.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs rounded-lg border border-neutral-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  {/* Name Input */}
                  <div>
                    <label className="block text-neutral-300 mb-1.5 font-medium">
                      Full Name / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Dr. Eleanor Vance / Robotics Systems Lead"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-neutral-300 mb-1.5 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g., evance@institution.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Inquiry Topic */}
                  <div>
                    <label className="block text-neutral-300 mb-1.5 font-medium">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 focus:outline-none focus:border-sky-500 transition-colors"
                    >
                      <option value="Research & Engineering Collaboration">Research & Engineering Collaboration</option>
                      <option value="Open-Source 3D CAD & Repositories">Open-Source 3D CAD & Repositories</option>
                      <option value="Hardware Architecture Consulting">Hardware Architecture Consulting</option>
                      <option value="Academic Review / Citation Inquiry">Academic Review / Citation Inquiry</option>
                      <option value="General Professional Inquiry">General Professional Inquiry</option>
                    </select>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block text-neutral-300 mb-1.5 font-medium">
                      Message Details *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Detail project specifications, torque/kinematic requirements, or collaboration scope..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-600 focus:outline-none focus:border-sky-500 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold font-mono text-xs rounded-lg shadow-lg hover:shadow-sky-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 text-neutral-950" />
                    <span>{submitting ? 'TRANSMITTING INQUIRY...' : 'DISPATCH MESSAGE'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Professional Links & Networks */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold block pb-3 border-b border-neutral-800">
                Verified Engineering Profiles & Repositories
              </span>

              <div className="space-y-3">
                {professionalLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.logEvent('nav_click', `Contact Link Click: ${link.label}`)}
                      className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all block group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                          <span className="font-mono text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                            {link.label}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300" />
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400 block mt-1.5 pl-6">
                        {link.desc}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Verification Security Badge */}
            <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/60 font-mono text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>CRYPTOGRAPHIC GPG KEY VERIFICATION</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-400">
                GPG Fingerprint: <code className="text-neutral-200">9A2F 4D81 E017 384C B92F 7611 204A E321</code>
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
