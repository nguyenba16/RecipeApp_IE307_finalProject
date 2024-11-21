import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function Steps({ cookingSteps }) {
  return (
    <View>
      {cookingSteps.map((step, index) => {
        return (
          <View key={step.id} style={styles.stepCard}>
            <View style={styles.head}>
              <Text style={styles.count_step}>Bước {step.id} </Text>
            </View>
            <Image source={step.img_step} style={styles.img_step}></Image>
            <Text style={styles.desc_box}>
              <Text style={styles.title}>Mô tả:</Text> {step.desc_step}
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
    height: 60,
    justifyContent: 'center',
    paddingLeft: 20,
  },

  count_step: {
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
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  desc_box: {
    padding: 20,
  },
})
