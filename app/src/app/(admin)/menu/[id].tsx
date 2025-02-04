import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products';
import { defaultPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const { addItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Details' + id}} />
        <Text>Product not found</Text>
      </View>
    )
  }

  const addToCart = () => {
    addItem(product, selectedSize)
    router.push('/cart');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
  price: {
    fontSize: 10,
    fontWeight: 'bold',
  },
})

export default ProductDetailsScreen;
