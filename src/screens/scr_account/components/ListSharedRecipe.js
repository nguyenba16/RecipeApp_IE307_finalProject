import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MyItemRecipe from './myrecipeItem'
import { ScrollView } from 'react-native'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../components/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ListSharedRecipe() {
  const { user } = useContext(AuthContext)
  const [hasRecipes, setHasRecipes] = useState(true)
  const [myRecipes, setMyRecipes] = useState([])

  const fetchMyRecipes = async () => {
    const userID = user.id
    try {
      const recipes = await api.get(`/my-recipes/${userID}`)
      if (recipes) {
        setHasRecipes(true)
        setMyRecipes(recipes.data)
      } else {
        setHasRecipes(false)
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchMyRecipes()
    }, []) 
  )
  return (
    <View style={styles.container}>
      {!hasRecipes ? (
        <View>
          <Text style={styles.text_err}>Bạn chưa có công thức nào nào!</Text>
        </View>
      ) : (
        <ScrollView>
          {myRecipes.map((recipe, index) => (
            <MyItemRecipe key={index} Recipe={recipe} />
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
