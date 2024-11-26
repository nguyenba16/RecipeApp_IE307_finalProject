import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function Ingredients({ ingredientList }) {
  return (
    <View>
      {ingredientList.map((item, index) => {
        return (
          <View key={index}>
            <View style={styles.ingredient_info}>
              <Image source={{ uri: item.imgIngredient }} style={styles.imgIngredient}></Image>
              <View style={styles.ingredient_name_box}>
                <Text style={styles.text}>{item.IngredientName}</Text>
              </View>
              <View style={styles.ingredient_mass_box}>
                <Text style={styles.text}>
                  {item.quality} {item.unit}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => alert('Add button pressed!')}
              >
                <Ionicons name='add' size={20} color='white' />
              </TouchableOpacity>
            </View>
            <View style={styles.dottedLine} />
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dottedLine: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dashed',
    width: '97%',
    opacity: 0.5,
  },
  imgIngredient: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  ingredient_info: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
    marginTop: 6,
    alignItems: 'center',
  },
  ingredient_name_box: {
    width: 150,
  },
  ingredient_mass_box: {
    width: 120,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: '#FF9320',
    width: 25,
    height: 25,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
