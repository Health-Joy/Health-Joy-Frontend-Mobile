import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert
} from 'react-native';
import Navbar from '../Components/Navbar';
import userData from '../Global/GlobalVariable';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      const userID = userData.userId;
      const response = await fetch(`https://healthjoybackendmobile20240311152807.azurewebsites.net/api/User/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmNewPassword,
        }),
      });
      
      if (response.status !== 200) {
        throw new Error('Something went wrong!');
      }
      Alert.alert('Success', 'Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return(
    <View style={styles.container}>
      <Navbar />
      <Image
        style={styles.image}
        source={require('../assets/change-password-icons/key-icon.png')}
      />
      <View style={styles.viewStyle}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your current password"
            textAlign="center"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            textAlign="center"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm your new password"
            textAlign="center"
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleChangePassword}
        >
          <Text style={styles.text}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  viewStyle:{
    marginTop:20,
  },
  image: {
    width: 69,
    height: 75,
    marginTop: 120,
  },
  inputContainer: {
    width: 275,
    height: 55,
    backgroundColor: '#D4FAE8',
    margin: 10,
    borderRadius: 100,
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    width: 110,
    height: 60,
    backgroundColor: '#148720',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginLeft: 85,
    borderRadius: 20,
  },
  text:{
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
