import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginApi from '../Api/LoginApi';
import userData from '../Global/GlobalVariable';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    validateEmail(email);
  }, [email]);

  useEffect(() => {
    validatePassword(password);
  }, [password]);

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

  const handleLogin = () => {
    if (emailError || passwordError) {
      Alert.alert('Please make sure your credentials are valid.');
      return;
    }

    setIsLoggingIn(true);

    LoginApi(email, password).then(data => {
      userData.userId = data.response.userId;
      userData.userName = data.response.userName;
      userData.userEmail = data.response.email;
      userData.userFavorites = data.response.favorites;
      console.log("user favoriler: " + userData.userFavorites);
      navigation.navigate('Home');
    })
    .catch(error => {
      console.log('There was an error with the login operation:', error);
      Alert.alert('Error', 'Username or Password Incorrect');
    })
    .finally(() => {
      setIsLoggingIn(false);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>
          Let's Help You Stay Informed and Empowered
        </Text>
        <Image
          style={styles.image}
          source={require('../assets/login-page-icons/Login_image.png')}
        />
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
        <Text style={styles.text4}>
          I forgot my <Text style={styles.text5}>Password</Text>
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleLogin}
          disabled={isLoggingIn}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.text2}>
          If you don’t have any account?{' '}
          <Text
            style={styles.text3}
            onPress={() => navigation.navigate('Registration')}>
            Create
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  image: {
    marginTop: -50,
  },
  input: {
    backgroundColor: '#D4FAE8',
    width: 265,
    height: 50,
    borderRadius: 40,
  },
  text0: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
    fontSize: 15,
    textAlign: 'center',
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
  text4: {
    backgroundColor: '#fff',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  text5: {
    color: '#148720',
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

export default LoginScreen;
