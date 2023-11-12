/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import HomePage from './Screens/HomePage';
import Login from './Screens/Login';
import Registration from './Screens/Registration';
import CircleShape from './Components/CircleShape';
import WelcomePage from './Screens/WelcomePage';
import Search from './Screens/Search';
import TextRecognitionn from './Screens/TextRecognitionn';
import IngredientsCheckScreen from './Screens/IngredientsCheckScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Get Started"
            component={WelcomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="TextRecognitionn"
            component={TextRecognitionn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IngredientsCheck"
            component={IngredientsCheckScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <CircleShape />
    </View>
  );
}
