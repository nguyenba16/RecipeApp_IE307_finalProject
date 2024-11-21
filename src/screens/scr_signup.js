import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Input from '../components/Input'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [userName, setUsername] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [reEnterPassword, setReEnterPassword] = useState()

  const handleNameChange = (value) => {
    setUsername(value)
  }
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value)
  }
  const handleEmailChange = (value) => {
    setEmail(value)
  }
  const handlePasswordChange = (value) => {
    setPassword(value)
  }
  const handleReEnterPassword = (value) => {
    setReEnterPassword(value)
  }

  const handleSignUp = async () => {
    if (!userName || !phoneNumber || !email || !password || !reEnterPassword) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    if (!emailRegex.test(email)) {
      setEmail("")
      alert('Vui lòng nhập lại Email của bạn!');
      return;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumber("")
      alert('Vui lòng nhập lại số điện thoại của bạn!');
      return;
    }
    if (password !== reEnterPassword) {
      setReEnterPassword("")
      alert('Mật khẩu nhập lại chưa giống!');
      return;
    }
    try {
      const response = await api.post('/signup', {
        email,
        phone: phoneNumber,
        password,
        userName,
        avatar_URL: '', 
      });
  
      if (response.status === 201) {
        alert('Sign Up successfully!');
        navigation.navigate('LogIn');
      } else {
        alert('Sign Up failed, please try again!');
      }
    } catch (error) {
      console.error('Sign Up Error:', error);
      alert('Error during sign up. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.maincontent}>
        <Image source={require('../../assets/icons/logo.png')} style={styles.logo}></Image>
        <View style={styles.heading}>
          <Text style={styles.heading_title}>Đăng ký tài khoản</Text>
          <Text style={styles.desc}>Vui lòng nhập đầy đủ các thông tin sau!</Text>
        </View>
        <Input
          label='Tên của bạn'
          iconname='person'
          value={userName}
          onChangeText={handleNameChange}
        />
        <Input
          label='Số điện thoại'
          iconname='phone'
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
        <Input label='Email' iconname='email' value={email} onChangeText={handleEmailChange} />
        <Input
          label='Mật khẩu'
          iconname='key'
          value={password}
          onChangeText={handlePasswordChange}
        />
        <Input
          label='Nhập lại mật khẩu'
          iconname='key'
          value={reEnterPassword}
          onChangeText={handleReEnterPassword}
        />

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
    height: '90%',
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
