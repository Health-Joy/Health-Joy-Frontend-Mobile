import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import Navbar from '../Components/Navbar';
import {useNavigation} from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Product/GetAllProducts',
        );
        const result = await response.json();
        if (result.success) {
          setData(result.response);
          setFilteredData(result.response);
        } else {
          console.error('API response unsuccessful:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(data);
    } else {
      const newData = data.filter(item =>
        item.name
          .toLocaleLowerCase('tr')
          .includes(searchText.toLocaleLowerCase('tr')),
      );
      setFilteredData(newData);
    }
  }, [searchText, data]);

  const navigateToIngredients = item => {
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
      <TouchableOpacity style={styles.touchableOpacity}>
        {/* Search bar */}
      </TouchableOpacity>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.barcodeNo.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigateToIngredients(item)}>
            <Text style={styles.itemText}>{item.name}</Text>
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
  },
  touchableOpacity: {
    width: 275,
    height: 55,
    backgroundColor: '#D4FAE8',
    borderRadius: 100,
    marginTop: 120,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
  },
  textSearch: {
    flex: 1,
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'left',
    textAlignVertical: 'center',
    paddingVertical: 0,
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#D4FAE8',
    marginVertical: 5,
    borderRadius: 25,
    width: 275,
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});

export default SearchScreen;
