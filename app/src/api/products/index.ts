import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useProductList = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
          const {data, error} = await supabase.from('products').select('*');
          if (error) {
            throw new Error(error.message)
          }
          console.log(data);
          return data;
        }
      })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: async () => {
      const {data, error} = await supabase.from('products').select('*').eq('id', id).single()
      if (error) {
        throw new Error(error.message)
      }
      console.log(data);
      return data;
    }
  })
}

export const useInsertProduct = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const {data: newProduct, error} = await supabase.from('products').insert({
        name: data.name,
        image: data.image,
        price: data.price,
      })
      .single()

      if (error) {
        throw new Error(error.message)
      }

      return newProduct;
    },

    async onSuccess() {
      // invalidate queries for refetch TODO check type
      await queryCLient.invalidateQueries(['products']);
    },
  })
}

export const useUpdateProduct = () => {
  const queryCLient = useQueryClient();
  
  return useMutation({
    async mutationFn(data: any) {
      const {data: updatedProduct, error} = await supabase.from('products')
      .update({
        name: data.name,
        image: data.image,
        price: data.price,
      })
      .eq('id', data.id)
      .select()
      .single()

      if (error) {
        throw new Error(error.message)
      }

      return updatedProduct;
    },

    async onSuccess(_, { id }) {
      // invalidate queries for refetch TODO check type
      await queryCLient.invalidateQueries(['products']);
      await queryCLient.invalidateQueries(['products', id]);
    },
  })
}

export const useDeleteProduct = () => {
  const queryCLient = useQueryClient();
  
  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('products')
      .delete()
      .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }
    },

    async onSuccess() {
      // invalidate queries for refetch TODO check type
      await queryCLient.invalidateQueries(['products']);
    },
  })
}