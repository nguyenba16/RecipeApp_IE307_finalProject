import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text, Image, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Fontisto from '@expo/vector-icons/Fontisto'
import Input from '../components/Input'

export default function LoginScreen() {
  const navigation = useNavigation()
  const [value, setValue] = useState()
  const handleInput = () => {}
  const handleSignUp = () => {}
  return (
    <View style={styles.container}>
      <View style={styles.maincontent}>
        <Image source={require('../../assets/icons/logo.png')} style={styles.logo}></Image>
        <View style={styles.heading}>
          <Text style={styles.heading_title}>Đăng ký tài khoản</Text>
          <Text style={styles.desc}>Vui lòng nhập đầy đủ các thông tin sau!</Text>
        </View>
        <Input label='Tên của bạn' iconname='person' value={value} onChangeText={handleInput} />
        <Input label='Số điện thoại' iconname='phone' value={value} onChangeText={handleInput} />
        <Input label='Mật khẩu' iconname='key' value={value} onChangeText={handleInput} />
        <Input label='Nhập lại mật khẩu' iconname='key' value={value} onChangeText={handleInput} />
        <TouchableOpacity style={styles.btn} onPress={handleSignUp}>
          <Text style={styles.btnText}>Đăng ký</Text>
        </TouchableOpacity>
        <Text style={styles.desc}>
          Bạn đã có tài khoản?{' '}
          <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('LogIn')}>
            Đăng nhập ngay!
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: '#FCF5D7',
  },
  maincontent: {
    width: '80%',
    height: '80%',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 5,
  },
  heading_title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
  },
  heading: {
    marginBottom: 15,
  },
  btn: {
    width: '100%',
    height: 50,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: '#F29D38',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
