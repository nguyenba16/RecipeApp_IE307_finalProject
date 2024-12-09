import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import ItemRecipe from '../../../components/ItemRecipe'
import { ScrollView } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../components/AuthContext'
import axios from 'axios'
import { useFocusEffect } from '@react-navigation/native'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ListSavedRecipe() {
  const { user } = useContext(AuthContext)
  const [hasRecipes, setHasRecipes] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState([])

  const fetchSavedRecipes = async () => {
    const userID = user.id
    try {
      const recipes = await api.get(`/saved-recipes/${userID}`)
      if (recipes) {
        setHasRecipes(true)
        setSavedRecipes(recipes.data)
      } else {
        setHasRecipes(false)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedRecipes()
    }, [savedRecipes]),
  )
  return (
    <View style={styles.container}>
      {!hasRecipes ? (
        <View>
          <Text style={styles.text_err}>Bạn chưa có công thức nào!</Text>
        </View>
      ) : (
        <ScrollView>
          {savedRecipes.map((recipe, index) => (
            <ItemRecipe key={index} Recipe={recipe} />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  text_err: {
    fontSize: 15,
    textAlign: 'center',
  },
})
