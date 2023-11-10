import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomePage = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.info}>Transparency at Your Fingertips</Text>
      <Text style={styles.info}>Scan to Know What's Inside!</Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={handlePress}>
        <Text style={styles.text}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },

  logo: {
    width: 250,
    height: 218,
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 20,
  },
  button: {
    width: 265,
    height: 60,
    backgroundColor: '#148720',
    borderRadius: 40,
    marginTop: 50,
    marginBottom: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  info: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 15,
  },
});

export default WelcomePage;
