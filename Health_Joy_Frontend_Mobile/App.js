import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import CircleShape from './Components/CircleShape';
import IngredientsCheckScreen from './Screens/IngredientsCheckScreen';
import LoginScreen from './Screens/LoginScreen';
import SearchScreen from './Screens/SearchScreen';
import HomePageScreen from './Screens/HomePageScreen';
import RegistrationScreen from './Screens/RegistrationScreen';
import WelcomePageScreen from './Screens/WelcomePageScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import ChangePasswordScreen from './Screens/ChangePasswordScreen';
import ChangeUsernameScreen from './Screens/ChangeUsernameScreen';
import ProductNotFoundScreen from './Screens/ProductNotFoundScreen';
import IngredientsScreen from './Screens/IngredientsScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Get Started"
            component={WelcomePageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={HomePageScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IngredientsCheck"
            component={IngredientsCheckScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Profile"
            component={UserProfileScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChangeUsername"
            component={ChangeUsernameScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ProductNotFound"
            component={ProductNotFoundScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="IngredientsDetails"
            component={IngredientsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <CircleShape />
    </View>
  );
}
