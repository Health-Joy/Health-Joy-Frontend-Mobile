import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const GetProductInfoScreen = () => {
  const route = useRoute();
  const { barcode } = route.params;
  const navigation = useNavigation();

  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');

  const handleSave = () => {
    //Apiye istek Kaydetme işlemi
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Barkod: {barcode.textualData}</Text>
      <TextInput
        style={styles.input}
        placeholder="Ürün Adı"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ürün Tipi"
        value={productType}
        onChangeText={setProductType}
      />
      <Button title="Kaydet" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
});

export default GetProductInfoScreen;
