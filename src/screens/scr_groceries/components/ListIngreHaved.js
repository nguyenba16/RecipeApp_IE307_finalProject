import { View, StyleSheet, Text } from 'react-native'
import ItemHaved from './ItemHaved'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { AuthContext } from '../../../components/AuthContext'
import { useState, useContext } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import React from 'react'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ListIngreHaved() {
  const { user } = useContext(AuthContext)
  const [availableIngredients, setAvailableIngredient] = useState([])

  const fetchUserDetail = async () => {
    try {
      const response = await api.get(`/users/${user.id}`)
      if (response.status === 200) {
        setAvailableIngredient(response.data.availableIngredients)
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetail()
    }, []),
  )
  console.log(availableIngredients)
  return (
    <View style={styles.container}>
      {availableIngredients.length === 0 ? (
        <Text style={styles.text_err}>Chưa có nguyên liệu nào!</Text>
      ) : (
        <ScrollView>
          {availableIngredients.map((ingredient, index) => (
            <ItemHaved key={index} ingredient={ingredient} onUpdate={fetchUserDetail} />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_err: {
    fontSize: 15,
  },
})
