import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useInsertOrderItems = () => {
  const queryCLient = useQueryClient();
  
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const {data: newProduct, error} = await supabase
      .from('order_items')
      .insert(items)
      .select();

      if (error) {
        throw new Error(error.message)
      }

      return newProduct;
    },
  })
  };