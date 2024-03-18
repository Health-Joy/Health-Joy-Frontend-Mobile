import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Button, Text} from 'react-native';
import Navbar from '../Components/Navbar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import TextRecognition from 'react-native-text-recognition';

const IngredientsCheckScreen = ({route}) => {
  const navigation = useNavigation();
  const [uniqueWords, setUniqueWords] = useState([]);
  const {image} = route.params;

  useEffect(() => {
    const handleSubmit = async () => {
      const result = await TextRecognition.recognize(image.path);

      const linesArray = Array.isArray(result) ? result : [result];

      const wordsArray = [];
      linesArray.forEach(item => {
        const lines = item.split('\n');
        lines.forEach(line => {
          const words = line.split(/\s+/).filter(word => word !== '');
          wordsArray.push(...words);
        });
      });

      const cleanedWordsArray = wordsArray.map(word =>
        word.replace(/[.,!?]/g, ''),
      );

      const uniqueWordsSet = new Set(cleanedWordsArray);
      setUniqueWords(Array.from(uniqueWordsSet));
    };

    handleSubmit();
  }, []);

  const sendUniqueWordsToEndpoint = async () => {
    try {
      const response = await fetch(
        'https://healthjoybackendmobile20240311152807.azurewebsites.net/api/Ingredient/CalculateAverageRiskLevel',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(uniqueWords),
        },
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error('There was a problem with the ingredients:', error);
      alert(error);
    }
  };

  const handleDecline = () => {
    navigation.navigate('Home');
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
            onPress={handleDecline}>
            <Text style={styles.text}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={sendUniqueWordsToEndpoint}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    marginRight: 40,
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
