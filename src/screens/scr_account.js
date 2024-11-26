import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ProfileScreen() {
  const [recipes, setRecipes] = useState([])
  const navigation = useNavigation()

  // Function to fetch data
  const fetchMyRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem('token') // Retrieve token from AsyncStorage
      if (!token) {
        console.error('No token found')
        return
      }
      const response = await api.get('/my-recipes', {
        // Use 'api' instance for axios request
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setRecipes(response.data) // Update recipes state
    } catch (error) {
      console.error('Error fetching my recipes:', error)
    }
  }

  useEffect(() => {
    fetchMyRecipes() // Call the function when the component is rendered
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token') // Remove token on logout
    navigation.navigate('LogIn') // Navigate to login screen
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      {/* Display recipes list */}
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <View key={index} style={styles.recipeItem}>
            <Text style={styles.recipeTitle}>{recipe.nameDish}</Text>
            <Text>{recipe.desc}</Text>
          </View>
        ))
      ) : (
        <Text>No recipes found.</Text>
      )}

      <Button title='Đăng xuất' onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})
