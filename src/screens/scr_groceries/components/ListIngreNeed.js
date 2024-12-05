import { View, StyleSheet, ScrollView, Text } from 'react-native'
import ItemNeed from './ItemNeed'
import axios from 'axios'
import { AuthContext } from '../../../components/AuthContext'
import { useState, useContext, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import React from 'react'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ListIngreNeed() {
  const { user } = useContext(AuthContext)
  const [unavailableIngredients, setUnavailableIngredient] = useState([])
  const fetchUserDetail = async () => {
    try {
      const response = await api.get(`/users/${user.id}`)
      if (response.status === 200) {
        setUnavailableIngredient(response.data.unavailableIngredients)
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
  return (
    <View style={styles.container}>
      {unavailableIngredients.length === 0 ? (
        <Text style={styles.text_err}>Chưa có nguyên liệu nào!</Text>
      ) : (
        <ScrollView>
          {unavailableIngredients.map((ingredient, index) => (
            <ItemNeed key={index} ingredient={ingredient} onUpdate={fetchUserDetail} />
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
