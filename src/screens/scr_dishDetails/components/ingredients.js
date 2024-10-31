import React from 'react'
import { useState } from 'react-native'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
export default function Ingredients({ dish_ingredient }) {
  return (
    <View>
      {dish_ingredient.map((item, index) => {
        return (
          <View key={index} style={styles.ingredient_box}>
            <View style={styles.ingredient_info}>
              <View style={styles.ingredient_name_box}>
                <Text style={styles.text}>{item.ingredient_name}</Text>
              </View>
              <View style={styles.ingredient_mass_box}>
                <Text style={styles.text}>{item.mass}</Text>
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
  ingredient_box: {},
  ingredient_info: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
    marginTop: 6,
    alignItems: 'center'
  },
  ingredient_name_box: {
    width: 200,
  },
  ingredient_mass_box: {
    width: 110,
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
