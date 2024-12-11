import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native'
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
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserDetail = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/users/${user.id}`)
      if (response.status === 200) {
        setUnavailableIngredient(response.data.unavailableIngredients)
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    } finally {
      setIsLoading(false)
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetail()
    }, []),
  )
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9320' />
        <Text style={styles.load_text}>Đang tải dữ liệu...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {unavailableIngredients.length === 0 ? (
        <Text style={styles.text_err}>Chưa có nguyên liệu nào!</Text>
      ) : (
        <ScrollView>
          {unavailableIngredients.map((ingredient, index) => (
            <ItemNeed
              key={index}
              id={ingredient.id}
              ingredient={ingredient}
              onUpdate={fetchUserDetail}
            />
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  load_text: {
    textAlign: 'center',
  },
  text_err: {
    fontSize: 15,
  },
})
