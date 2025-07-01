
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Tool {
  id: number;
  tool_name: string | null;
  tool_url: string | null;
  description: string | null;
  logo_url: string | null;
  category: string | null;
}

export const useTools = () => {
  return useQuery({
    queryKey: ['tools'],
    queryFn: async (): Promise<Tool[]> => {
      console.log('Fetching tools from Supabase...');
      
      const { data, error } = await supabase
        .from('Database')
        .select('*')
        .order('tool_name');

      if (error) {
        console.error('Error fetching tools:', error);
        throw error;
      }

      console.log('Fetched tools:', data);
      return data || [];
    },
  });
};

export const useToolsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['tools', category],
    queryFn: async (): Promise<Tool[]> => {
      console.log('Fetching tools for category:', category);
      
      let query = supabase.from('Database').select('*').order('tool_name');
      
      if (category !== "All Categories") {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tools by category:', error);
        throw error;
      }

      console.log('Fetched tools for category:', category, data);
      return data || [];
    },
  });
};

export const useToolsWithSearch = (category: string, searchTerm: string = "") => {
  return useQuery({
    queryKey: ['tools', category, searchTerm],
    queryFn: async (): Promise<Tool[]> => {
      console.log('Fetching tools with search:', { category, searchTerm });
      
      let query = supabase.from('Database').select('*');
      
      // Apply category filter
      if (category !== "All Categories") {
        query = query.eq('category', category);
      }
      
      // Apply search filter with multiple keyword support
      if (searchTerm.trim()) {
        // Split search term into individual keywords
        const keywords = searchTerm.trim().split(/\s+/);
        console.log('Search keywords:', keywords);
        
        // Create OR conditions for each keyword across all searchable fields
        const searchConditions = keywords.map(keyword => {
          const escapedKeyword = keyword.replace(/[%_]/g, '\\$&'); // Escape special characters
          return `tool_name.ilike.%${escapedKeyword}%,description.ilike.%${escapedKeyword}%,category.ilike.%${escapedKeyword}%`;
        });
        
        // Join all conditions with OR logic
        const combinedCondition = searchConditions.join(',');
        query = query.or(combinedCondition);
      }
      
      query = query.order('tool_name');

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching tools with search:', error);
        throw error;
      }

      console.log('Fetched tools with search:', { category, searchTerm, results: data });
      return data || [];
    },
  });
};
