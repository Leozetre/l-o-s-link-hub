
-- Create hub_events table for analytics tracking
CREATE TABLE public.hub_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  event_name TEXT NOT NULL,
  page_path TEXT NOT NULL DEFAULT '/',
  button_name TEXT,
  category TEXT,
  href TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  session_id TEXT NOT NULL,
  device_type TEXT NOT NULL DEFAULT 'desktop',
  referrer TEXT
);

-- Enable RLS
ALTER TABLE public.hub_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (tracking from public hub)
CREATE POLICY "Anyone can insert hub events"
ON public.hub_events
FOR INSERT
WITH CHECK (true);

-- Allow reading for dashboard (we'll gate access via password in the UI)
CREATE POLICY "Anyone can read hub events"
ON public.hub_events
FOR SELECT
USING (true);

-- Index for common dashboard queries
CREATE INDEX idx_hub_events_created_at ON public.hub_events (created_at DESC);
CREATE INDEX idx_hub_events_event_name ON public.hub_events (event_name);
CREATE INDEX idx_hub_events_session_id ON public.hub_events (session_id);
