
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
      
      const { data, error } = await supabase
        .from('Database')
        .select('*')
        .order('tool_name');

      if (error) {
        console.error('Error fetching tools with search:', error);
        throw error;
      }

      let filteredData = data || [];

      // Apply category filter with flexible matching
      if (category !== "All Categories") {
        filteredData = filteredData.filter(tool => {
          if (!tool.category) return false;
          // Clean and normalize category names for comparison
          const cleanToolCategory = tool.category.trim();
          return cleanToolCategory === category;
        });
      }
      
      // Apply search filter
      if (searchTerm.trim()) {
        const keywords = searchTerm.trim().toLowerCase().split(/\s+/);
        console.log('Search keywords:', keywords);
        
        filteredData = filteredData.filter(tool => {
          const searchableText = [
            tool.tool_name,
            tool.description,
            tool.category
          ].filter(Boolean).join(' ').toLowerCase();
          
          return keywords.some(keyword => searchableText.includes(keyword));
        });
      }

      console.log('Filtered tools with search:', { category, searchTerm, results: filteredData });
      return filteredData;
    },
  });
};
