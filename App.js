import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import MainBottom from './src/navigation/MainBottom'
import LoginScreen from './src/screens/scr_login'
import SignUpScreen from './src/screens/scr_signup'
import IntroScreen from './src/screens/scr_intro'
import NewRecipe from './src/screens/src_newRecipe';
import InfoUser from './src/screens/scr_account/scr_infouser';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LogIn' screenOptions={{headerShown: false}}>
        <Stack.Screen name='LogIn' component={LoginScreen}/>
        <Stack.Screen name='SignUp' component={SignUpScreen}/>
        <Stack.Screen name="MainBottom" component={MainBottom} />
        <Stack.Screen name="NewRecipe" component={NewRecipe} />  
        <Stack.Screen name="InfoUser" component={InfoUser} />        
      </Stack.Navigator>
    </NavigationContainer>
  );

}
