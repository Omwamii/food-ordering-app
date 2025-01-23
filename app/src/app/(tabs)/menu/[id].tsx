import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Product { id }</Text>
    </View>
  )
}

export default ProductDetailsScreen;