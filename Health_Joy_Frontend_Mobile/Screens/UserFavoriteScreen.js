import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import Navbar from '../Components/Navbar';
import GetAllFavoriteApi from '../Api/Favorite/GetAllFavoriteApi';
import userData from '../Global/GlobalVariable';
import {useNavigation} from '@react-navigation/native';

const UserFavoriteScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchFavoriteProducts() {
      try {
        const response = await GetAllFavoriteApi(userData.userId);
        if (response.success) {
          setFavoriteProducts(response.response);
        } else {
          console.error('Failed to fetch favorite products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      }
    }
    fetchFavoriteProducts();
  }, []);

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

  const renderProductItem = ({item}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => handleProductPress(item)}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productRisk}>
        Total Risk Value: {item.totalRiskValue}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.header}>Favorite Products</Text>
      <FlatList
        data={favoriteProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.productId.toString()}
        style={styles.productList}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    flex: 1,
    width: '100%',
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

export default UserFavoriteScreen;
