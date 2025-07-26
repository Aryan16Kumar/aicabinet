-- Create table to track tool interactions
CREATE TABLE public.tool_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tool_id BIGINT NOT NULL,
  action_type TEXT NOT NULL CHECK (action_type IN ('search', 'click', 'visit')),
  search_term TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT,
  ip_address INET
);

-- Enable Row Level Security
ALTER TABLE public.tool_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts (to track interactions)
CREATE POLICY "Enable anonymous inserts for analytics" 
ON public.tool_analytics 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public reads (for calculating featured tools)
CREATE POLICY "Enable public reads for analytics" 
ON public.tool_analytics 
FOR SELECT 
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_tool_analytics_tool_id ON public.tool_analytics(tool_id);
CREATE INDEX idx_tool_analytics_action_type ON public.tool_analytics(action_type);
CREATE INDEX idx_tool_analytics_created_at ON public.tool_analytics(created_at);

-- Create function to get featured tools (most popular in last 30 days)
CREATE OR REPLACE FUNCTION get_featured_tools(days_back INTEGER DEFAULT 30, limit_count INTEGER DEFAULT 6)
RETURNS TABLE (
  id BIGINT,
  tool_name TEXT,
  tool_url TEXT,
  description TEXT,
  logo_url TEXT,
  category TEXT,
  interaction_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    d.id,
    d.tool_name,
    d.tool_url,
    d.description,
    d.logo_url,
    d.category,
    COALESCE(analytics.interaction_count, 0) as interaction_count
  FROM public."Database" d
  LEFT JOIN (
    SELECT 
      tool_id,
      COUNT(*) as interaction_count
    FROM public.tool_analytics
    WHERE created_at >= NOW() - (days_back || ' days')::INTERVAL
      AND action_type IN ('click', 'visit')
    GROUP BY tool_id
  ) analytics ON d.id = analytics.tool_id
  ORDER BY 
    COALESCE(analytics.interaction_count, 0) DESC,
    d.tool_name ASC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;