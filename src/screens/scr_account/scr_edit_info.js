import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState, useContext } from 'react'
import { AuthContext } from '../../components/AuthContext'
import axios from 'axios'

import * as ImagePicker from 'expo-image-picker'
const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function EditInfo() {
  const { user, setUser } = useContext(AuthContext)
  const navigation = useNavigation()
  const [avatar, setAvatar] = useState(user.avatar_URL)
  const [name, setName] = useState(user.userName)
  const [phone, setPhone] = useState(user.phone)
  const [email, setEmail] = useState(user.email)

  const openImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setAvatar(result.assets[0].uri)
    }
  }

  const handleUpdateProfile = async () => {
    const userID = user.id
    const formData = new FormData()
    formData.append('avatar_URL', {
      uri: avatar,
      type: 'image/jpeg',
      name: 'avatar.jpg',
    })
    formData.append('userID', userID)
    formData.append('userName', name)
    formData.append('phone', phone)
    formData.append('email', email)
    try {
      const response = await api.patch('/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      const { data } = response.data
      setUser((prevUser) => ({
        ...prevUser,
        avatar_URL: data.avatar_URL,
        userName: data.userName,
        phone: data.phone,
        email: data.email,
      }))

      Alert.alert('Thành công', 'Cập nhật thông tin thành công!')
      navigation.goBack()
    } catch (error) {
      console.error('Error updating profile:', error)
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin.')
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
        <Text style={styles.text_title}>Chỉnh sửa thông tin</Text>
      </View>
      <View style={styles.info}>
        <View style={styles.background_ava}>
          <TouchableOpacity style={styles.camera} onPress={openImage}>
            <Ionicons
              style={styles.icon_camera}
              name='camera-reverse-outline'
              size={25}
              color={'#777777'}
            />
          </TouchableOpacity>
          <Image style={styles.ava} resizeMode='cover' source={{ uri: avatar }} />
        </View>

        <Text style={styles.text_title_input}>Họ và tên</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.text_input}
            placeholder='Họ và ten'
            value={name}
            onChangeText={setName}
          />
        </View>
        <Text style={styles.text_title_input}>Số điện thoại</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.text_input}
            placeholder='Số điện thoại'
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Text style={styles.text_title_input}>Email</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.text_input}
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <TouchableOpacity style={styles.btn_update} onPress={handleUpdateProfile}>
          <Text style={styles.text_btn}>Cập nhật</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  icon_back: {
    position: 'absolute',
    marginLeft: 10,
    zIndex: 50,
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#FF9320',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text_title: {
    flex: 1,
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    flex: 1,
    marginTop: 50,
    marginHorizontal: 30,
  },
  background_ava: {
    marginBottom: 30,
    alignSelf: 'center',
  },
  camera: {
    position: 'absolute',
    zIndex: 50,
    flex: 1,
    flexDirection: 'row',
    width: 45,
    height: 45,
    right: 5,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
  },
  icon_camera: {
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#EEEEEE',
    padding: 5,
  },
  ava: {
    width: 150,
    height: 150,
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
  },
  text_title_input: {
    fontSize: 15,
    fontWeight: '400',
    color: 'gray',
    marginLeft: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: '#BBBBBB',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    fontSize: 20,
  },
  text_input: {
    fontSize: 18,
    fontWeight: '400',
  },
  btn_update: {
    width: '100%',
    height: 45,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: '#F29D38',
    justifyContent: 'center',
  },
  text_btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
