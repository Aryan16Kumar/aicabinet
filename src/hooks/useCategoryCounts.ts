
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CategoryCount {
  category: string;
  count: number;
}

export const useCategoryCounts = () => {
  return useQuery({
    queryKey: ['category-counts'],
    queryFn: async (): Promise<CategoryCount[]> => {
      console.log('Fetching category counts from Supabase...');
      
      const { data, error } = await supabase
        .from('Database')
        .select('category')
        .not('category', 'is', null);

      if (error) {
        console.error('Error fetching category counts:', error);
        throw error;
      }

      // Count tools per category
      const categoryCounts: { [key: string]: number } = {};
      
      data.forEach((tool) => {
        if (tool.category) {
          categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
        }
      });

      // Convert to array format
      const result = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count
      }));

      console.log('Category counts:', result);
      return result;
    },
  });
};
