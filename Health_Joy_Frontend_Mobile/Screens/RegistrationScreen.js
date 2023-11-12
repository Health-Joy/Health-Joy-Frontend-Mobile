import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text1}>Welcome On Board</Text>
          <Text style={styles.text2}>
            Let's Help You Stay Informed and Empowered
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your fullname"
              textAlign="center"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              textAlign="center"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              textAlign="center"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              textAlign="center"
            />
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.text2}>
            Already have an account?{' '}
            <Text
              style={styles.text3}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#D4FAE8',
    width: 265,
    height: 50,
    borderRadius: 40,
  },
  text1: {
    backgroundColor: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    margin: 100,
    marginTop: 150,
  },
  text2: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
    fontSize: 15,
    margin: 80,
    marginTop: -70,
    textAlign: 'center',
  },
  text3: {
    color: '#148720',
    fontWeight: 'bold',
    fontSize: 15,
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
});

export default RegistrationScreen;
