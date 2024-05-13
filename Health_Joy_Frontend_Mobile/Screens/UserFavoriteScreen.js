import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Navbar from '../Components/Navbar';
import GetAllFavoriteApi from '../Api/Favorite/GetAllFavoriteApi';
import userData from '../Global/GlobalVariable';
import { useNavigation } from '@react-navigation/native';

const UserFavoriteScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const navigation = useNavigation();
  const [Response, setResponse] = useState([]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await GetAllFavoriteApi(userData.userId); 
        setResponse(response);
        if (response.success) {
          setFavoriteProducts(response.response);
        } else {
          console.error('Failed to fetch favorite products');
        }
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const handleProductPress = (item) => {//bu kısım düzenlecenecek
    // navigation.navigate('IngredientsDetails', {
    //   responseData: Response,
    //   productId: item.productId,
    //   productName: item.name,
    //   flag: false
    // });
    };
  

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => handleProductPress(item)}>
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
        keyExtractor={(item) => item.productId.toString()}
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
