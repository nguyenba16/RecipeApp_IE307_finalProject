import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ListSavedRecipe from './components/ListSavedRecipe'
import ListSharedRecipe from './components/ListSharedRecipe'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../components/AuthContext'
import { useContext } from 'react'

const Tab = createMaterialTopTabNavigator()

export default function ProfileScreen() {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.backgroundTitle}>
        <TouchableOpacity
          onPress={() => navigation.navigate('InfoUser')}
          style={[styles.user, styles.userLayout]}
        >
          <Text style={[styles.name]}>{user.userName}</Text>
          <Text style={[styles.email]}>{user.email}</Text>
          <Image style={[styles.avatar]} resizeMode='cover' source={{ uri: user.avatar_URL }} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: { backgroundColor: '#ff9320' },
          tabBarActiveTintColor: '#ff9320',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: { textTransform: 'none', fontSize: 15, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen
          name='Công thức đã lưu'
          component={ListSavedRecipe}
          options={{ tabBarLabel: 'Công thức đã lưu ' }}
        />
        <Tab.Screen
          name='Công thức của tôi'
          component={ListSharedRecipe}
          options={{ tabBarLabel: 'Công thức của tôi' }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  backgroundTitle: {
    backgroundColor: '#ff9320',
    width: '100%',
    height: 120,
  },
  userLayout: {
    height: 70,
    position: 'relative',
  },
  user: {
    top: 40,
    left: 10,
  },
  avatar: {
    left: 10,
    borderRadius: 100,
    width: 60,
    height: 60,
  },
  name: {
    top: 5,
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    width: 500,
    height: 50,
    left: 82,
    position: 'absolute',
  },
  email: {
    top: 32,
    fontSize: 15,
    color: '#000',
    opacity: 0.5,
    alignItems: 'center',
    left: 84,
    position: 'absolute',
  },
  backgroung_setting: {
    top: 55,
    right: '3.92%',
    position: 'absolute',
  },
})
