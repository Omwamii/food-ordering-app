import Button from '@/components/Button';
import { defaultPizzaImage } from '@/components/ProductListItem';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import { Stack, useLocalSearchParams } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');
    const [image, setImage] = useState('');

    const { id } = useLocalSearchParams();
    const isUpdating = !!id; // check if id is defined (to determine if creating or updating)

    const validateInput = () => {
        setErrors('');

        if (!name) {
            setErrors('Name is required');
            return false;
        }

        if(!price) {
            setErrors('Price is required');
            return false;
        }

        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number');
            return false;
        }

        return true;
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });


    if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    const onUpdate = () => {
        console.warn('Updating product');
        if (!validateInput()) {
            return;
        }
        // save values in db

        resetFields();
    }

    const onCreate = () => {
        console.warn('Creating product');
        if (!validateInput()) {
            return;
        }
        // save values in db

        resetFields();
    }

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const onDelete = () => {
        console.warn('Deleting product');
    }

    const confirmDelete = () => {
        Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
            {
                text: 'Cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            },
        ]);
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating? 'Update Product': 'Create Product' }} />
        <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} /> 
        <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="name" style={styles.input} />

        <Text style={styles.label}>Price</Text>
        <TextInput value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} keyboardType='numeric'/>

        <Text style={{ color: 'red' }}>{errors}</Text>
        <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
        {isUpdating && <Text style={styles.textButton} onPress={confirmDelete}>Delete</Text>}
    </View>
  )
}

export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    }
})