import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import TextRecognition from 'react-native-text-recognition';

const windowWidth = Dimensions.get('window').width;

const Navbar = () => {
  const navigation = useNavigation();
  const [isMenuVisible, setMenuVisible] = useState(false);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
    setMenuVisible(false);
  };
  const handleCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        freeStyleCropEnabled: true,
      });

      console.log(image);

      console.log(result);
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

      //  const result = await TextRecognition.recognize(image.path);
      navigation.navigate('IngredientsCheck', {image: image});
      setMenuVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.navbar}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigateToScreen('Home')}>
          <Image
            source={require('../assets/navbar-icons/home-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Search')}>
          <Image
            source={require('../assets/navbar-icons/search-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* Barcode Icon with Modal */}
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Image
            source={require('../assets/navbar-icons/barcode-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateToScreen('IngredientsCheck')}>
          <Image
            source={require('../assets/navbar-icons/favorite-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToScreen('Profile')}>
          <Image
            source={require('../assets/navbar-icons/profile-icon.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.menuOverlay}>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={handleLibrary}
                style={styles.menuItemButton}>
                <Text style={styles.menuItemText}>Choose From Library</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCamera}
                style={styles.menuItemButton}>
                <Text style={styles.menuItemText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.menuItemText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  menuItemButton: {
    backgroundColor: 'green',
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: 'red', // You can change this color as needed
    padding: 10,
    marginVertical: 5,
    borderRadius: 20,
  },
  menuItemText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Navbar;
