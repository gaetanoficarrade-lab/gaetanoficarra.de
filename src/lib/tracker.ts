import { supabase } from "./supabase";

const VISITOR_KEY = "gf_visitor_id";
const SESSION_KEY = "gf_session_id";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

function generateId(): string {
  return crypto.randomUUID?.() || Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = generateId();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
}

function getSessionId(): string {
  const now = Date.now();
  const stored = sessionStorage.getItem(SESSION_KEY);
  if (stored) {
    const { id, lastActive } = JSON.parse(stored);
    if (now - lastActive < SESSION_TIMEOUT) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, lastActive: now }));
      return id;
    }
  }
  const id = generateId();
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ id, lastActive: now }));
  return id;
}

function getUTMParams(): Record<string, string | null> {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
  };
}

function getDeviceType(): string {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
}

function getBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  return "Other";
}

function getOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Other";
}

let tracked = false;

export function trackPageView(path: string) {
  // Avoid double-tracking on strict mode re-renders
  if (tracked && path === window.location.pathname) return;
  tracked = true;
  
  // Don't track admin pages
  if (path.startsWith("/admin")) return;

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const utm = getUTMParams();

  supabase.from("page_views").insert({
    visitor_id: visitorId,
    session_id: sessionId,
    path,
    referrer: document.referrer || null,
    ...utm,
    device_type: getDeviceType(),
    browser: getBrowser(),
    os: getOS(),
    screen_width: window.screen.width,
    screen_height: window.screen.height,
  }).then(() => {});
}

export function trackClick(e: MouseEvent) {
  const path = window.location.pathname;
  if (path.startsWith("/admin")) return;

  const target = e.target as HTMLElement;
  const selector = target.tagName.toLowerCase() +
    (target.id ? `#${target.id}` : "") +
    (target.className && typeof target.className === "string"
      ? `.${target.className.split(" ").filter(Boolean).slice(0, 2).join(".")}`
      : "");

  supabase.from("click_events").insert({
    visitor_id: getVisitorId(),
    session_id: getSessionId(),
    page_path: path,
    x: e.clientX / window.innerWidth, // normalized 0-1
    y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight, // normalized 0-1
    element_selector: selector.slice(0, 200),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    page_height: document.documentElement.scrollHeight,
  }).then(() => {});
}

let clickListenerActive = false;

export function initTracker() {
  if (clickListenerActive) return;
  clickListenerActive = true;
  document.addEventListener("click", trackClick, { passive: true });
}

export function cleanupTracker() {
  document.removeEventListener("click", trackClick);
  clickListenerActive = false;
}
