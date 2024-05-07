import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';
import Navbar from '../Components/Navbar';
import CreateProductApi from '../Api/CreateProductApi';
import userData from '../Global/GlobalVariable';

const GetProductInfoScreen = () => {
  const route = useRoute();
  const { barcode } = route.params;
  const navigation = useNavigation();
  const [productName, setProductName] = useState('');
  const [userId, setuserId] = useState('');
  const [productType, setProductType] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleSave = async () => {

    setuserId(userData.userId);//user bilgisii getirilince değişecek
    console.log("sdgsdgs"+userId);
    
    setIngredients([
      'Bisphenol-A',
      'Nitrat-Nitrit',
      'Karamel'
    ]);//ocr sorunu geçince otomatik setlenecek

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
      const linesArray = Array.isArray(result) ? result : [result];
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
        <Text style={styles.inputLabel}>Product Type:</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Type"
          value={productType}
          onChangeText={setProductType}
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
      <Text style={styles.sectionTitle}>Ingredients</Text>
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
      <View>
        {ingredients.map((ingredient, index) => (
          <Text key={index}>{ingredient}</Text>
        ))}
      </View>
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
    fontSize: 16,
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
});

export default GetProductInfoScreen;
