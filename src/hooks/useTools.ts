
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
