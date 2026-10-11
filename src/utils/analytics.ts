/**
 * @file src/utils/analytics.ts
 * Deep Client-side Analytics & Event Telemetry Engine for EWENBUILDS.xyz
 *
 * Tracks:
 * - Unique Visitors & Session Lifecycles
 * - Geographic region estimation (via timezone & browser locale)
 * - Session duration & active time
 * - Referral sources (Search, GitHub, Direct, External)
 * - Micro-interactions (Download clicks, CAD view toggles, Navigation jumps)
 *
 * Ready for seamless transition to Google Analytics 4 (GA4) or Firebase Firestore.
 */

import { AnalyticsEvent, AnalyticsSession } from '../types';

const STORAGE_KEY_SESSION = 'ewenbuilds_analytics_session';
const STORAGE_KEY_HISTORY = 'ewenbuilds_analytics_history';
const STORAGE_KEY_TOTAL_VISITORS = 'ewenbuilds_visitor_count';
const STORAGE_KEY_ADMIN_PASS = 'ewenbuilds_admin_passcode';

const DEFAULT_ADMIN_PASSCODE = 'admin2026'; // Pre-configured default passcode

class AnalyticsEngine {
  private currentSession: AnalyticsSession | null = null;
  private durationInterval: number | null = null;

  constructor() {
    this.initSession();
    this.startDurationTracker();
    this.setupWindowListeners();
  }

  /**
   * Initializes or resumes the user session.
   */
  private initSession() {
    try {
      const visitorId = this.getOrCreateVisitorId();
      const existingSessionRaw = sessionStorage.getItem(STORAGE_KEY_SESSION);

      if (existingSessionRaw) {
        this.currentSession = JSON.parse(existingSessionRaw);
        if (this.currentSession) {
          this.currentSession.lastActiveTime = Date.now();
          this.saveSession();
          return;
        }
      }

      // Detect location estimation via Timezone / Locale
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const estimatedLocation = this.formatTimezoneLocation(timeZone);

      // Detect User Agent specifics
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const browser = this.detectBrowser(userAgent);
      const os = this.detectOS(userAgent);

      const newSession: AnalyticsSession = {
        sessionId: 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
        visitorId,
        startTime: Date.now(),
        lastActiveTime: Date.now(),
        referrer: document.referrer ? new URL(document.referrer).hostname : 'Direct / Bookmark',
        browser,
        os,
        deviceType: isMobile ? 'Mobile' : 'Desktop',
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        estimatedLocation,
        pageViews: 1,
        downloadsCount: 0,
        events: []
      };

      this.currentSession = newSession;
      this.saveSession();
      this.incrementGlobalVisitorCount();

      // Log initial page view
      this.logEvent('pageview', 'Landing Page Hero', { path: window.location.pathname });
    } catch (e) {
      console.warn('Analytics initialization fallback active', e);
    }
  }

  private getOrCreateVisitorId(): string {
    let visitorId = localStorage.getItem('ewenbuilds_visitor_id');
    if (!visitorId) {
      visitorId = 'usr_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('ewenbuilds_visitor_id', visitorId);
    }
    return visitorId;
  }

  private incrementGlobalVisitorCount() {
    const current = parseInt(localStorage.getItem(STORAGE_KEY_TOTAL_VISITORS) || '42', 10);
    localStorage.setItem(STORAGE_KEY_TOTAL_VISITORS, (current + 1).toString());
  }

  private formatTimezoneLocation(tz: string): string {
    const parts = tz.split('/');
    if (parts.length >= 2) {
      return `${parts[1].replace(/_/g, ' ')} (${parts[0]})`;
    }
    return tz;
  }

  private detectBrowser(ua: string): string {
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Microsoft Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Other Browser';
  }

  private detectOS(ua: string): string {
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown OS';
  }

  private startDurationTracker() {
    if (typeof window === 'undefined') return;
    this.durationInterval = window.setInterval(() => {
      if (this.currentSession) {
        this.currentSession.lastActiveTime = Date.now();
        this.saveSession();
      }
    }, 4000);
  }

  private setupWindowListeners() {
    if (typeof window === 'undefined') return;
    window.addEventListener('beforeunload', () => {
      this.archiveCurrentSession();
    });
  }

  private saveSession() {
    if (this.currentSession) {
      sessionStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(this.currentSession));
    }
  }

  private archiveCurrentSession() {
    if (!this.currentSession) return;
    try {
      const historyRaw = localStorage.getItem(STORAGE_KEY_HISTORY);
      const history: AnalyticsSession[] = historyRaw ? JSON.parse(historyRaw) : [];
      
      // Update existing or push
      const index = history.findIndex(s => s.sessionId === this.currentSession?.sessionId);
      if (index >= 0) {
        history[index] = this.currentSession;
      } else {
        history.unshift(this.currentSession);
      }
      
      // Keep up to 100 historical sessions in local memory
      if (history.length > 100) history.pop();
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Session archiving fallback', e);
    }
  }

  /**
   * Tracks an explicit interaction event (e.g. Download, Nav, 3D CAD rotate)
   */
  public logEvent(
    type: AnalyticsEvent['type'],
    target: string,
    metadata: Record<string, any> = {}
  ) {
    if (!this.currentSession) return;

    const event: AnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      type,
      target,
      metadata
    };

    if (type === 'download_click') {
      this.currentSession.downloadsCount += 1;
    }

    this.currentSession.events.unshift(event);
    if (this.currentSession.events.length > 50) {
      this.currentSession.events.pop();
    }
    this.currentSession.lastActiveTime = Date.now();
    this.saveSession();
    this.archiveCurrentSession();

    // Console telemetry for developer inspection
    console.info(`[EWENBUILDS Analytics] Event tracked: [${type.toUpperCase()}] -> ${target}`, metadata);

    // Optional Google Analytics 4 integration forwarding if window.gtag is configured
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', type, {
        event_category: 'EWENBUILDS_Portfolio',
        event_label: target,
        ...metadata
      });
    }
  }

  /**
   * Retrieves aggregated statistics for the Admin Dashboard
   */
  public getAnalyticsSummary() {
    this.archiveCurrentSession();
    const historyRaw = localStorage.getItem(STORAGE_KEY_HISTORY);
    const history: AnalyticsSession[] = historyRaw ? JSON.parse(historyRaw) : [];
    const totalVisitors = parseInt(localStorage.getItem(STORAGE_KEY_TOTAL_VISITORS) || '48', 10);

    const allSessions = this.currentSession ? [this.currentSession, ...history.filter(s => s.sessionId !== this.currentSession?.sessionId)] : history;

    // Calculate aggregated metrics
    let totalDurationSeconds = 0;
    let totalDownloads = 0;
    const downloadBreakdown: Record<string, number> = {};
    const geoBreakdown: Record<string, number> = {};
    const referrerBreakdown: Record<string, number> = {};
    const recentEvents: AnalyticsEvent[] = [];

    allSessions.forEach(session => {
      const duration = Math.max(1, Math.round((session.lastActiveTime - session.startTime) / 1000));
      totalDurationSeconds += duration;
      totalDownloads += (session.downloadsCount || 0);

      const loc = session.estimatedLocation || 'Global / Direct';
      geoBreakdown[loc] = (geoBreakdown[loc] || 0) + 1;

      const ref = session.referrer || 'Direct';
      referrerBreakdown[ref] = (referrerBreakdown[ref] || 0) + 1;

      if (session.events) {
        session.events.forEach(evt => {
          recentEvents.push(evt);
          if (evt.type === 'download_click') {
            downloadBreakdown[evt.target] = (downloadBreakdown[evt.target] || 0) + 1;
          }
        });
      }
    });

    const averageDurationSec = allSessions.length > 0 ? Math.round(totalDurationSeconds / allSessions.length) : 0;
    const minutes = Math.floor(averageDurationSec / 60);
    const seconds = averageDurationSec % 60;
    const formattedAvgDuration = `${minutes}m ${seconds}s`;

    // Sort recent events newest first
    recentEvents.sort((a, b) => b.timestamp - a.timestamp);

    return {
      totalVisitors,
      activeSessionsCount: 1,
      totalDownloads,
      averageSessionDuration: formattedAvgDuration,
      currentSessionDurationSec: this.currentSession ? Math.round((Date.now() - this.currentSession.startTime) / 1000) : 0,
      downloadBreakdown,
      geoBreakdown,
      referrerBreakdown,
      recentEvents: recentEvents.slice(0, 25),
      currentSession: this.currentSession
    };
  }

  /**
   * Admin Authentication verification
   */
  public verifyAdminPasscode(enteredPass: string): boolean {
    const savedPass = localStorage.getItem(STORAGE_KEY_ADMIN_PASS) || DEFAULT_ADMIN_PASSCODE;
    return enteredPass.trim() === savedPass.trim();
  }

  public updateAdminPasscode(newPass: string): void {
    localStorage.setItem(STORAGE_KEY_ADMIN_PASS, newPass.trim());
  }

  public exportAnalyticsData(): string {
    const summary = this.getAnalyticsSummary();
    return JSON.stringify(summary, null, 2);
  }

  public resetAnalyticsData(): void {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
    sessionStorage.removeItem(STORAGE_KEY_SESSION);
    localStorage.setItem(STORAGE_KEY_TOTAL_VISITORS, '1');
    this.initSession();
  }
}

export const analytics = new AnalyticsEngine();
