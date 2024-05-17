import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Picker} from "@react-native-picker/picker"; 
import { useRoute, useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import Navbar from '../Components/Navbar';
import CreateProductApi from '../Api/CreateProductApi';
import userData from '../Global/GlobalVariable';
import check_icon from '../assets/get-product-info-icons/check.png'

const GetProductInfoScreen = () => {
  const route = useRoute();
  const { barcode } = route.params;
  const navigation = useNavigation();
  const [productName, setProductName] = useState(null);
  const [userId, setuserId] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [photoSelected, setPhotoSelected] = useState(false);

  const handleSave = async () => {

    setuserId(userData.userId);

    const success = await CreateProductApi(barcode, productName, productType, description, userId, ingredients);
    if (success) {
      console.log('Product created successfully');
      navigation.navigate('Search');
    } else {
      console.log('Failed to create product');
    }
  };


  const handleCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      recognizeText(image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
      });
      recognizeText(image);
    } catch (error) {
      console.error(error);
    }
  };

  const recognizeText = async (image) => {
    try {
      const result = await TextRecognition.recognize(image.path);
      const linesArray = Array.isArray(result.text) ? result.text : [result.text];
      const wordsArray = [];
      linesArray.forEach(item => {
        const lines = item.split('\n');
        lines.forEach(line => {
          const words = line.split(/\s+/).filter(word => word !== '');
          wordsArray.push(...words);
        });
      });
      const cleanedWordsArray = wordsArray.map(word =>
        word.replace(/[.,!?]/g, ''),
      );
      const uniqueWordsSet = new Set(cleanedWordsArray);
      setIngredients(Array.from(uniqueWordsSet));
      setPhotoSelected(true);
    } catch (error) {
      console.error('Text recognition error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.label}>Barkod: {barcode}</Text>
      <Text style={styles.label}></Text>
      <Text style={styles.sectionTitle}>Product Information</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Type:</Text>
        <Picker
          selectedValue={productType}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={(itemValue) => setProductType(itemValue)}
        >
          <Picker.Item label="Select Product Type" value="" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Beverage" value="beverage" />
          <Picker.Item label="Cosmetics" value="cosmetics" />
        </Picker>
      </View>
      <View style={styles.inputIngredientsContainer}>
  <Text style={styles.inputLabel}>Ingredients:</Text>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {photoSelected && (
      <Image style={styles.logo} source={require('../assets/get-product-info-icons/check.png')} />
    )}
  </View>
</View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8} 
          onPress={handleCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.8} 
          onPress={handleLibrary}>
          <Text style={styles.buttonText}>Choose from Library</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.buttonSave} 
        activeOpacity={0.8} 
        onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {/* <View>
        {ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient}</Text>
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  inputLabel: {
    marginBottom: 5,
    fontSize: 16
  },
  inputIngredientsContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'flex-start' ,
    marginBottom: 15,
    marginRight:240,
    marginLeft: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '48%',
    height: 50,
    backgroundColor: '#148720',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonSave: {
    width: '100%',
    height: 50,
    backgroundColor: '#148720',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10, 
    marginBottom: 10, 
  },
  pickerItem: {
    fontSize: 16, 
    color: '#333', 
  },
  logo:{
    width: 30, 
    height: 30,
    marginLeft: 10
  }
});

export default GetProductInfoScreen;
