import { View, FlatList, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';
import { ActivityIndicator } from 'react-native';

export default function TabOneScreen() {
  const {data: products, error, isLoading} = useProductList();
  console.log("In admin index screen")

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    console.log(error)
    return <Text>Failed to load products</Text>
  }


  return (
    <FlatList 
      data={products} 
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10}}
      columnWrapperStyle={{ gap: 10}}
    />
  );
}