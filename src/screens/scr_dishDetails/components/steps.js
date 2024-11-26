import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function Steps({ cookingSteps }) {
  return (
    <View>
      {cookingSteps.map((step, index) => {
        return (
          <View key={index} style={styles.stepCard}>
            <View style={styles.head}>
              <Text style={styles.title}>
                {' '}
                Bước {index + 1}/{cookingSteps.length}: {step.stepTitle}
              </Text>
            </View>
            <Image source={{ uri: step.img_step }} style={styles.img_step}></Image>
            <Text style={styles.info}>
              <Text style={styles.title_desc}>Mô tả:</Text> {step.step_desc}
            </Text>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  stepCard: { marginTop: 20 },
  head: {
    backgroundColor: '#FFEDD7',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  desc_step: {
    fontSize: 15,
  },
  img_step: {
    width: 412,
    height: 236,
    resizeMode: 'cover',
  },
  title_desc: {
    fontSize: 15,
    fontWeight: '700',
  },
  info: {
    padding: 20,
  },
})
