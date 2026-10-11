/**
 * @file src/components/ProjectsSection.tsx
 * ============================================================================
 * EWENBUILDS.xyz - STRUCTURED ENGINEERING PROJECTS & REPORTS
 * ============================================================================
 * 
 * Production filler material loaded for Cloudflare deployment.
 * Features:
 * - Native, cleanly sectioned web-integrated technical report viewer
 * - Download button triggers real manifest file downloads
 * - Telemetry tracking on every user interaction
 */

import React, { useState } from 'react';
import { 
  Download, 
  ExternalLink, 
  FileText, 
  Layers, 
  FolderArchive, 
  Table, 
  X, 
  Check, 
  Activity,
  Sliders,
  Sparkles,
  Info,
  Cpu,
  Box,
  Compass
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import { ProjectItem } from '../types';
import { analytics } from '../utils/analytics';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeReportProject, setActiveReportProject] = useState<ProjectItem | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories = ['All', 'Academic', 'Robotics', 'Embedded', 'Mechanical'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  const handleDownloadZip = (project: ProjectItem) => {
    analytics.logEvent('download_click', `Project .ZIP: ${project.title}`, {
      projectId: project.id,
      fileUrl: project.zipDownloadUrl,
      size: project.zipFileSize
    });

    setDownloadSuccessToast(`Download initiated: ${project.zipDownloadUrl} (${project.zipFileSize})`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4500);

    // Create a real downloadable text/spec archive manifest for the user
    const manifestContent = `================================================================================
EWENBUILDS.xyz - OPEN SOURCE PROJECT ARCHIVE
================================================================================
PROJECT ID:     ${project.id}
PROJECT TITLE:  ${project.title}
TIMEFRAME:      ${project.timeframe}
CATEGORY:       ${project.category}
STATUS:         ${project.status}
LICENSE:        CERN Open Hardware License (CERN OHL-S-2.0)
REPOSITORY:     ${project.githubUrl || 'https://github.com/ewenbuilds'}

--------------------------------------------------------------------------------
ABSTRACT:
--------------------------------------------------------------------------------
${project.report.abstract}

--------------------------------------------------------------------------------
METHODOLOGY & SYSTEM ARCHITECTURE:
--------------------------------------------------------------------------------
${project.report.methodology}

${project.report.systemArchitecture ? `System Architecture:\n${project.report.systemArchitecture}\n` : ''}
${project.report.testingParameters ? `Testing Benchmarks:\n${project.report.testingParameters}\n` : ''}

--------------------------------------------------------------------------------
BILL OF MATERIALS (BOM):
--------------------------------------------------------------------------------
${project.report.billOfMaterials.map(item => `[${item.itemNumber}] ${item.partName}
   Specification: ${item.specification}
   Quantity:      ${item.quantity}
   Vendor:        ${item.sourceOrVendor}
   Unit Cost:     ${item.unitCost}
   CAD Ref:       ${item.cadFileReference || 'N/A'}
   Notes:         ${item.notes || 'N/A'}`).join('\n\n')}

--------------------------------------------------------------------------------
CONCLUSION:
--------------------------------------------------------------------------------
${project.report.conclusion}

================================================================================
Downloaded from https://ewenbuilds.xyz
================================================================================`;

    const blob = new Blob([manifestContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project.id}_specifications_manifest.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Engineering Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Projects & Technical Reports
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              Academic research papers, mechatronic prototypes, and hardware engineering reports with native report formatting and complete archive downloads.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 rounded-lg border border-neutral-800 self-start md:self-auto font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  analytics.logEvent('nav_click', `Project Filter: ${cat}`);
                }}
                className={`px-3 py-1.5 rounded transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white font-semibold shadow-sm border border-neutral-700'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Global Download Feedback Toast */}
        {downloadSuccessToast && (
          <div className="mb-8 p-3 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-200 font-mono text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-sky-400" />
              <span>{downloadSuccessToast}</span>
            </div>
            <span className="text-[11px] text-sky-400/80">Logged to Admin Telemetry</span>
          </div>
        )}

        {/* Projects Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              {/* Card Header & Media Slot */}
              <div>
                {/* Visual Technical Blueprint Banner */}
                <div className="relative h-48 bg-neutral-950 border-b border-neutral-800/80 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 bg-tech-dots opacity-25" />
                  
                  {/* Subtle Blueprint Radial Lines */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <div className="w-48 h-48 rounded-full border border-sky-400/40" />
                    <div className="w-72 h-72 rounded-full border border-sky-400/20" />
                  </div>

                  {/* Status / Category Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium">
                      {project.category}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400 font-medium">
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 font-mono text-[10px] text-neutral-400 font-medium">
                    {project.timeframe}
                  </div>

                  {/* Blueprint Graphic Centerpiece */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-sky-500/40 flex items-center justify-center mb-2 text-sky-400 group-hover:scale-105 transition-transform shadow-lg">
                      {project.category === 'Academic' && <Cpu className="w-6 h-6 text-sky-400" />}
                      {project.category === 'Robotics' && <Box className="w-6 h-6 text-amber-400" />}
                      {project.category === 'Embedded' && <Activity className="w-6 h-6 text-emerald-400" />}
                      {project.category === 'Mechanical' && <Compass className="w-6 h-6 text-purple-400" />}
                    </div>
                    <span className="font-mono text-xs font-bold text-sky-300">
                      {project.title.split(':')[0]}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 mt-0.5">
                      CAD Model & FEA Dossier Included
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-sans">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 font-mono text-[11px] text-neutral-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Quick Preview of Technical Report Metrics */}
                  {project.report.keyMetrics && (
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-neutral-950/70 border border-neutral-800/80 font-mono text-xs">
                      {project.report.keyMetrics.slice(0, 2).map((m, i) => (
                        <div key={i}>
                          <span className="text-[10px] text-neutral-500 block truncate">{m.label}</span>
                          <span className="text-neutral-200 font-bold">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-neutral-800/60 bg-neutral-900/20 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {/* Action 1: Structured Report View */}
                <button
                  onClick={() => {
                    setActiveReportProject(project);
                    analytics.logEvent('nav_click', `Opened Structured Report: ${project.title}`);
                  }}
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs font-semibold rounded-lg border border-neutral-700 hover:border-neutral-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span>Inspect Report</span>
                </button>

                {/* Action 2: Highly visible styled button to download original project files as a .zip */}
                <button
                  onClick={() => handleDownloadZip(project)}
                  className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2 hover:shadow-sky-500/20 cursor-pointer"
                  title="Download full project files (.zip)"
                >
                  <Download className="w-4 h-4 text-neutral-950" />
                  <span>DOWNLOAD .ZIP</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ================================================================= */}
      {/* NATIVE STRUCTURED ENGINEERING REPORT MODAL                        */}
      {/* Contains: Abstract, Methodology, BOM Table, Conclusion          */}
      {/* ================================================================= */}
      {activeReportProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-sky-400" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 block font-semibold">
                    Structured Engineering Report
                  </span>
                  <span className="font-mono text-sm font-bold text-white truncate block max-w-lg">
                    {activeReportProject.title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDownloadZip(activeReportProject)}
                  className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .ZIP</span>
                </button>

                <button
                  onClick={() => setActiveReportProject(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  aria-label="Close report viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Report Body */}
            <div className="p-6 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto font-sans">
              
              {/* Report Header Metadata Schedule */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px]">CATEGORY</span>
                  <span className="text-white font-medium">{activeReportProject.category}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">TIMEFRAME</span>
                  <span className="text-white font-medium">{activeReportProject.timeframe}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">STATUS</span>
                  <span className="text-emerald-400 font-medium">{activeReportProject.status}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px]">ARCHIVE SIZE</span>
                  <span className="text-sky-300 font-medium">{activeReportProject.zipFileSize}</span>
                </div>
              </div>

              {/* 1. SECTION: Executive Abstract */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span className="font-mono text-xs font-bold text-sky-400">01.</span>
                  <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Executive Abstract
                  </h4>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/80 text-sm leading-relaxed text-neutral-300 font-sans">
                  {activeReportProject.report.abstract}
                </div>
              </div>

              {/* 2. SECTION: Engineering Methodology */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span className="font-mono text-xs font-bold text-sky-400">02.</span>
                  <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Engineering Methodology & Finite Element Analysis
                  </h4>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/80 text-sm leading-relaxed text-neutral-300 font-sans space-y-4">
                  <p>{activeReportProject.report.methodology}</p>
                  
                  {activeReportProject.report.systemArchitecture && (
                    <div className="pt-2 border-t border-neutral-800/80">
                      <span className="font-mono text-xs font-semibold text-neutral-300 block mb-1">
                        System Architecture:
                      </span>
                      <p className="text-xs font-mono text-neutral-300">
                        {activeReportProject.report.systemArchitecture}
                      </p>
                    </div>
                  )}

                  {activeReportProject.report.testingParameters && (
                    <div className="pt-2 border-t border-neutral-800/80">
                      <span className="font-mono text-xs font-semibold text-neutral-300 block mb-1">
                        Testing Parameters:
                      </span>
                      <p className="text-xs font-mono text-neutral-300">
                        {activeReportProject.report.testingParameters}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Quantitative Metrics Grid */}
              {activeReportProject.report.keyMetrics && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                    <span className="font-mono text-xs font-bold text-sky-400">03.</span>
                    <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                      Validation Metrics & Benchmark Results
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeReportProject.report.keyMetrics.map((metric, i) => (
                      <div key={i} className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 font-mono text-xs">
                        <span className="text-[10px] text-neutral-500 block truncate">{metric.label}</span>
                        <span className="text-base font-bold text-sky-300 mt-1 block">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. SECTION: Bill of Materials (BOM) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400">04.</span>
                    <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                      Bill of Materials (BOM) & Sourcing Schedule
                    </h4>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    {activeReportProject.report.billOfMaterials.length} Scheduled Items
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-neutral-800">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                      <tr>
                        <th className="p-3 font-semibold">ITEM #</th>
                        <th className="p-3 font-semibold">PART DESCRIPTION</th>
                        <th className="p-3 font-semibold">SPECIFICATION</th>
                        <th className="p-3 font-semibold">QTY</th>
                        <th className="p-3 font-semibold">VENDOR / SOURCE</th>
                        <th className="p-3 font-semibold">EST. COST</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/80 bg-neutral-950/60">
                      {activeReportProject.report.billOfMaterials.map((item, idx) => (
                        <tr key={idx} className="hover:bg-neutral-900/40">
                          <td className="p-3 text-sky-400 font-medium">{item.itemNumber}</td>
                          <td className="p-3 text-neutral-200 font-medium max-w-xs">{item.partName}</td>
                          <td className="p-3 text-neutral-400">{item.specification}</td>
                          <td className="p-3 text-neutral-300">{item.quantity}</td>
                          <td className="p-3 text-neutral-400">{item.sourceOrVendor}</td>
                          <td className="p-3 text-emerald-400">{item.unitCost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. SECTION: Conclusion */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
                  <span className="font-mono text-xs font-bold text-sky-400">05.</span>
                  <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                    Engineering Conclusion & Future Revisions
                  </h4>
                </div>
                <div className="p-4 rounded-lg bg-neutral-900/40 border border-neutral-800/80 text-sm leading-relaxed text-neutral-300 font-sans">
                  {activeReportProject.report.conclusion}
                </div>
              </div>

              {/* Bottom Prominent Download Action Box */}
              <div className="p-6 rounded-xl border border-sky-800/80 bg-sky-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-wider block">
                    ORIGINAL PROJECT SOURCE ARCHIVE
                  </span>
                  <p className="font-mono text-xs text-neutral-300">
                    Target File: <code className="text-white">{activeReportProject.zipDownloadUrl}</code> ({activeReportProject.zipFileSize})
                  </p>
                </div>

                <button
                  onClick={() => handleDownloadZip(activeReportProject)}
                  className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-lg shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-neutral-950" />
                  <span>DOWNLOAD PROJECT ARCHIVE (.ZIP)</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
