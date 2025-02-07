import { Image, Text, StyleSheet, Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { Product, Tables} from "@/types";
import { Link, useSegments } from "expo-router";
import RemoteImage from "./RemoteImage";

type ProductListItemProps = {
    product: Tables<'products'>; // type should reference the products table
}

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

export default function ProductListItem ({ product }: ProductListItemProps) {
  // const segments = useSegments();

    return (
      <Link href={`./menu/${product.id}`} asChild>
              <Pressable style={styles.container}>
                <RemoteImage path={product.image} fallback={defaultPizzaImage} style={styles.image} />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
              </Pressable>
      </Link>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 20,
      flex: 1,
      maxWidth: '50%',
    },
    image: {
      width: "100%",
      aspectRatio: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 10,
    },
    price: {
      color: Colors.light.tint,
      fontWeight: "bold",
    },
  });