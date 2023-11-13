import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Navbar from '../Components/Navbar';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const navigateToChangeUsername = () => {
    navigation.navigate('ChangeUsername');
  };


  return (
    <View style={styles.container}>
      <Navbar />

      <Image
        style={styles.image}
        source={require('../assets/user-page-icons/user-icon.png')}
      />
      <View style={styles.viewStyle}>
        <TouchableOpacity 
        style={styles.touchableOpacity}
        onPress={navigateToChangeUsername}>
          <View style={styles.buttonContent}>
            <Image
              style={styles.userIcon}
              source={require('../assets/user-page-icons/username-icon.png')}
            />
            <Text style={styles.textUser}> Username </Text>
            <Image
              style={styles.arrowIcon}
              source={require('../assets/home-page-icons/arrow.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={navigateToChangePassword}
        >
          <View style={styles.buttonContent}>
            <Image
              style={styles.passwordIcon}
              source={require('../assets/user-page-icons/password-icon.png')}
            />
            <Text style={styles.textPassword}>Password</Text>
            <Image
              style={styles.arrowIcon}
              source={require('../assets/home-page-icons/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.textContent}>
          <Image
            style={styles.emailIcon}
            source={require('../assets/user-page-icons/email-icon.png')}
          />
          <Text style={styles.text}>Email</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  viewStyle: {},
  image: {
    width: 71,
    height: 75,
    marginTop: 120,
  },
  touchableOpacity: {
    width: 275,
    height: 55,
    backgroundColor: '#D4FAE8',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  textContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 275,
    height: 55,
    backgroundColor: '#D4FAE8',
    marginTop: 30,
    borderRadius: 100,
  },
  textPassword: {
    fontSize: 16,
    fontStyle: 'italic',
    marginHorizontal: 56,
  },
  textUser: {
    fontSize: 16,
    fontStyle: 'italic',
    marginHorizontal: 50,
  },
  userIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  passwordIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    marginHorizontal: 85,
  },
  emailIcon: {
    width: 27,
    height: 30,
  },
});

export default UserProfileScreen;
