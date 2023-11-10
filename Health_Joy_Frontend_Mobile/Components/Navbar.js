import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Navbar = () => {
  const navigation = useNavigation();

  const handleImageClick = () => {};

  return (
    <View style={styles.navbar}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            source={require('../assets/navbar-icons/home-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Image
            source={require('../assets/navbar-icons/search-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('TextRecognitionn')}>
          <Image
            source={require('../assets/navbar-icons/barcode-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImageClick}>
          <Image
            source={require('../assets/navbar-icons/favorite-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleImageClick}>
          <Image
            source={require('../assets/navbar-icons/profile-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    backgroundColor: '#54A75C',
    borderRadius: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 35,
    height: 35,
  },
});

export default Navbar;
