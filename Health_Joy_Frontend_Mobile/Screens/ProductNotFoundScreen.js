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

const ProductNotFoundScreen = () => {

    return(
    <View style={styles.container}> 
        <Navbar />
        <Text style={styles.startText}>Oops!</Text>
        <Text style={styles.text}>We couldn't find your item</Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.8} >
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        <Text style={styles.text}>Do you want to help us?</Text>

    </View>

    );

};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    startText:{
        fontSize: 32,
        color: '#000000',
        marginTop: 200,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    text:{
        fontSize: 14,
        color: '#000000',
        marginTop: 10,
        fontWeight: 'bold',
    },
    button:{
        width: 265,
        height: 60,
        backgroundColor: '#148720',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 20,
    },
    buttonText:{
        color: 'white',
        fontWeight: 'bold',
    },


});



export default ProductNotFoundScreen;
