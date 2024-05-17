import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Navbar from '../Components/Navbar';
import { useRoute, useNavigation } from '@react-navigation/native';

const ProductNotFoundScreen = () => {
    const route = useRoute();
    const { barcode } = route.params;
    const navigation = useNavigation();


    const handlePress = () => {
        navigation.navigate('GetProduct', {barcode});
      };


    return(
    <View style={styles.container}> 
        <Navbar />
        <Text style={styles.startText}>Oops!</Text>
        <Text style={styles.text}>We couldn't find your item</Text>
        <TouchableOpacity 
            style={styles.button} 
            activeOpacity={0.8} 
            onPress={handlePress}>
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
