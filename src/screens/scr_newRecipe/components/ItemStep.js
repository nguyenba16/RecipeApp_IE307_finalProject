import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ItemStep({ cookingSteps, setCookingSteps }) {
  const removeStep = (step) => {
    const newArray = cookingSteps.filter((element) => element !== step)
    setCookingSteps(newArray)
  }
  return (
    <View>
      {cookingSteps.map((step, index) => {
        return (
          <View key={index} style={styles.stepCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.stepNumber}>
                Bước {index + 1}: {step.stepTitle}
              </Text>
              <TouchableOpacity
                onPress={() => removeStep(step)}
                style={{ justifyContent: 'center', marginLeft: 5, alignItems: 'center' }}
              >
                <Ionicons name='trash-outline' size={25} color='red' />
              </TouchableOpacity>
            </View>
            <View style={styles.info_step}>
              <Image source={{ uri: step.img_step }} style={styles.img} />
              <Text style={styles.text_method}>{step.step_desc}</Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  stepCard: {
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  methodcook: {
    width: '90%',
    marginTop: 30,
    marginHorizontal: 20,
  },
  title_method: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    fontSize: 15,
    marginTop: 5,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    width: '95%',
    backgroundColor: '#FFEDD7',
    borderRadius: 5,
    padding: 5,
  },
  img: {
    width: '40%',
    height: 120,
    justifyContent: 'center',
    borderRadius: 5,
  },
  text_method: {
    width: '60%',
    fontSize: 15,
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingHorizontal: 5,
  },
  info_step: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 5,
    gap: 10,
    justifyContent: 'space-between',
  },
})
