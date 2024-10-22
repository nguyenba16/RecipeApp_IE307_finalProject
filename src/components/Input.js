import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto'
import AntDesign from '@expo/vector-icons/AntDesign'

const Input = ({ label,iconname, value, onChangeText }) => {
  return (
    <View style={styles.text_input}>
      <View style={styles.input_icon}>
        <Fontisto name= {iconname} size={25} color='gray' style={styles.icon} />
      </View>
      <TextInput placeholder = {label}></TextInput>
    </View>
  )
}
export default Input

const styles = StyleSheet.create({
  text_input: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  input_icon: {
    margin: 10,
  },
  input: {
    height: 50,
    width: '90%',
  },
})
