import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'

const IntroScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LogIn')
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <ImageBackground
      source={require('../../assets/images/intro/intro.png')}
      style={styles.container}
    >
      <Text style={styles.text}>Welcome to</Text>
      <Image
        style={styles.appName}
        source={require('../../assets/images/intro/Recinet.png')}
      ></Image>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    fontFamily: 'Road Rage',
    marginBottom: 15,
  },
})

export default IntroScreen
