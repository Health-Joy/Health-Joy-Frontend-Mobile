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
import userData from '../Global/GlobalVariable';

const UserProfileScreen = () => {
  const navigation = useNavigation();

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Image
        style={styles.image}
        source={require('../assets/user-page-icons/user-icon.png')}
      />
      <View style={styles.viewStyle}>

        <View style={styles.textContent}>
          <Image
            style={styles.userIcon}
            source={require('../assets/user-page-icons/username-icon.png')}
          />
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {userData.userName}
          </Text>
        </View>

        <View style={styles.textContent}>
          <Image
            style={styles.emailIcon}
            source={require('../assets/user-page-icons/email-icon.png')}
          />
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
            {userData.userEmail}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={navigateToChangePassword}>
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
    justifyContent: 'space-between',
  },
  textContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 275,
    height: 55,
    backgroundColor: '#D4FAE8',
    marginTop: 30,
    borderRadius: 100,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textPassword: {
    fontSize: 16,
    fontStyle: 'italic',
    marginHorizontal: 56,
  },
  userIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  passwordIcon: {
    width: 30,
    height: 30,
    marginRight: 25,
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    flex: 1,
    textAlign: 'center',
  },
  emailIcon: {
    width: 27,
    height: 30,
    marginRight: 10,
    //marginLeft: 8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
  },
});

export default UserProfileScreen;