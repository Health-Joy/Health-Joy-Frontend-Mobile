import React from 'react';
import Navbar from '../Components/Navbar';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Search = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <TouchableOpacity style={styles.touchableOpacity}>
        <View style={styles.inputContent}>
          <TextInput
            style={styles.textSearch}
            placeholder="Search"
            textAlign="center"
          />
          <Image
            style={styles.cosmeticIcon}
            source={require('../assets/search.png')}
          />
        </View>
      </TouchableOpacity>
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
    textAlign: 'center',
  },
  searchIcon: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
});

export default Search;
