import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Fontisto from '@expo/vector-icons/Fontisto'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const Input = ({ type, label, iconname, value, onChangeText }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(type === 'password')

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible)
  }

  return (
    <View style={styles.text_input}>
      {/* Icon bên trái */}
      <View style={styles.input_icon}>
        <Fontisto name={iconname} size={25} color='gray' style={styles.icon} />
      </View>

      {/* TextInput */}
      <TextInput
        placeholder={label}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPasswordVisible}
        style={styles.input}
      />

      {/* Icon con mắt */}
      {type === 'password' && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eye_icon}>
          <MaterialIcons
            name={isPasswordVisible ? 'visibility-off' : 'visibility'}
            size={25}
            color='gray'
          />
        </TouchableOpacity>
      )}
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
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input_icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  eye_icon: {
    marginLeft: 10,
  },
})
