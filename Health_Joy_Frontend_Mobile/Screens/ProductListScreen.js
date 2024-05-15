import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Navbar from '../Components/Navbar';
import {useNavigation} from '@react-navigation/native';

const ProductListScreen = ({route}) => {
  const {category} = route.params;
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://healthjoybackendmobile20240515195922.azurewebsites.net/api/Product/GetAllProducts',
        );
        const result = await response.json();
        if (result.success) {
          setProducts(result.response);
        } else {
          console.error('API response unsuccessful:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(
    product => product.productType.toLowerCase() === category.toLowerCase(),
  );

  const handleProductPress = item => {
    const ingredients = item.ingredients.map(ingredient => ({
      name: ingredient.name,
      riskLevel: ingredient.riskLevel,
    }));

    const averageRiskLevel = calculateAverageRisk(ingredients);
    const formattedAverageRiskLevel = averageRiskLevel.toFixed(1);

    const responseData = {
      averageRiskLevel: formattedAverageRiskLevel,
      ing: ingredients,
    };

    navigation.navigate('IngredientsDetails', {
      responseData,
      flag: false,
      productName: item.name,
    });
  };

  const calculateAverageRisk = ingredients => {
    if (ingredients.length === 0) return 0;

    const totalRiskLevel = ingredients.reduce(
      (sum, ingredient) => sum + ingredient.riskLevel,
      0,
    );
    return totalRiskLevel / ingredients.length;
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>
        {category.charAt(0).toUpperCase() + category.slice(1)} List
      </Text>
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.productId.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handleProductPress(item)}>
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>{item.description}</Text>
              <Text style={styles.productRisk}>
                Total Risk Value: {item.totalRiskValue}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    padding: 10,
    backgroundColor: '#D4FAE8',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 25,
    width: 275,
    alignSelf: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  productRisk: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductListScreen;
