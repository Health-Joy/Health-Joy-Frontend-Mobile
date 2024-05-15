import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  useEffect(() => {
    validateConfirmPassword(confirmPassword);
  }, [confirmPassword, password]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || re.test(email)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format');
    }
  };

  const validatePassword = (password) => {
    if (!password || password.length >= 6) {
      setPasswordError('');
    } else {
      setPasswordError('Password must be at least 6 characters');
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword === password) {
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordError('Passwords do not match');
    }
  };

  const handleRegister = () => {
    if (emailError || passwordError || confirmPasswordError) {
      Alert.alert('Error', 'Please fix the errors before registering');
      return;
    }

    fetch(
      'https://healthjoybackendmobile20240311152807.azurewebsites.net/api/User',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          fullName: fullName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      },
    )
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.Message[0]);
          });
        }
      })
      .then(data => {
        console.log('Registration successful');
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.error('There was a problem with the registration:', error);
        Alert.alert('Error', error.message);
      });
  };

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
              value={fullName}
              onChangeText={text => setFullName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              textAlign="center"
              value={email}
              onChangeText={text => setEmail(text)}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              textAlign="center"
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              textAlign="center"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
            />
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleRegister}>
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
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default RegistrationScreen;
