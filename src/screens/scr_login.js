import React, { useState, useContext } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { AuthContext } from '../components/AuthContext'
const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function LoginScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const { logIn } = useContext(AuthContext)
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')

  // Kiểm tra email hợp lệ
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleEmailChange = (value) => {
    setEmail(value)
    if (!validateEmail(value)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }
  const handlePasswordChange = (value) => {
    setPassword(value)
  }
  const handleLogIn = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập thông tin email và mật khẩu của bạn!')
      return
    }
    try {
      const response = await api.post('/signin', { email, password })
      if (response.status === 200) {
        const { token, user } = response.data
        await AsyncStorage.setItem('token', token)
        logIn(user)
        Alert.alert('Thành công', 'Chúc mừng bạn đăng nhập thành công!')
        console.log(user)
        setEmail('')
        setPassword('')
        navigation.navigate('MainBottom', { user, token })
      }
    } catch (error) {
      setEmail('')
      setPassword('')
      Alert.alert('Lỗi', 'Mật khẩu hoặc email không đúng. Vui lòng nhập lại!')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.maincontent}>
        <Image source={require('../../assets/icons/logo.png')} style={styles.logo} />
        <View style={styles.heading}>
          <Text style={styles.heading_title}>Đăng nhập ngay</Text>
          <Text style={styles.desc}>Món ngon mỗi ngày</Text>
        </View>
        <Input
          type='text'
          label='Email'
          iconname='email'
          value={email}
          onChangeText={handleEmailChange}
        />
        <Input
          type='password'
          label='Mật khẩu'
          iconname='key'
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity style={styles.btn} onPress={handleLogIn}>
          <Text style={styles.btnText}>Đăng nhập</Text>
        </TouchableOpacity>
        <Text style={styles.desc}>
          Bạn chưa có tài khoản?{' '}
          <Text style={{ fontWeight: 'bold' }} onPress={() => navigation.navigate('SignUp')}>
            Đăng kí ngay!
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
    height: '70%',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 100,
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
