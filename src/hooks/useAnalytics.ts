import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ToolAnalytics {
  id: string;
  tool_id: number;
  action_type: 'search' | 'click' | 'visit';
  search_term?: string;
  created_at: string;
}

export interface FeaturedTool {
  id: number;
  tool_name: string | null;
  tool_url: string | null;
  description: string | null;
  logo_url: string | null;
  category: string | null;
  interaction_count: number;
}

// Track tool interactions
export const useTrackInteraction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      toolId, 
      actionType, 
      searchTerm 
    }: { 
      toolId: number; 
      actionType: 'search' | 'click' | 'visit';
      searchTerm?: string;
    }) => {
      const { error } = await supabase
        .from('tool_analytics')
        .insert({
          tool_id: toolId,
          action_type: actionType,
          search_term: searchTerm,
          user_agent: navigator.userAgent,
        });

      if (error) {
        console.error('Error tracking interaction:', error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate featured tools query to refresh data
      queryClient.invalidateQueries({ queryKey: ['featured-tools'] });
    },
  });
};

// Get featured tools based on analytics
export const useFeaturedTools = () => {
  return useQuery({
    queryKey: ['featured-tools'],
    queryFn: async (): Promise<FeaturedTool[]> => {
      console.log('Fetching featured tools based on analytics...');
      
      const { data, error } = await supabase
        .rpc('get_featured_tools', { 
          days_back: 30, 
          limit_count: 6 
        });

      if (error) {
        console.error('Error fetching featured tools:', error);
        throw error;
      }

      console.log('Featured tools analytics data:', data);
      return data || [];
    },
  });
};

// Track search queries
export const useTrackSearch = () => {
  return useMutation({
    mutationFn: async ({ searchTerm }: { searchTerm: string }) => {
      // We'll track searches without a specific tool_id by using 0
      const { error } = await supabase
        .from('tool_analytics')
        .insert({
          tool_id: 0, // Use 0 for general searches
          action_type: 'search',
          search_term: searchTerm,
          user_agent: navigator.userAgent,
        });

      if (error) {
        console.error('Error tracking search:', error);
        throw error;
      }
    },
  });
};