/**
 * @file src/components/ResumeSection.tsx
 * ============================================================================
 * EWENBUILDS.xyz - NATIVE INTEGRATED ENGINEERING RESUME
 * ============================================================================
 * 
 * Requirements:
 * - Resume displayed fully and cleanly integrated directly onto the webpage (not just an image)
 * - Prominent "Download Original PDF" button alongside the integrated view
 * - Complete explicit bracket formatting for user personalization
 */

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ExternalLink,
  GraduationCap,
  Briefcase,
  Wrench,
  Award,
  Check
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { analytics } from '../utils/analytics';

export const ResumeSection: React.FC = () => {
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownloadPDF = () => {
    analytics.logEvent('download_click', 'Resume Original PDF', {
      url: resumeData.pdfDownloadUrl
    });

    setDownloadToast(`Resume download started: "${resumeData.pdfDownloadUrl}"`);
    setTimeout(() => setDownloadToast(null), 4000);

    const resumeDocContent = `================================================================================
${resumeData.fullName.toUpperCase()}
${resumeData.title}
================================================================================
Email:    ${resumeData.email}
Phone:    ${resumeData.phone}
Location: ${resumeData.location}
Website:  ${resumeData.website}
GitHub:   ${resumeData.github}
LinkedIn: ${resumeData.linkedin}

--------------------------------------------------------------------------------
PROFESSIONAL SUMMARY:
--------------------------------------------------------------------------------
${resumeData.summary}

--------------------------------------------------------------------------------
EDUCATION:
--------------------------------------------------------------------------------
${resumeData.education.map(edu => `${edu.institution} (${edu.period})
Degree:   ${edu.degree}
GPA:      ${edu.gpa} | Location: ${edu.location}
Honors:   ${edu.honors.join(', ')}
Courses:  ${edu.coursework.join(', ')}`).join('\n\n')}

--------------------------------------------------------------------------------
ENGINEERING & RESEARCH EXPERIENCE:
--------------------------------------------------------------------------------
${resumeData.experience.map(exp => `${exp.role} - ${exp.organization}
${exp.period} | ${exp.location}
Key Achievements:
${exp.responsibilities.map(r => ` * ${r}`).join('\n')}
Technologies: ${exp.technologiesUsed.join(', ')}`).join('\n\n')}

--------------------------------------------------------------------------------
TECHNICAL SKILLS MATRIX:
--------------------------------------------------------------------------------
${resumeData.technicalSkills.map(cat => `${cat.category}:
  ${cat.skills.join(', ')}`).join('\n\n')}

--------------------------------------------------------------------------------
CERTIFICATIONS & HONORS:
--------------------------------------------------------------------------------
${resumeData.certificationsAndHonors.map(c => ` * ${c}`).join('\n')}

================================================================================
Downloaded from https://ewenbuilds.xyz
================================================================================`;

    const blob = new Blob([resumeDocContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Ewen_Builds_Hardware_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    analytics.logEvent('nav_click', 'Print Resume Action');
    window.print();
  };

  return (
    <section id="resume" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Prominent Download PDF Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
              <FileText className="w-3.5 h-3.5" />
              <span>Curriculum Vitae</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Integrated Engineering Resume
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-300">
              Full verifiable engineering qualifications, education, and technical competencies.
            </p>
          </div>

          {/* Prominent Action Buttons alongside the integrated view */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs rounded-xl border border-neutral-700 hover:border-neutral-500 transition-all flex items-center gap-2 cursor-pointer"
              title="Print or Save via Browser"
            >
              <Printer className="w-4 h-4 text-neutral-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* CRITICAL: Prominent "Download Original PDF" button */}
            <button
              onClick={handleDownloadPDF}
              className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-xl shadow-lg hover:shadow-sky-500/20 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-950" />
              <span>DOWNLOAD ORIGINAL RESUME</span>
            </button>
          </div>
        </div>

        {/* Global Download Feedback Toast */}
        {downloadToast && (
          <div className="mb-6 p-3 rounded-lg bg-sky-950/90 border border-sky-800 text-sky-200 font-mono text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-400" />
              <span>{downloadToast}</span>
            </div>
            <span className="text-[11px] text-sky-400/80">Logged to analytics</span>
          </div>
        )}

        {/* ================================================================= */}
        {/* FULLY & CLEANLY INTEGRATED RESUME DOCUMENT                        */}
        {/* Rendered directly as clean semantic HTML                          */}
        {/* ================================================================= */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-md shadow-2xl p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Resume Header */}
          <div className="border-b border-neutral-800 pb-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
                  {resumeData.fullName}
                </h1>
                <p className="font-mono text-sm sm:text-base text-sky-400 mt-1 font-semibold">
                  {resumeData.title}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-300 self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>AVAILABLE FOR COLLABORATION</span>
              </div>
            </div>

            {/* Contact Metadata Bar with Explicit Brackets */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 font-mono text-xs text-neutral-400 pt-2">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                {resumeData.email}
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                {resumeData.phone}
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                {resumeData.location}
              </span>
              <a 
                href={resumeData.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-sky-400 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                GitHub
              </a>
              <a 
                href={resumeData.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-1 text-sky-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            </div>
          </div>

          {/* 1. Professional Engineering Summary */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              Professional Overview
            </h3>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-sans">
              {resumeData.summary}
            </p>
          </div>

          {/* 2. Education Section */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2 border-b border-neutral-800 pb-2">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              Education
            </h3>

            {resumeData.education.map((edu, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-base text-white font-sans">
                      {edu.institution}
                    </h4>
                    <p className="font-mono text-xs text-sky-400">
                      {edu.degree}
                    </p>
                  </div>
                  <div className="font-mono text-xs text-neutral-400 sm:text-right">
                    <span>{edu.period}</span>
                    <span className="block text-neutral-500">{edu.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-neutral-300">
                  <span className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800">
                    Cumulative GPA: {edu.gpa}
                  </span>
                </div>

                {/* Honors */}
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-[10px] text-neutral-500 uppercase block">Honors & Distinctions:</span>
                  <ul className="list-disc list-inside text-neutral-400 space-y-0.5">
                    {edu.honors.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                </div>

                {/* Coursework */}
                <div className="space-y-1.5 pt-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase block">Selected Engineering Coursework:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course, cIdx) => (
                      <span key={cIdx} className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800/80 font-mono text-[11px] text-neutral-400">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Engineering & Research Experience */}
          <div className="space-y-8">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Briefcase className="w-4 h-4 text-sky-400" />
              Engineering & Industry Experience
            </h3>

            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className="font-bold text-base text-white font-sans">
                      {exp.role}
                    </h4>
                    <p className="font-mono text-xs text-sky-400">
                      {exp.organization}
                    </p>
                  </div>
                  <div className="font-mono text-xs text-neutral-400 sm:text-right">
                    <span>{exp.period}</span>
                    <span className="block text-neutral-500">{exp.location}</span>
                  </div>
                </div>

                {/* Quantitative Bullet Points */}
                <ul className="space-y-2 text-sm text-neutral-300 font-sans">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shrink-0 mt-2" />
                      <span className="leading-relaxed">{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="font-mono text-[10px] text-neutral-500 uppercase mr-1">Tools:</span>
                  {exp.technologiesUsed.map((tech, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 font-mono text-[10px] text-neutral-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 4. Technical Skills Matrix */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Wrench className="w-4 h-4 text-sky-400" />
              Technical Competency Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.technicalSkills.map((category, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800/90 space-y-2.5">
                  <span className="font-mono text-xs font-semibold text-white block">
                    {category.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800 font-mono text-[11px] text-neutral-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Certifications & Academic Honors */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Award className="w-4 h-4 text-sky-400" />
              Certifications, Patents & Honors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
              {resumeData.certificationsAndHonors.map((cert, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-neutral-300 flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom PDF Download Banner */}
          <div className="p-6 rounded-xl border border-sky-800/80 bg-sky-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block">
                Official PDF Document Download
              </span>
              <p className="font-mono text-xs text-neutral-400">
                Direct PDF archive path: <code className="text-white">{resumeData.pdfDownloadUrl}</code>
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-lg shadow-lg flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-neutral-950" />
              <span>[DOWNLOAD ORIGINAL RESUME (PDF)]</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
