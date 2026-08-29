"use client";

export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp: number;
}

const IS_DEV = process.env.NODE_ENV === "development";

/**
 * Tracks an analytics event.
 */
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  const timestamp = Date.now();
  const eventData: AnalyticsEvent = {
    event: eventName,
    properties,
    timestamp,
  };

  // 1. Console log in development for debugging/QA audits
  if (IS_DEV) {
    console.log(`[GFN-Analytics] Event: ${eventName}`, properties);
  }

  // 2. Local session logging for QA tests
  try {
    const logsKey = "gfn_analytics_logs";
    let existingLogs = [];
    const stored = sessionStorage.getItem(logsKey);
    if (stored) {
      existingLogs = JSON.parse(stored);
    }
    existingLogs.push(eventData);
    // Keep only last 100 entries to prevent memory inflation
    if (existingLogs.length > 100) {
      existingLogs.shift();
    }
    sessionStorage.setItem(logsKey, JSON.stringify(existingLogs));
  } catch (e) {
    // Fail silently in case storage is restricted
  }

  // 3. Push to standard GA4/Gtag dataLayer if script is injected
  try {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, properties);
    }
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: eventName,
        ...properties,
      });
    }
  } catch (err) {
    // Fail silently
  }
}

/**
 * Helper to fetch local session events. Used during the verification/QA phase.
 */
export function getLoggedEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem("gfn_analytics_logs");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}
