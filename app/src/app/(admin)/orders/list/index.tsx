import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '../../../../components/OrderListItem';
import { useAdminOrderList } from '@/api/orders';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSubscription } from '@/api/orders/subscription';

export default function OrdersScreen() {
  const {data: orders, isLoading, error} = useAdminOrderList({ archived: false})
  
  useInsertOrderSubscription(); // subscribe to new orders
  
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch orders</Text>;
  }
  return (
    <>
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}