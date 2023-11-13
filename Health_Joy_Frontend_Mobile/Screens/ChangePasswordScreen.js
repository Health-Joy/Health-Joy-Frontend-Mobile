import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput
} from 'react-native';
import Navbar from '../Components/Navbar';

const ChangePasswordScreen = () => {

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
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              textAlign="center"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              textAlign="center"
            />
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.8} >
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