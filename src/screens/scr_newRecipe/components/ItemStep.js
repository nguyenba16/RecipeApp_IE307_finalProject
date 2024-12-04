import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ItemStep({ method, setmethod }) {
  const removeStep = (step) => {
    const newArray = method.filter((element) => element !== step)
    setmethod(newArray)
  }
  return (
    <View>
      {method.map((step, index) => {
        return (
          <View key={index} style={styles.stepCard}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.method_number}>
                Bước {index + 1}: {step.title}
              </Text>
              <TouchableOpacity
                onPress={() => removeStep(step)}
                style={{ justifyContent: 'center', marginLeft: 5, alignItems: 'center' }}
              >
                <Ionicons name='trash-outline' size={25} color='#FF9320' />
              </TouchableOpacity>
            </View>

            <Text style={styles.text_method}>{step.detail}</Text>
            <View style={styles.title_method}>
              <Image source={{ uri: step.image }} style={styles.upload_method} />
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
  method_number: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    textAlign: 'left',
    fontWeight: '500',
    width: '95%',
    backgroundColor: '#FFEDD7',
    borderRadius: 5,
    padding: 5,
  },
  text_title_method: {
    width: '100%',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
  upload_method: {
    width: '40%',
    height: 120,
    justifyContent: 'center',
    borderRadius: 5,
  },
  text_method: {
    fontSize: 15,
    borderRadius: 5,
    textAlignVertical: 'center',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
})
