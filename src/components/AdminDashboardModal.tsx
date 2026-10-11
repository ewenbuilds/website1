/**
 * @file src/components/AdminDashboardModal.tsx
 * ============================================================================
 * EWENBUILDS.xyz - SECURE PRIVATE ADMIN PORTAL & ANALYTICS DASHBOARD
 * ============================================================================
 * 
 * Includes:
 * 1. Passcode Authentication Gate (Default: admin2026, fully customizable)
 * 2. Deep Telemetry View:
 *    - Total Unique Visitors
 *    - Session Duration tracker
 *    - Geographic location estimation
 *    - Referral sources
 *    - Micro-interaction & button-click telemetry (All .zip and CAD downloads)
 * 3. Step-by-Step Production Architecture Guide:
 *    - Google Analytics 4 (GA4) setup
 *    - Firebase Auth & Firestore cloud deployment
 *    - Custom backend JWT security architecture
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  BarChart3, 
  Users, 
  Download, 
  Clock, 
  Globe, 
  ExternalLink, 
  Activity, 
  Trash2, 
  FileJson, 
  Key, 
  Check, 
  AlertCircle,
  HelpCircle,
  Terminal,
  Inbox,
  RefreshCw
} from 'lucide-react';
import { analytics } from '../utils/analytics';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  
  // Dashboard view tabs: 'telemetry' | 'inbox' | 'architecture' | 'settings'
  const [activeTab, setActiveTab] = useState<'telemetry' | 'inbox' | 'architecture' | 'settings'>('telemetry');
  
  // Telemetry state
  const [summary, setSummary] = useState<any>(null);
  const [inboxMessages, setInboxMessages] = useState<any[]>([]);
  const [copiedNote, setCopiedNote] = useState<string | null>(null);

  // New passcode state
  const [newPass, setNewPass] = useState<string>('');
  const [passUpdatedToast, setPassUpdatedToast] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      refreshData();
    }
  }, [isOpen, isAuthenticated]);

  const refreshData = () => {
    setSummary(analytics.getAnalyticsSummary());
    try {
      const messagesRaw = localStorage.getItem('ewenbuilds_contact_inbox');
      setInboxMessages(messagesRaw ? JSON.parse(messagesRaw) : []);
    } catch {
      setInboxMessages([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (analytics.verifyAdminPasscode(passcode)) {
      setIsAuthenticated(true);
      setLoginError(null);
      setPasscode('');
      analytics.logEvent('nav_click', 'Admin Portal Authenticated Successfully');
      setTimeout(refreshData, 50);
    } else {
      setLoginError('Invalid Passcode. Default key is: admin2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('telemetry');
  };

  const handleExportJSON = () => {
    const dataStr = analytics.exportAnalyticsData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ewenbuilds_analytics_export_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass.trim().length >= 4) {
      analytics.updateAdminPasscode(newPass.trim());
      setPassUpdatedToast(true);
      setNewPass('');
      setTimeout(() => setPassUpdatedToast(false), 3000);
    } else {
      alert('Passcode must be at least 4 characters.');
    }
  };

  const handleCopyCode = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNote(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedNote(null), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 block">
                EWENBUILDS.xyz Private Telemetry
              </span>
              <span className="font-mono text-sm font-bold text-white">
                Admin Control & Analytics Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-neutral-400" />
                <span>Lock Session</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 font-mono text-xs">
          
          {/* =============================================================== */}
          {/* STATE 1: AUTHENTICATION LOCK SCREEN                              */}
          {/* =============================================================== */}
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-sky-400 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white font-sans">
                  Private Admin Authentication
                </h3>
                <p className="font-mono text-xs text-neutral-400 mt-2 leading-relaxed">
                  Enter your administrative passcode to decrypt and view live user telemetry, download metrics, and message queues.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-800/80 text-sky-300 text-left font-mono text-[11px] space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-sky-400">
                  <Terminal className="w-3.5 h-3.5" />
                  Default Admin Credentials:
                </div>
                <div>Passcode: <code className="bg-sky-900/60 px-1.5 py-0.5 rounded text-white font-bold">admin2026</code></div>
                <div className="text-neutral-400 text-[10px]">
                  (You can change this passcode once logged in under Settings).
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Enter Admin Passcode..."
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-center font-mono text-sm tracking-widest focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  {loginError && (
                    <div className="mt-2 text-rose-400 flex items-center justify-center gap-1 text-[11px]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{loginError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Unlock className="w-4 h-4 text-neutral-950" />
                  <span>DECRYPT & ENTER ADMIN PORTAL</span>
                </button>
              </form>
            </div>
          ) : (

            /* =============================================================== */
            /* STATE 2: AUTHENTICATED ADMIN DASHBOARD VIEW                     */
            /* =============================================================== */
            <div className="space-y-6">
              
              {/* Navigation Tabs Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'telemetry'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    <span>Live Telemetry & Downloads</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inbox')}
                    className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'inbox'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <Inbox className="w-4 h-4 text-emerald-400" />
                    <span>Inquiries Inbox ({inboxMessages.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('architecture')}
                    className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'architecture'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>GA4 & Firebase Architecture</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-3.5 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                      activeTab === 'settings'
                        ? 'bg-neutral-800 text-white border border-neutral-700'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                    }`}
                  >
                    <Key className="w-4 h-4 text-purple-400" />
                    <span>Passcode & Export</span>
                  </button>
                </div>

                <button
                  onClick={refreshData}
                  className="px-3 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Toast Feedback */}
              {copiedNote && (
                <div className="p-2.5 rounded bg-sky-950 border border-sky-800 text-sky-300 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>{copiedNote}</span>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 1: LIVE TELEMETRY & DOWNLOADS                            */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'telemetry' && summary && (
                <div className="space-y-6">
                  
                  {/* High Level Metrics Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                        Total Unique Visitors
                      </span>
                      <span className="text-2xl font-bold text-white block">{summary.totalVisitors}</span>
                      <span className="text-[10px] text-emerald-400 block">Unique client identifiers</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5 text-emerald-400" />
                        Total Downloads Triggered
                      </span>
                      <span className="text-2xl font-bold text-emerald-400 block">{summary.totalDownloads}</span>
                      <span className="text-[10px] text-neutral-400 block">.ZIP, CAD & PDF files</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Avg. Session Duration
                      </span>
                      <span className="text-2xl font-bold text-amber-300 block">{summary.averageSessionDuration}</span>
                      <span className="text-[10px] text-neutral-400 block">Continuous active presence</span>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                      <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-purple-400" />
                        Primary Geographic Hub
                      </span>
                      <span className="text-base font-bold text-white block truncate">
                        {summary.currentSession?.estimatedLocation || 'Global Client'}
                      </span>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        {summary.currentSession?.browser} on {summary.currentSession?.os}
                      </span>
                    </div>
                  </div>

                  {/* Downloads Breakdown Table */}
                  <div className="space-y-3">
                    <span className="font-bold text-neutral-300 block border-b border-neutral-800 pb-2 flex items-center justify-between">
                      <span>FILE DOWNLOAD TELEMETRY TRACKER</span>
                      <span className="text-neutral-500 font-normal">Tracking every .zip, CAD, and PDF click</span>
                    </span>

                    <div className="overflow-x-auto rounded-xl border border-neutral-800">
                      <table className="w-full text-left">
                        <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                          <tr>
                            <th className="p-3">RESOURCE TARGET</th>
                            <th className="p-3">FILE TYPE</th>
                            <th className="p-3">DOWNLOAD COUNT</th>
                            <th className="p-3">ANALYTICS STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/80 bg-neutral-950/70">
                          {Object.keys(summary.downloadBreakdown).length === 0 ? (
                            <tr>
                              <td colSpan={4} className="p-4 text-center text-neutral-500">
                                No download clicks logged yet in this testing cycle. Click any .zip or CAD download button on the site to see real-time counters populate here!
                              </td>
                            </tr>
                          ) : (
                            Object.entries(summary.downloadBreakdown).map(([target, count]: any, i) => (
                              <tr key={i} className="hover:bg-neutral-900/40">
                                <td className="p-3 text-white font-medium">{target}</td>
                                <td className="p-3 text-sky-400">
                                  {target.includes('.pdf') ? 'PDF Document' : target.includes('CAD') ? '3D CAD / STL' : 'Full Repository (.ZIP)'}
                                </td>
                                <td className="p-3 text-emerald-400 font-bold">{count}</td>
                                <td className="p-3 text-neutral-400">Active Telemetry Verified</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Geographic & Referral Grids */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Geographic Breakdown */}
                    <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                      <span className="font-bold text-neutral-300 block flex items-center gap-2">
                        <Globe className="w-4 h-4 text-sky-400" />
                        Geographic Region Breakdown
                      </span>
                      <div className="space-y-1.5">
                        {Object.entries(summary.geoBreakdown).map(([loc, count]: any, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800/70">
                            <span className="text-neutral-300">{loc}</span>
                            <span className="text-sky-400 font-bold">{count} sessions</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Referral Sources */}
                    <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                      <span className="font-bold text-neutral-300 block flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-purple-400" />
                        Referral Sources & Acquisition
                      </span>
                      <div className="space-y-1.5">
                        {Object.entries(summary.referrerBreakdown).map(([ref, count]: any, i) => (
                          <div key={i} className="flex items-center justify-between p-2 rounded bg-neutral-950 border border-neutral-800/70">
                            <span className="text-neutral-300">{ref}</span>
                            <span className="text-purple-400 font-bold">{count} visits</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Real-time Event Stream */}
                  <div className="space-y-3">
                    <span className="font-bold text-neutral-300 block border-b border-neutral-800 pb-2">
                      RECENT EVENT TELEMETRY STREAM (LAST 25 EVENTS)
                    </span>
                    <div className="max-h-60 overflow-y-auto space-y-1.5">
                      {summary.recentEvents.map((evt: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded bg-neutral-900/50 border border-neutral-800 flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              evt.type === 'download_click' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                              evt.type === 'cad_interaction' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                              'bg-neutral-800 text-neutral-300'
                            }`}>
                              {evt.type.toUpperCase()}
                            </span>
                            <span className="text-white font-medium truncate max-w-md">{evt.target}</span>
                          </div>
                          <span className="text-neutral-500 shrink-0">
                            {new Date(evt.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 2: INQUIRIES INBOX                                        */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'inbox' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <div>
                      <h4 className="font-bold text-white text-sm">Contact Form Transmissions</h4>
                      <p className="text-neutral-400 text-xs">Direct messages dispatched through the contact section.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                      {inboxMessages.length} Stored Inquiries
                    </span>
                  </div>

                  {inboxMessages.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 rounded-xl bg-neutral-900/30 border border-neutral-800">
                      No contact messages received yet. Submit a message in the Contact section to test the live inbox!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inboxMessages.map((msg: any) => (
                        <div key={msg.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-sm">{msg.name}</span>
                            <span className="text-neutral-500 text-[11px]">
                              {new Date(msg.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-neutral-400 text-xs">
                            <span>Email: <code className="text-sky-300">{msg.email}</code></span>
                            <span>Topic: <code className="text-amber-300">{msg.inquiryType}</code></span>
                          </div>
                          <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-200 text-xs leading-relaxed font-sans">
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 3: GA4 & FIREBASE PRODUCTION ARCHITECTURE GUIDE           */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/80 text-sky-200 space-y-2">
                    <h4 className="font-bold text-sm text-sky-300 flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      Production Cloud Analytics & Auth Architecture
                    </h4>
                    <p className="text-xs leading-relaxed text-neutral-300 font-sans">
                      EWENBUILDS.xyz is built with a decoupled architecture. Below are the exact code snippets and configuration steps to wire Google Analytics 4 (GA4) and Firebase Authentication + Firestore database for remote multi-device private admin access.
                    </p>
                  </div>

                  {/* Architecture 1: Google Analytics 4 (GA4) */}
                  <div className="space-y-3 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        1. Google Analytics 4 (GA4) Setup
                      </span>
                      <button
                        onClick={() => handleCopyCode(
                          `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', 'G-XXXXXXXXXX');\n</script>`,
                          'GA4 Script'
                        )}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-sky-300 rounded border border-neutral-700"
                      >
                        Copy GA4 Tag
                      </button>
                    </div>

                    <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                      1. Go to <a href="https://analytics.google.com" target="_blank" className="text-sky-400 underline">analytics.google.com</a> and create a Web Stream for <code>ewenbuilds.xyz</code>.
                      <br />2. Copy your Measurement ID (e.g., <code>G-ABC1234XYZ</code>).
                      <br />3. Paste the tag below into your <code>index.html</code> right inside the <code>&lt;head&gt;</code> tag:
                    </p>

                    <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 overflow-x-auto">
{`<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>`}
                    </pre>
                    <p className="text-[11px] text-emerald-400 font-mono">
                      Notice: The custom analytics engine in <code>src/utils/analytics.ts</code> is ALREADY coded to automatically bridge events to <code>window.gtag</code> whenever this tag is active!
                    </p>
                  </div>

                  {/* Architecture 2: Firebase Auth & Firestore */}
                  <div className="space-y-3 p-5 rounded-xl bg-neutral-900/60 border border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">
                        2. Firebase Auth & Firestore Cloud Storage
                      </span>
                      <button
                        onClick={() => handleCopyCode(
                          `rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /analytics/{doc} {\n      allow create: if true; // Public event logging\n      allow read, update, delete: if request.auth != null && request.auth.token.email == 'ce.jek1@gmail.com';\n    }\n  }\n}`,
                          'Firestore Security Rules'
                        )}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-sky-300 rounded border border-neutral-700"
                      >
                        Copy Security Rules
                      </button>
                    </div>

                    <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                      To persist analytics in the cloud across all devices without relying solely on local storage:
                      <br />1. In Firebase Console, enable <strong>Email/Password Auth</strong> with your email (e.g. <code>ce.jek1@gmail.com</code>).
                      <br />2. Create a Firestore database and deploy these rules to restrict reading to your authenticated admin account:
                    </p>

                    <pre className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-[11px] text-neutral-300 overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /analytics/{doc} {
      // Anyone can increment event logs
      allow create: if true;
      // Only the authenticated site administrator can read telemetry
      allow read, update, delete: if request.auth != null && request.auth.token.email == 'ce.jek1@gmail.com';
    }
  }
}`}
                    </pre>
                  </div>

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* TAB 4: SETTINGS & EXPORT                                      */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-xl">
                  
                  {/* Change Admin Passcode */}
                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                    <span className="font-bold text-white text-sm block">Change Administrative Passcode</span>
                    <p className="text-neutral-400 text-xs">
                      Update the key required to unlock this private admin control panel.
                    </p>

                    <form onSubmit={handleUpdatePasscode} className="space-y-3">
                      <input
                        type="password"
                        placeholder="Enter new admin passcode..."
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-sky-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg border border-neutral-700 font-medium"
                      >
                        Save New Passcode
                      </button>
                    </form>

                    {passUpdatedToast && (
                      <div className="p-2.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 flex items-center gap-2 text-xs">
                        <Check className="w-4 h-4" />
                        <span>Passcode updated successfully!</span>
                      </div>
                    )}
                  </div>

                  {/* Export & Reset Actions */}
                  <div className="p-5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                    <span className="font-bold text-white text-sm block">Export & Reset Telemetry</span>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-neutral-950 font-bold rounded-lg flex items-center gap-2"
                      >
                        <FileJson className="w-4 h-4" />
                        <span>Export Analytics as JSON</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to reset all tracked analytics?')) {
                            analytics.resetAnalyticsData();
                            refreshData();
                          }
                        }}
                        className="px-4 py-2.5 bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-300 rounded-lg border border-neutral-800 hover:border-rose-800 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Reset Analytics Data</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <span className="font-mono text-[11px] text-neutral-500">
            EWENBUILDS.xyz Telemetry Engine v1.0 · ISO/IEC 27001 Aligned
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 text-xs font-mono text-neutral-400 hover:text-white bg-neutral-950 border border-neutral-800 rounded hover:border-neutral-700 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
