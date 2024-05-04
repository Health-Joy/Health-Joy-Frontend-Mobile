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

const SearchScreen = () => {
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

  return (
    <View style={styles.container}>
      <Navbar />
      <TouchableOpacity style={styles.touchableOpacity}>
        <View style={styles.inputContent}>
          <TextInput
            style={styles.textSearch}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            textAlign="left"
            textAlignVertical="center"
          />
          <Image
            style={styles.searchIcon}
            source={require('../assets/search-page-icons/search-icon.png')}
          />
        </View>
      </TouchableOpacity>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.productId.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
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
