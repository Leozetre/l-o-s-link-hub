import { supabase } from "@/integrations/supabase/client";

// Generate or retrieve anonymous session ID
const getSessionId = (): string => {
  const key = "hub_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
};

// Detect device type
const getDeviceType = (): string => {
  const ua = navigator.userAgent;
  if (/Mobi|Android|iPhone|iPad/i.test(ua)) return "mobile";
  return "desktop";
};

// Parse UTM params from current URL
const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || null,
    utm_medium: params.get("utm_medium") || null,
    utm_campaign: params.get("utm_campaign") || null,
    utm_content: params.get("utm_content") || null,
  };
};

interface TrackEventOptions {
  event_name: string;
  button_name?: string;
  category?: string;
  href?: string;
}

// Fire-and-forget event tracking
export const trackEvent = (options: TrackEventOptions) => {
  const utms = getUtmParams();
  const payload = {
    event_name: options.event_name,
    page_path: window.location.pathname,
    button_name: options.button_name || null,
    category: options.category || null,
    href: options.href || null,
    session_id: getSessionId(),
    device_type: getDeviceType(),
    referrer: document.referrer || null,
    ...utms,
  };

  // Insert directly — fire and forget
  supabase.from("hub_events").insert(payload).then(() => {});
};

// Track page view (call once on mount)
export const trackPageView = () => {
  trackEvent({ event_name: "page_view" });
};

// Track button click and open link
export const handleTrackedClick = (
  href: string,
  buttonName: string,
  category: string
) => {
  trackEvent({
    event_name: href.startsWith("http") ? "outbound_click" : "button_click",
    button_name: buttonName,
    category,
    href,
  });
  window.open(href, "_blank", "noopener,noreferrer");
};
