import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import ItemIngre from './components/ItemIngre'
import ItemStep from './components/ItemStep'
import { useEffect, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { AuthContext } from '../../components/AuthContext'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function NewRecipe() {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()
  const [isErrorAddIngre, setIsErrorAddIngre] = useState(false)
  const [isErrorAddStep, setIsErrorAddStep] = useState(false)
  //Kiểm soát các trường thông tin nhập vào
  const [stateShare, setStateShare] = useState(false)
  useEffect(() => {
    if (
      photo != '' &&
      nameDish != '' &&
      desc != '' &&
      servingNumber != null &&
      cookingTime != null &&
      categroryType != null &&
      ingredientList.length > 0 &&
      cookingSteps.length > 0
    ) {
      setStateShare(true)
    } else {
      setStateShare(false)
    }
  }, [
    { photo },
    { nameDish },
    { desc },
    { servingNumber },
    { cookingTime },
    { categroryType },
    { ingredientList },
    { cookingSteps },
  ])
  //Nhận đường dẫn của ảnh món ăn
  const [photo, setPhoto] = useState('')

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
      setPhoto(result.assets[0].uri)
    }
  }

  const [ingredients, setIngredients] = useState([])
  const fetchIngredients = async () => {
    try {
      const response = await api.get('/all-ingredients')
      setIngredients(response.data)
    } catch (error) {
      console.error('Error fetching ingredients:', error.message)
    }
  }
  useEffect(() => {
    fetchIngredients()
  }, [])

  const [nameDish, setNameDish] = useState('')
  const [desc, setDesc] = useState('')
  const [servingNumber, setServingNumber] = useState()
  const [cookingTime, setCookingTime] = useState()
  const [categroryType, setCategroryType] = useState()
  const [ingredient, setIngredient] = useState()

  const pickerItems = ingredients.map((item) => ({ label: item.IngredientName, value: item._id }))
  //Nhận img của từng nguyên liệu
  const [imgIngre, setImgIngre] = useState()
  //Nhận giá trị của số lượng
  const [quality, setQuality] = useState(0)
  //Nhận giá trị của đơn vị
  const [dvi, setDvi] = useState('Đơn vị')
  const handleIngredientChange = (value) => {
    ingredients.map((item) => {
      if (value === item._id) {
        setDvi(item.unit)
        setImgIngre(item.imgIngredient)
      }
    })
    setIngredient(value)
  }
  //Danh sách các nguyên liệu đã được thêm
  const [ingredientList, setIngredientList] = useState([])
  const [hadIngredient, setHadIngredient] = useState(false)
  //Thêm nguyên liệu vào danh sách
  const AddIngredient = (value) => {
    if (isNaN(quality) || !Number.isInteger(quality) || quality <= 0) {
      setHadIngredient(false)
      setIsErrorAddIngre(true)
      setQuality(0)
      return
    }
    const ingredientExists = ingredientList.some((ingredient) => ingredient.ingredientID === value)
    if (ingredientExists) {
      setHadIngredient(true)
      return
    }
    if (value != null) {
      const newIngredient = { ingredientID: value, quality: quality }
      setIsErrorAddIngre(false)
      setHadIngredient(false)
      setIngredientList([...ingredientList, newIngredient])
      setQuality(0)
      setIngredient(null)
      setStateIngre(false)
      setImgIngre(null)
      setDvi('Đơn vị')
    }
  }

  //Xóa nguyên liệu ra khỏi danh sách
  const removeIngre = (ingre) => {
    const newArray = ingredientList.filter((element) => element !== ingre)
    setIngredientList(newArray)
  }
  //Kiểm soát giá trị thêm vào mảng nguyên liệu
  const [stateIngre, setStateIngre] = useState(false)
  useEffect(() => {
    if (ingredient != null && quality != 0) {
      setIsErrorAddIngre(false)
      setStateIngre(true)
    }
  }, [{ ingredient }, { quality }])

  //Nhận giá trị của tiêu đề từng bước
  const [stepTitle, setStepTitle] = useState('')
  //Nhận đường dẫn của ảnh từng bước thực hiện
  const [img_step, setImgStep] = useState()
  const openImageMethod = async () => {
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
      setImgStep(result.assets[0].uri)
    }
  }
  //Nhận giá trị mô tả chi tiết cho từng bước
  const [stepDesc, setStepDesc] = useState('')
  //Danh sách các bước thực hiện
  const [cookingSteps, setCookingSteps] = useState([])

  const addMethodStep = () => {
    if (stepTitle == '' || stepDesc == '' || img_step == null || img_step == undefined) {
      setIsErrorAddStep(true)
    }
    if (stepTitle != '' && stepDesc != '' && img_step != null && img_step != undefined) {
      setIsErrorAddStep(false)
      const newStep = { stepTitle: stepTitle, img_step: img_step, step_desc: stepDesc }
      setCookingSteps([...cookingSteps, newStep])
    }
    setStepTitle('')
    setImgStep(null)
    setStepDesc('')
    setStaeMethod(false)
  }
  //Kiểm soát giá trị thêm vào ds các bước
  const [stateMethod, setStaeMethod] = useState(false)
  useEffect(() => {
    if (stepTitle != '' && img_step != null && stepDesc != '') {
      setIsErrorAddStep(false)
    }
  }, [{ stepTitle }, { img_step }, { stepDesc }])

  const handleSubmitRecipe = async () => {
    try {
      const formData = new FormData()
      if (photo) {
        formData.append('stepImages', {
          uri: photo,
          name: 'photo.jpg',
          type: 'image/jpeg',
        })
      }
      formData.append('createdBy', user.id)
      formData.append('nameDish', nameDish)
      formData.append('desc', desc)
      formData.append('servingNumber', servingNumber)
      formData.append('cookingTime', cookingTime)
      formData.append('categroryType', categroryType)
      formData.append('ingredientList', JSON.stringify(ingredientList))
      formData.append('cookingSteps', JSON.stringify(cookingSteps))
      const response = await api.post('/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      if (response.status === 201) {
        Alert.alert('Thêm công thức thành công', response.data.message)
        navigation.goBack()
      } else {
        Alert.alert('Thêm công thức thất bại')
      }
    } catch (error) {
      console.error('Lỗi khi gửi dữ liệu:', error.message)
      Alert.alert('Có lỗi xảy ra, thử lại sau.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={30} color='white' />
          </TouchableOpacity>
          <Text style={styles.text_create}>Thêm công thức mới</Text>
        </View>
        <TouchableOpacity
          style={stateShare ? styles.touch_share_true : styles.touch_share_false}
          disabled={!stateShare}
          onPress={handleSubmitRecipe}
        >
          <Text style={stateShare ? styles.text_touch_true : styles.text_touch_false}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <TouchableOpacity style={styles.touch_up_img} onPress={openImage}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: '102%', height: '102%', borderRadius: 5 }}
            />
          ) : (
            <View>
              <Ionicons
                style={styles.text_upload}
                name='cloud-upload-outline'
                size={30}
                color='#FF9320'
              />
              <Text style={styles.text_upload}>Tải ảnh đại diện cho món ăn của bạn</Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          style={styles.text_name}
          placeholder='Tên món ăn'
          placeholderTextColor='#CFCFCF'
          multiline={true}
          value={nameDish}
          onChangeText={setNameDish}
        />

        <TextInput
          style={styles.text_note}
          keyboardType='default'
          placeholder='Hãy viết dòng chia sẻ về món ăn của bạn!'
          placeholderTextColor='#CFCFCF'
          multiline={true}
          value={desc}
          onChangeText={setDesc}
        />

        <View style={styles.serving}>
          <Text style={styles.text_serving}>Khẩu phần</Text>
          <View style={styles.input_serving_box}>
            <TextInput
              keyboardType='number-pad'
              style={styles.input_serving}
              value={servingNumber}
              placeholder='Số khẩu phần'
              placeholderTextColor='#CFCFCF'
              onChangeText={(text) => setServingNumber(Number(text))}
            />
            <Text style={styles.text_unit_serving}>người</Text>
          </View>
        </View>

        <View style={styles.serving}>
          <Text style={styles.text_serving}>Thời gian nấu</Text>
          <View style={styles.input_serving_box}>
            <TextInput
              keyboardType='number-pad'
              style={styles.input_serving}
              placeholder='Số thời gian'
              placeholderTextColor='#CFCFCF'
              value={cookingTime}
              onChangeText={(text) => setCookingTime(Number(text))}
            />
            <Text style={styles.text_unit_serving}>phút</Text>
          </View>
        </View>

        <View style={styles.serving}>
          <Text style={styles.text_serving}>Loại món ăn</Text>
          <View style={styles.inputtext_serving}>
            <RNPickerSelect
              placeholder={{ label: 'Chọn chủ đề', value: null }}
              value={categroryType}
              onValueChange={(value) => setCategroryType(value)}
              items={[
                { label: 'Miền Bắc', value: 'Miền Bắc' },
                { label: 'Miền Nam', value: 'Miền Nam' },
                { label: 'Miền Trung', value: 'Miền Trung' },
              ]}
            />
          </View>
        </View>

        <Text style={styles.title_ingredient}>Nguyên liệu</Text>
        {ingredientList.map((ingre, index) => (
          <View key={`nl${index}`}>
            {ingredients.map((item) => {
              if (ingre.ingredientID === item._id) {
                return (
                  <ItemIngre
                    key={item._id}
                    ingredient={item}
                    quality={ingre.quality}
                    remove={() => removeIngre(ingre)}
                  />
                )
              }
            })}
          </View>
        ))}

        <View style={styles.ingredient}>
          <Image style={styles.img_ingre} source={{ uri: imgIngre }} />
          <View style={styles.text_name_ingre}>
            <RNPickerSelect
              placeholder={{ label: 'Chọn nguyên liệu', value: null }}
              value={ingredient}
              onValueChange={(value) => handleIngredientChange(value)}
              items={pickerItems}
            />
          </View>
          <TextInput
            keyboardType='number-pad'
            style={styles.text_quality}
            placeholder='0'
            value={quality.toString()}
            onChangeText={(text) => setQuality(Number(text))}
          />
          <Text style={styles.text_dvi}>{dvi}</Text>
        </View>
        {isErrorAddIngre ? (
          <Text style={styles.err_text}>Vui lòng nhập đúng và đủ các giá trị!</Text>
        ) : null}
        {hadIngredient ? <Text style={styles.err_text}>Nguyên liệu đã tồn tại!</Text> : null}

        <TouchableOpacity style={styles.add_ingre} onPress={() => AddIngredient(ingredient)}>
          <Ionicons style={styles.icon_add} name='add-outline' size={25} color='black' />
          <Text style={styles.text_add}>Thêm nguyên liệu</Text>
        </TouchableOpacity>

        <Text style={styles.title_ingredient}>Các bước thực hiện</Text>

        <ItemStep cookingSteps={cookingSteps} setCookingSteps={setCookingSteps} />
        <View style={styles.methodcook}>
          <Text style={styles.method_number}>Bước {cookingSteps.length + 1} :</Text>

          <TextInput
            style={styles.text_title_method}
            placeholder='Tóm tắt bước thực hiện'
            placeholderTextColor='#CFCFCF'
            value={stepTitle}
            onChangeText={setStepTitle}
            multiline={true}
          />
          <View style={styles.title_method}>
            <TouchableOpacity style={styles.upload_method} onPress={openImageMethod}>
              {img_step ? (
                <Image
                  source={{ uri: img_step }}
                  style={{ width: '100%', height: '100%', borderRadius: 5 }}
                />
              ) : (
                <View>
                  <Ionicons
                    style={{ textAlign: 'center' }}
                    name='cloud-upload-outline'
                    size={30}
                    color='#CFCFCF'
                  />
                </View>
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.text_method}
              placeholder='Mô tả chi tiết thực hiện'
              value={stepDesc}
              placeholderTextColor='#CFCFCF'
              onChangeText={setStepDesc}
              multiline={true}
            />
          </View>
          {isErrorAddStep ? (
            <Text style={styles.err_text}>Vui lòng nhập đúng và đủ các giá trị!</Text>
          ) : null}
          <TouchableOpacity onPress={addMethodStep} style={styles.add_method}>
            <Ionicons style={styles.icon_add} name='add-outline' size={25} color='black' />
            <Text style={styles.text_add}>Thêm bước</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    backgroundColor: '#f7f7f7',
  },
  scroll: {
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#FF9320',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text_create: {
    marginLeft: 10,
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  touch_share_true: {
    backgroundColor: 'white',
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  text_touch_true: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FF9320',
  },
  touch_share_false: {
    backgroundColor: '#DDDDDD',
    height: 35,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  err_text: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 20,
  },
  text_touch_false: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  touch_up_img: {
    height: 300,
    borderColor: '#CFCFCF',
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  text_upload: {
    textAlign: 'center',
    color: '#CFCFCF',
  },
  text_name: {
    fontSize: 18,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    textAlign: 'l',
    marginVertical: 10,
    padding: 5,
    marginHorizontal: 15,
  },
  text_note: {
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    padding: 5,
    margin: 10,
    padding: 10,
  },
  input_serving: {
    backgroundColor: '#ffffff',
    fontSize: 16,
    minWidth: 35,
  },
  text_unit_serving: {
    fontSize: 16,
    width: 50,
  },
  serving: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginHorizontal: 22,
  },
  text_serving: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  inputtext_serving: {
    fontSize: 13,
    width: 170,
    height: 35,
    color: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  input_serving_box: {
    alignItems: 'center',
    gap: 5,
    flexDirection: 'row',
    paddingHorizontal: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  title_ingredient: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 30,
    marginHorizontal: 15,
  },
  ingredient: {
    width: '90%',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 'auto',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  img_ingre: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  text_name_ingre: {
    width: '55%',
    fontSize: 15,
    alignContent: 'center',
    textAlign: 'center',
  },
  text_quality: {
    paddingHorizontal: 5,
    fontSize: 16,
    width: 70,
  },
  text_dvi: {
    fontSize: 16,
    padding: 5,
  },
  add_ingre: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon_add: {
    width: '38%',
    textAlign: 'right',
  },
  text_add: {
    width: '62%',
    fontSize: 15,
    alignSelf: 'center',
    marginLeft: 5,
  },
  methodcook: {
    width: '90%',
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
    borderRadius: 100,
    textAlignVertical: 'center',
    margin: 3,
    marginTop: 20,
    textAlign: 'left',
    fontWeight: '500',
  },
  text_title_method: {
    width: '100%',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  upload_method: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    backgroundColor: '#fff',
  },
  text_method: {
    width: '68%',
    maxHeight: 100,
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    padding: 10,
  },
  add_method: {
    marginTop: 10,
    marginBottom: 30,
    flexDirection: 'row',
  },
})
