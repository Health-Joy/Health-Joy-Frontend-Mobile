import React from 'react';
import {View, Image, StyleSheet, Button, Text} from 'react-native';
import Navbar from '../Components/Navbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import TextRecognition from 'react-native-text-recognition';

const IngredientsCheckScreen = ({route}) => {
  const navigation = useNavigation();

  const {image} = route.params;
  const handleDecline = () => {
    navigation.navigate('Home');
  };
  const handleSubmit = async () => {
    const result = await TextRecognition.recognize(image.path);
    console.log(result);
  };
  return (
    <View style={{flex: 1}}>
      <Navbar />
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Ensure</Text>
        <Text style={styles.textMessage}>
          Your photo resembles the examples
        </Text>
        <Image source={{uri: 'file://' + image.path}} style={styles.image} />
      </View>

      <View style={styles.container}>
        <Image
          source={require('../assets/ingredients-icons/correct-image.png')}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.declineButton}
            onPress={() => {
              handleDecline();
            }}>
            <Text style={styles.text}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              handleSubmit();
            }}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Dikeyde ortalama
    alignItems: 'center', // Yatayda ortalama
    marginBottom: 100,
  },
  textTitle: {fontSize: 18, fontWeight: 'bold'},
  textMessage: {
    fontSize: 15,
  },
  textContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 30,
    width: 250,
    height: 250,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: -20,
  },
  declineButton: {
    width: 110,
    backgroundColor: '#DA3838',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    borderRadius: 20,
    marginRight: 40, // Butonlar arasındaki boşluğu kontrol etmek için ayarlayabilirsiniz
  },
  confirmButton: {
    width: 110,
    height: 60,
    backgroundColor: '#148720',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
});

export default IngredientsCheckScreen;
