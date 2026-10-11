/**
 * @file src/components/DeploymentGuideModal.tsx
 * ============================================================================
 * EWENBUILDS.xyz - CLOUDFLARE HOSTING & DOMAIN SETUP MANUAL
 * ============================================================================
 * 
 * Provides:
 * 1. Step-by-step instructions to deploy directly on Cloudflare Pages
 * 2. Exact Cloudflare DNS Records to map custom domain: ewenbuilds.xyz
 * 3. File upload instructions for new .zip archives and 3D CAD models
 */

import React, { useState } from 'react';
import { 
  X, 
  CloudUpload, 
  Globe, 
  FolderArchive, 
  Cpu, 
  Terminal, 
  Check, 
  Copy, 
  ExternalLink,
  ShieldCheck,
  Server,
  Zap,
  Flame
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-950 border border-amber-800 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block">
                EWENBUILDS.xyz Pipeline
              </span>
              <span className="font-mono text-sm font-bold text-white">
                Cloudflare Pages & Custom Domain Manual
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 font-mono text-xs">
          
          {/* STEP 1: Cloudflare Pages Deployment (Primary) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">STEP 01</span>
                <h4 className="font-bold text-white uppercase tracking-wider text-sm">
                  Deploy to Cloudflare Pages (Recommended)
                </h4>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300 text-[11px] font-bold">
                CLOUDFLARE EDGE
              </span>
            </div>

            <p className="text-neutral-300 font-sans text-xs leading-relaxed">
              Cloudflare Pages provides global edge distribution with 0ms cold starts, unmetered bandwidth, and native DDoS protection for your CAD downloads.
            </p>

            {/* Cloudflare Setup Steps */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3">
              <span className="text-white font-bold text-sm block">Cloudflare Pages Dashboard Steps:</span>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300 font-sans leading-relaxed">
                <li>Push this project to your GitHub repository (e.g. <code>github.com/ewenbuilds/portfolio</code>).</li>
                <li>Go to the <a href="https://dash.cloudflare.com" target="_blank" className="text-amber-400 underline font-semibold">Cloudflare Dashboard</a> and navigate to <strong>Workers & Pages</strong> &gt; <strong>Create application</strong> &gt; <strong>Pages</strong> &gt; <strong>Connect to Git</strong>.</li>
                <li>Select your repository and configure these exact build settings:</li>
              </ol>

              {/* Exact Build Settings Table */}
              <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950">
                <table className="w-full text-left font-mono text-xs">
                  <tbody className="divide-y divide-neutral-800">
                    <tr>
                      <td className="p-2.5 text-neutral-400 font-medium">Framework Preset:</td>
                      <td className="p-2.5 text-sky-400 font-bold">Vite</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-neutral-400 font-medium">Build command:</td>
                      <td className="p-2.5 text-emerald-400 font-bold">npm run build</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-neutral-400 font-medium">Build output directory:</td>
                      <td className="p-2.5 text-emerald-400 font-bold">dist</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-neutral-400 font-medium">Root directory:</td>
                      <td className="p-2.5 text-neutral-200">/ (leave default)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded bg-sky-950/40 border border-sky-800 text-sky-300 text-[11px] font-sans">
                <strong>SPA Client Routing:</strong> The required <code className="text-white">/public/_redirects</code> file is already created in this project! It prevents 404 errors when visitors refresh direct URLs on Cloudflare Pages.
              </div>

              {/* CLI Alternative */}
              <div className="pt-2 border-t border-neutral-800 space-y-1.5">
                <span className="text-neutral-400 block text-[11px]">Or deploy directly using Wrangler CLI:</span>
                <div className="flex items-center justify-between p-2.5 rounded bg-neutral-950 border border-neutral-800">
                  <code className="text-neutral-200">npx wrangler pages deploy dist --project-name=ewenbuilds</code>
                  <button
                    onClick={() => copyToClipboard('npx wrangler pages deploy dist --project-name=ewenbuilds', 'wrangler-cli')}
                    className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-[10px] flex items-center gap-1"
                  >
                    {copiedId === 'wrangler-cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === 'wrangler-cli' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: Routing Custom Domain ewenbuilds.xyz on Cloudflare */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
              <span className="text-amber-400 font-bold">STEP 02</span>
              <h4 className="font-bold text-white uppercase tracking-wider text-sm">
                Connecting Custom Domain: ewenbuilds.xyz
              </h4>
            </div>

            <p className="text-neutral-300 font-sans text-xs leading-relaxed">
              Because you are using Cloudflare, domain mapping is 1-click automatic:
            </p>

            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-3 font-sans leading-relaxed text-neutral-300">
              <ol className="list-decimal list-inside space-y-2">
                <li>In your Cloudflare Pages project, click the <strong>Custom Domains</strong> tab.</li>
                <li>Click <strong>Set up a custom domain</strong> and enter: <code className="text-white font-mono bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">ewenbuilds.xyz</code>.</li>
                <li>Click <strong>Continue</strong>. Cloudflare automatically adds the DNS CNAME record to your zone!</li>
                <li>Repeat for <code className="text-white font-mono bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">www.ewenbuilds.xyz</code>.</li>
              </ol>

              {/* DNS Summary Table */}
              <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-950 font-mono text-xs">
                <table className="w-full text-left">
                  <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                    <tr>
                      <th className="p-2.5">TYPE</th>
                      <th className="p-2.5">NAME</th>
                      <th className="p-2.5">TARGET</th>
                      <th className="p-2.5">PROXY STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-200">
                    <tr>
                      <td className="p-2.5 text-sky-400 font-bold">CNAME</td>
                      <td className="p-2.5">@ (ewenbuilds.xyz)</td>
                      <td className="p-2.5 text-amber-300">ewenbuilds.pages.dev</td>
                      <td className="p-2.5 text-emerald-400 font-bold">Proxied (Orange Cloud)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-sky-400 font-bold">CNAME</td>
                      <td className="p-2.5">www</td>
                      <td className="p-2.5 text-amber-300">ewenbuilds.pages.dev</td>
                      <td className="p-2.5 text-emerald-400 font-bold">Proxied (Orange Cloud)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-[11px]">
                <strong>SSL / TLS Mode:</strong> In Cloudflare SSL/TLS settings, set mode to <strong>Full (strict)</strong> or <strong>Full</strong>. Edge certificates provision automatically within 2 minutes.
              </div>
            </div>
          </div>

          {/* STEP 3: Where to Drop New .ZIPs & 3D Models */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
              <span className="text-amber-400 font-bold">STEP 03</span>
              <h4 className="font-bold text-white uppercase tracking-wider text-sm">
                Adding New .ZIP Archives & 3D Models
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold">
                  <FolderArchive className="w-4 h-4" />
                  <span>Project .ZIP Archives</span>
                </div>
                <code className="text-[11px] text-white block bg-neutral-950 p-2 rounded border border-neutral-800">
                  /public/downloads/
                </code>
                <span className="text-[10px] text-neutral-400 block font-sans">
                  Drop project zip archives here. Served directly from the Cloudflare edge.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Cpu className="w-4 h-4" />
                  <span>3D CAD Models</span>
                </div>
                <code className="text-[11px] text-white block bg-neutral-950 p-2 rounded border border-neutral-800">
                  /public/cad/
                </code>
                <span className="text-[10px] text-neutral-400 block font-sans">
                  Drop .STEP, .STL, or .GLB files here for interactive Three.js 3D inspection.
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1.5">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Globe className="w-4 h-4" />
                  <span>Resume & Documentation</span>
                </div>
                <code className="text-[11px] text-white block bg-neutral-950 p-2 rounded border border-neutral-800">
                  /public/downloads/resume/
                </code>
                <span className="text-[10px] text-neutral-400 block font-sans">
                  Drop your original resume PDF here.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <span className="font-mono text-[11px] text-neutral-400">
            EWENBUILDS.xyz · Cloudflare Pages Edge Pipeline Ready
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-mono text-neutral-200 bg-neutral-800 hover:bg-neutral-700 rounded-lg border border-neutral-700 transition-colors"
          >
            Close Manual
          </button>
        </div>

      </div>
    </div>
  );
};
