import { supabase } from "@/integrations/supabase/client";

export const trackClick = (linkName: string, linkCategory: string) => {
  // Fire and forget — don't block navigation
  supabase.functions.invoke("track-click", {
    body: { link_name: linkName, link_category: linkCategory },
  }).catch(() => {
    // Silent fail — tracking should never break UX
  });
};

export const handleTrackedClick = (
  href: string,
  linkName: string,
  linkCategory: string
) => {
  trackClick(linkName, linkCategory);
  window.open(href, "_blank", "noopener,noreferrer");
};
