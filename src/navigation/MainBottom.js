import React, { Fragment } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import HomeScreen from '../screens/scr_home/scr_home'
import SearchScreen from '../screens/scr_search'
import GroceriesScreen from '../screens/scr_groceries/scr_groceries'
import AccountScreen from '../screens/scr_account/scr_account'
import DishDetail from '../screens/scr_dishDetails/scr_dishDetails'
import { useNavigation } from '@react-navigation/native'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

export default function MainBottom() {
  const navigation = useNavigation()

  return (
    <Fragment>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName
            let iconColor = focused ? '#FF9320' : 'black'
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline'
            else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline'
            else if (route.name === 'Groceries') iconName = focused ? 'cart' : 'cart-outline'
            else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline'
            return <Ionicons name={iconName} size={28} color={iconColor} />
          },
          // tabBarLabel: ({ focused }) => (
          //   <Text
          //     style={{ fontSize: 13, fontWeight: 'bold', color: focused ? '#FF9320' : 'black' }}
          //   >
          //     {route.name}
          //   </Text>
          // ),
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#F5F5F5',
            height: 70,
            paddingBottom: 20,
            paddingTop: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarItemStyle: { marginRight: 5 },
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarItemStyle: { marginRight: 60 },
          }}
        />
        <Tab.Screen name='Groceries' component={GroceriesScreen} />
        <Tab.Screen
          name='Profile'
          component={AccountScreen}
          options={{
            tabBarItemStyle: { marginLeft: 5 },
          }}
        />
      </Tab.Navigator>

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewRecipe')}>
          <Ionicons name='add' size={50} color='white' />
        </TouchableOpacity>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -35,
    zIndex: 1,
  },
  addButton: {
    backgroundColor: '#FF9320',
    width: 70,
    height: 70,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 6,
  },
})
