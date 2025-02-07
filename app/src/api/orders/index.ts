import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { InsertTables, UpdateTables } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useAdminOrderList = ({ archived = false }) => {
    const statuses = archived ? ['Delivered'] : ['New', 'Cooking', 'Delivering'];  

    return useQuery({
        queryKey: ['orders', { archived}],
        queryFn: async () => {
          const {data, error} = await supabase
          .from('orders')
          .select('*')
          .in('status', statuses)
          .order('created_at', { ascending: false });

          if (error) {
            throw new Error(error.message)
          }
          console.log(data);
          return data;
        }
      })
}

export const useMyOrderList = () => {
    const { session } = useAuth();
    const id = session?.user.id;

    return useQuery({
        queryKey: ['orders', { userId: id }],
        queryFn: async () => {
          if (!id) {
            return null;
          }
          
          const {data, error} = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', id)
          .order('created_at', { ascending: false });

          if (error) {
            throw new Error(error.message)
          }
          console.log(data);
          return data;
        }
    })
}

export const useOrderDetails = (id: number) => {
    return useQuery({
      queryKey: ['orders', id],
      queryFn: async () => {
        const {data, error} = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single()

        if (error) {
            console.log('Error fetching order details: ',error);
          throw new Error(error.message)
        }

        // console.log(data);
        return data;
      }
    })
  }

  export const useInsertOrder = () => {
    const queryCLient = useQueryClient();
    const { session } = useAuth();
    const userId = session?.user.id;

    console.log("LOADING useInsertOrder .....")

    return useMutation({
      async mutationFn(data: InsertTables<'orders'>) {
        if (!userId) {
          console.log("No user id");
          throw new Error("User ID is null");
        }

        const {data: newProduct, error} = await supabase
        .from('orders')
        .insert({...data, user_id: userId })
        .select()
        .single();
  
        if (error) {
          throw new Error(error.message)
        }
  
        return newProduct;
      },
  
      async onSuccess() {
        // invalidate queries for refetch TODO check type
        await queryCLient.invalidateQueries({queryKey: ['orders']});
      },
    })
  }

  export const useUpdateOrder = () => {
    const queryCLient = useQueryClient();
    
    return useMutation({
      async mutationFn({ id, updatedFields }: {id: number, updatedFields: UpdateTables<'orders'>}) {
        const {data: updatedOrder, error} = await supabase
        .from('orders')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single()
  
        if (error) {
          throw new Error(error.message)
        }
  
        return updatedOrder;
      },
  
      async onSuccess(_, { id }) {
        // invalidate queries for refetch TODO check type
        await queryCLient.invalidateQueries({queryKey: ['orders'] });
        await queryCLient.invalidateQueries({queryKey: ['orders', id]});
      },
    })
  }