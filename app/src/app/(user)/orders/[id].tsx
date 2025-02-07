import { useOrderDetails } from "@/api/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "@/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useUpdateOrderSubscription } from "@/api/orders/subscription";

export default function OrderDetailsScreen() {
    const { id:idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);
    const {data: order, isLoading, error} = useOrderDetails(id);

    useUpdateOrderSubscription(id); // subscribe to changes to this order

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error || !order) {
        return <Text>Failed to fetch order</Text>;
    }

    return (
        <View style={{ padding: 10, gap: 20 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList 
                data={order.order_items} 
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                contentContainerStyle={{ gap: 10 }}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    ) 
}