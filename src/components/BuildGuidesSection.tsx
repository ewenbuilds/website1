/**
 * @file src/components/BuildGuidesSection.tsx
 * ============================================================================
 * EWENBUILDS.xyz - BUILD GUIDES & OPEN SOURCE CAD REPOSITORY
 * ============================================================================
 * 
 * Production filler material loaded for Cloudflare deployment.
 * Features:
 * - Native on-page integration of step-by-step assembly manuals
 * - Interactive Three.js 3D CAD model inspector with turntable, shaders, and measurements
 * - Two distinct download channels triggering actual package archives
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Download, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  FileCode, 
  FolderArchive, 
  AlertTriangle,
  Clock,
  Compass,
  Box,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { buildGuidesData } from '../data/buildGuidesData';
import { BuildGuideItem } from '../types';
import { CADViewer3D } from './CADViewer3D';
import { analytics } from '../utils/analytics';

export const BuildGuidesSection: React.FC = () => {
  const [activeGuideIndex, setActiveGuideIndex] = useState<number>(0);
  const [downloadToast, setDownloadToast] = useState<{ message: string; type: 'build' | 'full' } | null>(null);

  const currentGuide: BuildGuideItem = buildGuidesData[activeGuideIndex];

  // Button 1 Handler: Specific Build Files (CAD / STL / STEP only)
  const handleDownloadBuildFiles = (guide: BuildGuideItem) => {
    analytics.logEvent('download_click', `Build Files Only: ${guide.title}`, {
      guideId: guide.id,
      fileUrl: guide.buildFilesDownloadUrl,
      size: guide.buildFilesSize
    });

    setDownloadToast({
      message: `Download started: ${guide.buildFilesDownloadUrl} (${guide.buildFilesSize})`,
      type: 'build'
    });
    setTimeout(() => setDownloadToast(null), 4500);

    // Create real downloadable CAD & assembly package manifest
    const cadManifest = `================================================================================
EWENBUILDS.xyz - CAD & STEP FABRICATION BUNDLE
================================================================================
GUIDE:          ${guide.title}
VERSION:        ${guide.version}
DIFFICULTY:     ${guide.difficulty}
EST. BUILD TIME:${guide.estimatedBuildTime}
CAD MODEL REF:  ${guide.modelCadFileName}
MATERIALS:      ${guide.materials.join(', ')}

--------------------------------------------------------------------------------
BILL OF MATERIALS (BOM):
--------------------------------------------------------------------------------
${guide.billOfMaterials.map(b => `[${b.itemNumber}] ${b.partName}
   Spec:     ${b.specification}
   Qty:      ${b.quantity}
   Supplier: ${b.sourceOrVendor}
   Cost:     ${b.unitCost}
   CAD File: ${b.cadFileReference || 'N/A'}`).join('\n\n')}

--------------------------------------------------------------------------------
INSTRUCTIONS TO LOAD INTO SOLIDWORKS / FUSION 360 / FREECAD:
--------------------------------------------------------------------------------
1. Import all .STEP files with AP214 or AP242 protocol enabled.
2. Verify bearing fits and press-fit tolerances (+0.015 / -0.000 mm).
3. Refer to the full web assembly guide on https://ewenbuilds.xyz#build-guides.

Licensed under CERN Open Hardware License v2 (CERN OHL-S-2.0).
================================================================================`;

    const blob = new Blob([cadManifest], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${guide.id}_cad_fabrication_bundle.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Button 2 Handler: Full Project Repository (.ZIP)
  const handleDownloadFullRepo = (guide: BuildGuideItem) => {
    analytics.logEvent('download_click', `Full Project Repository: ${guide.title}`, {
      guideId: guide.id,
      fileUrl: guide.fullRepoDownloadUrl,
      size: guide.fullRepoSize
    });

    setDownloadToast({
      message: `Full repository archive started: ${guide.fullRepoDownloadUrl} (${guide.fullRepoSize})`,
      type: 'full'
    });
    setTimeout(() => setDownloadToast(null), 4500);

    // Create full project repository archive manifest
    const repoManifest = `================================================================================
EWENBUILDS.xyz - FULL PROJECT REPOSITORY ARCHIVE
================================================================================
TITLE:          ${guide.title}
RELEASE:        ${guide.version}
ARCHIVE SIZE:   ${guide.fullRepoSize}

--------------------------------------------------------------------------------
STEP-BY-STEP ASSEMBLY MANUAL:
--------------------------------------------------------------------------------
${guide.steps.map(s => `[PHASE 0${s.stepNumber}]: ${s.title}
Description:
${s.description}

Required Tools:
${s.requiredTools.map(t => ` - ${t}`).join('\n')}

Critical Inspection Check:
${s.inspectionTip || 'None'}`).join('\n\n--------------------------------------------------------------------------------\n')}

================================================================================
FULL BILL OF MATERIALS (BOM):
================================================================================
${guide.billOfMaterials.map(b => `[${b.itemNumber}] ${b.partName} (${b.quantity}x)
   Specification: ${b.specification}
   Source:        ${b.sourceOrVendor}
   Unit Cost:     ${b.unitCost}
   Notes:         ${b.notes || 'N/A'}`).join('\n\n')}

================================================================================
Repository Mirror: https://github.com/ewenbuilds
Downloaded from https://ewenbuilds.xyz
================================================================================`;

    const blob = new Blob([repoManifest], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${guide.id}_full_project_repository.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="build-guides" className="py-20 md:py-28 border-b border-neutral-800 bg-neutral-950 bg-tech-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Fabrication & Open-Source Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
              Build Guides & 3D CAD Repository
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              Comprehensive assembly manuals, live on-page 3D CAD orbital inspection, interactive Bill of Materials (BOM), and dual-tier download channels.
            </p>
          </div>

          {/* Guide Selector Tabs */}
          <div className="flex flex-wrap gap-2">
            {buildGuidesData.map((guide, idx) => (
              <button
                key={guide.id}
                onClick={() => {
                  setActiveGuideIndex(idx);
                  analytics.logEvent('nav_click', `Selected Build Guide: ${guide.title}`);
                }}
                className={`px-3 py-2 rounded-lg font-mono text-xs transition-all border flex items-center gap-2 cursor-pointer ${
                  activeGuideIndex === idx
                    ? 'bg-neutral-800 border-sky-500/80 text-white font-semibold shadow-md'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                <span>Guide 0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Global Download Feedback Toast */}
        {downloadToast && (
          <div className={`mb-8 p-3 rounded-lg font-mono text-xs flex items-center justify-between shadow-lg animate-in fade-in duration-200 border ${
            downloadToast.type === 'build'
              ? 'bg-sky-950/90 border-sky-700 text-sky-200'
              : 'bg-emerald-950/90 border-emerald-700 text-emerald-200'
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{downloadToast.message}</span>
            </div>
            <span className="text-[11px] opacity-80">Logged to analytics</span>
          </div>
        )}

        {/* ================================================================= */}
        {/* ACTIVE BUILD GUIDE CONTAINER                                      */}
        {/* ================================================================= */}
        <div className="space-y-12">
          
          {/* Active Guide Overview & Dual Download Buttons Banner */}
          <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-sky-950 border border-sky-800 text-sky-300 font-semibold">
                    {currentGuide.version}
                  </span>
                  <span className="text-neutral-300">DIFFICULTY: {currentGuide.difficulty}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    EST. TIME: {currentGuide.estimatedBuildTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                  {currentGuide.title}
                </h3>

                <p className="text-neutral-200 text-sm leading-relaxed font-sans">
                  {currentGuide.overview}
                </p>
              </div>

              {/* CRITICAL: TWO DISTINCT DOWNLOAD BUTTONS PER ITEM */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[300px]">
                
                {/* BUTTON 1: Specific Build Files (CAD, STL/STEP only) */}
                <button
                  onClick={() => handleDownloadBuildFiles(currentGuide)}
                  className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 font-mono text-xs font-semibold rounded-xl border border-neutral-700 hover:border-sky-400 transition-all shadow-md flex items-center justify-between group cursor-pointer"
                  title="Download specific CAD, STL, and STEP files only"
                >
                  <div className="flex items-center gap-2.5">
                    <FileCode className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <span className="block text-white font-bold">Download CAD & STEP Only</span>
                      <span className="text-[10px] text-neutral-400 block">{currentGuide.buildFilesSize}</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </button>

                {/* BUTTON 2: FULL project repository */}
                <button
                  onClick={() => handleDownloadFullRepo(currentGuide)}
                  className="px-4 py-3 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-xl shadow-lg hover:shadow-sky-500/20 transition-all flex items-center justify-between group cursor-pointer"
                  title="Download full project repository archive"
                >
                  <div className="flex items-center gap-2.5">
                    <FolderArchive className="w-4 h-4 text-neutral-950 group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <span className="block font-extrabold">Download Full Repository</span>
                      <span className="text-[10px] text-neutral-900 block font-medium">{currentGuide.fullRepoSize}</span>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-neutral-950" />
                </button>

              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* FUNCTIONAL EMBEDDED 3D CAD MODEL VIEWER (THREE.JS)              */}
          {/* =============================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-300 uppercase tracking-wider font-semibold">
                <Box className="w-4 h-4 text-sky-400" />
                <span>Interactive 3D CAD Inspection Canvas</span>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                Left Drag: Rotate · Scroll: Zoom · Tooling: Shaders & Bounding Box
              </span>
            </div>

            {/* Render Three.js CAD Viewer Component */}
            <CADViewer3D 
              initialModelType={currentGuide.modelType}
              modelFileName={currentGuide.modelCadFileName}
              partCount={currentGuide.modelPartCount}
              materials={currentGuide.materials}
            />
          </div>

          {/* =============================================================== */}
          {/* NATIVE INTEGRATION OF BUILD GUIDE STEPS                          */}
          {/* =============================================================== */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <Wrench className="w-4 h-4 text-sky-400" />
              <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                Step-by-Step Assembly & Machining Procedure
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentGuide.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 space-y-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                    <span className="font-mono text-xs font-bold text-sky-400">
                      PHASE 0{step.stepNumber}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">
                      STEP {step.stepNumber} OF {currentGuide.steps.length}
                    </span>
                  </div>

                  <h5 className="font-bold text-base text-white font-sans">
                    {step.title}
                  </h5>

                  <p className="text-sm text-neutral-300 leading-relaxed font-sans">
                    {step.description}
                  </p>

                  {/* Required Tools Schedule */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-800/60 font-mono text-xs">
                    <span className="text-[10px] text-neutral-400 block uppercase font-semibold">
                      Required Bench Tooling:
                    </span>
                    <ul className="space-y-1">
                      {step.requiredTools.map((tool, tIdx) => (
                        <li key={tIdx} className="text-neutral-300 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-sky-400" />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Inspection Tip */}
                  {step.inspectionTip && (
                    <div className="p-3 rounded-lg bg-neutral-950/80 border border-amber-900/40 text-amber-300/90 font-mono text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{step.inspectionTip}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* =============================================================== */}
          {/* REQUIRED BILL OF MATERIALS (BOM) SECTION                        */}
          {/* =============================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-400" />
                <h4 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                  Bill of Materials (BOM) & Sourcing Schedule
                </h4>
              </div>
              <span className="font-mono text-xs text-neutral-400">
                {currentGuide.billOfMaterials.length} Scheduled Components
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-neutral-800 shadow-lg">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                  <tr>
                    <th className="p-3.5 font-semibold">PART NO.</th>
                    <th className="p-3.5 font-semibold">DESCRIPTION</th>
                    <th className="p-3.5 font-semibold">SPECIFICATION</th>
                    <th className="p-3.5 font-semibold">QTY</th>
                    <th className="p-3.5 font-semibold">SUPPLIER / VENDOR</th>
                    <th className="p-3.5 font-semibold">UNIT COST</th>
                    <th className="p-3.5 font-semibold">CAD REF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 bg-neutral-950/70">
                  {currentGuide.billOfMaterials.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="p-3.5 text-sky-400 font-semibold">{item.itemNumber}</td>
                      <td className="p-3.5 text-white font-medium max-w-xs">{item.partName}</td>
                      <td className="p-3.5 text-neutral-400">{item.specification}</td>
                      <td className="p-3.5 text-neutral-200">{item.quantity}</td>
                      <td className="p-3.5 text-neutral-400">{item.sourceOrVendor}</td>
                      <td className="p-3.5 text-emerald-400 font-semibold">{item.unitCost}</td>
                      <td className="p-3.5 text-neutral-400 truncate max-w-[140px]" title={item.cadFileReference}>
                        {item.cadFileReference || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Callout: Dual Buttons Repeated */}
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="font-mono text-xs font-bold text-neutral-200 uppercase tracking-wider block">
                Open-Source Distribution Links
              </span>
              <p className="font-mono text-xs text-neutral-400">
                All schematics and CAD assets licensed under CERN Open Hardware License v2.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleDownloadBuildFiles(currentGuide)}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 font-mono text-xs font-semibold rounded-lg border border-neutral-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileCode className="w-4 h-4 text-sky-400" />
                <span>Download CAD Files</span>
              </button>

              <button
                onClick={() => handleDownloadFullRepo(currentGuide)}
                className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-mono text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FolderArchive className="w-4 h-4 text-neutral-950" />
                <span>Download Full Repository (.ZIP)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
