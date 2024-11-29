import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import ItemIngre from './components/ItemIngre'
import ItemStep from './components/ItemStep'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function NewRecipe() {
  const naviagtion = useNavigation()
  //Kiểm soát các trường thông tin nhập vào
  const [stateShare, setStateShare] = useState(false)  
  useEffect(() => {
    if (photo!='' && nameDish !='' && desc != '' && serving != null  &&
      timecook != null && cate != null && ListAddIngre.length > 0 && method.length > 0
    ) {
      setStateShare(true);
    } else {
      setStateShare(false);
    }
  }, [{photo}, {nameDish}, {desc}, {serving}, {timecook}, {cate}, {ListAddIngre}, {method}  ]);
  
  
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
      console.log(photo)
    }
  }
  const ListIngre = [
    {
      key: 1,
      name: 'Ngữ vị hương',
      dvi: 'kg',
      img: require('../../../assets/icons/logo.png'),
    },
    {
      key: 2,
      name: 'Cá',
      dvi: 'kg',
      img: require('../../../assets/icons/logo.png'),
    },
    {
      key: 3,
      name: 'Rau',
      dvi: 'kg',
      img: require('../../../assets/icons/logo.png'),
    },
    {
      key: 4,
      name: 'Đường',
      dvi: 'kg',
      img: require('../../../assets/icons/logo.png'),
    },
    {
      key: 5,
      name: 'Muối',
      dvi: 'gam',
      img: require('../../../assets/icons/logo.png'),
    },
  ]

  //Nhận giá trị của tên món ăn
  const [nameDish, setNameDish] = useState('')

  //Nhận giá trị của mô tả
  const [desc, setDesc] = useState('')

  //Nhận giá trị khẩu phần ăn
  const [serving, setServing] = useState(null)

  //Nhận giá trị thời gian nấu
  const [timecook, setTimecook] = useState(null)

  //Nhận giá trị loại gian nấu
  const [cate, setCate] = useState(null)

  //Nhận mảng các nguyên liệu
  const [ingredient, setIngredient] = useState()
  const pickerItems = ListIngre.map((item) => ({ label: item.name, value: item.key }))
  //Nhận img của từng nguyên liệu
  const [imgIngre, setImgIngre] = useState()
  //Nhận giá trị của số lượng
  const [quality, setQuality] = useState(0)
  //Nhận giá trị của đơn vị
  const [dvi, setDvi] = useState('Đơn vị')
  const handleIngredientChange = (value) => {
    ListIngre.map((item) => {
      if (value === item.key) {
        setDvi(item.dvi)
        setImgIngre(item.img)
      }
    })
    setIngredient(value)
  }
  //Danh sách các nguyên liệu đã được thêm
  const [ListAddIngre, setListAddIngre] = useState([])
  //Thêm nguyên liệu vào danh sách
  const AddIngredient = (value) => {
    if (value != null) {
      const newIngredient = {id: value, quality: quality}
      setListAddIngre([...ListAddIngre, newIngredient]) // Đặt lại các giá trị sau khi thêm
      setIngredient(null)
      setQuality(0)
      setStateIngre(false)
    }    
  }
  //Xóa nguyên liệu ra khỏi danh sách
  const removeIngre = (ingre) => {
    const newArray = ListAddIngre.filter((element) => element !== ingre)
    setListAddIngre(newArray);
  }
  //Kiểm soát giá trị thêm vào mảng nguyên liệu
  const [stateIngre, setStateIngre] = useState(false)
  useEffect(() => {
    if(ingredient!=null && quality!=0){
      setStateIngre(true)
    }
  }, [{ingredient}, {quality}]);
  
  //Nhận giá trị của tiêu đề từng bước
  const [titleMethod, setTitleMethod] = useState('')
  //Nhận đường dẫn của ảnh từng bước thực hiện
  const [imgMethod, setImgMethod] = useState('')
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
      setImgMethod(result.assets[0].uri)
    }
  }
  //Nhận giá trị mô tả chi tiết cho từng bước
  const [detailMethod, setDetailMethod] = useState('')
  //Danh sách các bước thực hiện
  const [method, setMethod] = useState([])
  const addMethodStep = () => { 
    if(titleMethod!='' && detailMethod!=''){
      const newStep = { title: titleMethod, image: imgMethod, detail: detailMethod, }; 
      setMethod([...method, newStep]);
    }
    // Đặt lại các giá trị sau khi thêm 
    setTitleMethod(''); 
    setImgMethod(null); 
    setDetailMethod(''); 
    setStaeMethod(false)
  };
  //Kiểm soát giá trị thêm vào ds các bước
  const [stateMethod, setStaeMethod] = useState(false)
  useEffect(()=>{
    if(titleMethod!='' && imgMethod!='' && detailMethod!=''){
      setStaeMethod(true)
    }
  }, [{titleMethod}, {imgMethod}, {detailMethod}])



  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.title}>
        {/* Back button */}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => naviagtion.goBack()}>
            <Ionicons name='arrow-back-outline' size={30} color='white' />
          </TouchableOpacity>
          <Text style={styles.text_create}>Tạo công thức</Text>
        </View>

        {/* Share button */}
        <TouchableOpacity style={ stateShare ? styles.touch_share_true:styles.touch_share_false }
          disabled={!stateShare}
          onPress={() => Alert.alert("na")}
        >
          <Text style={ stateShare ? styles.text_touch_true: styles.text_touch_false}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>
      {/* Màn hình nhập các thông tin */}
      <ScrollView style={styles.scroll}>
        {/* Thêm hình ảnh cho món ăn */}
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
        {/* Nhập tên món ăn */}
        <TextInput
          style={styles.text_name}
          placeholder='Tên món ăn'
          multiline={true}
          value={nameDish}
          onChangeText={setNameDish}
        />
        {/* Nhập mô tả món ăn */}
        <TextInput
          style={styles.text_note}
          keyboardType='default'
          placeholder='Hãy viết dòng chia sẻ về món ăn của bạn'
          multiline={true}
          value={desc}
          onChangeText={setDesc}
        />
        {/* Nhập khẩu phần ăn */}
        <View style={styles.serving}>
          <Text style={styles.text_serving}>Khẩu phần</Text>
          <View style={styles.inputtext_serving}>
            <RNPickerSelect
              placeholder={{ label: 'Khẩu phần', value: null }}
              value={serving}
              onValueChange={(value) => setServing(value)}
              items={[
                { label: '1 người', value: 1 },
                { label: '2 người', value: 2 },
                { label: '3 người', value: 3 },
                { label: '3 người', value: 3 },
                { label: '4 người', value: 4 },
                { label: '5 người', value: 5 },
                { label: '6 người', value: 6 },
              ]}
            />
          </View>
        </View>
        {/* Nhập thời gian nấu ăn */}
        <View style={styles.serving}>
          <Text style={styles.text_serving}>Thời gian nấu</Text>
          <View style={styles.inputtext_serving}>
            <RNPickerSelect
              placeholder={{ label: 'Thời gian', value: null }}
              value={timecook}
              onValueChange={(value) => setTimecook(value)}
              items={[
                { label: '10 phút', value: 10 },
                { label: '15 phút', value: 15 },
                { label: '20 phút', value: 20 },
                { label: '25 phút', value: 25 },
                { label: '30 phút', value: 30 },
                { label: '35 phút', value: 35 },
                { label: '40 phút', value: 40 },
              ]}
            />
          </View>
        </View>
        {/* Chọn loại món ăn */}
        <View style={styles.serving}>
          <Text style={styles.text_serving}>Loại món ăn</Text>
          <View style={styles.inputtext_serving}>
            <RNPickerSelect
              placeholder={{ label: 'Loại món ăn', value: null }}
              value={cate}
              onValueChange={(value) => setCate(value)}
              items={[
                { label: 'Miền Bắc', value: "Miền Bắc" },
                { label: 'Miền Nam', value: 'Miền Nam' },
                { label: 'Miền Trung', value: 'Miền Trung' },
              ]}
            />
          </View>
        </View>
        {/* Danh sách các nguyên liệu */}
        <Text style={styles.title_ingredient}>Nguyên liệu</Text>
        {ListAddIngre.map((ingre, index) => (
          <View key={index}>
            {ListIngre.map((item) => {
              if (ingre.id === item.key) {
                return (
                  <View key={item.key}>
                    <ItemIngre ingredient={item} quality={ingre.quality} remove={()=>removeIngre(ingre)} />
                  </View>
                )
              }
            })}
          </View>
        ))}

        <View style={styles.ingredient}>
          <View style={styles.background_img_ingre}>
            <Image style={styles.img_ingre} source={imgIngre} />
          </View>
          {/* Chọn tên nguyên liệu */}
          <View style={styles.text_name_ingre}>
            <RNPickerSelect
              placeholder={{ label: 'Chọn nguyên liệu', value: null }}
              value={ingredient}
              onValueChange={(value) => handleIngredientChange(value)}
              items={pickerItems}
            />
          </View>
          {/* Nhập số lượng nguyên liệu */}
          <TextInput
            keyboardType="number-pad"
            style={styles.text_quality}
            placeholder='0'
            value={quality}
            onChangeText={setQuality}
          />
          {/* Đơn vị nguyên liệu */}
          <Text style={styles.text_dvi}>{dvi}</Text> 
        </View>
        <TouchableOpacity style={styles.add_ingre}
          disabled={!stateIngre} 
          onPress={() => AddIngredient(ingredient)}
        >
          <Ionicons style={styles.icon_add} name='add-outline' size={25} color='black' />
          <Text style={styles.text_add}>Thêm nguyên liệu</Text>
        </TouchableOpacity>

        <Text style={styles.title_ingredient}>Các bước thực hiện</Text>
       
        <ItemStep method={method} setmethod={setMethod}/>
        <View style={styles.methodcook}>           
          {/* Thứ tự bước thực hiện */} 
          <Text style={styles.method_number}>Bước {method.length+1} :</Text> 
          <View style={styles.title_method}>
             {/* Nhập title bước thực hiện */} 
             <TextInput style={styles.text_title_method} 
              placeholder='Tóm tắt bước thực hiện'
              value={titleMethod} 
              onChangeText={setTitleMethod} 
              /> 
          </View>
          <View style={styles.title_method}>
            {/* Thêm ảnh cho bước thực hiện */}
            <TouchableOpacity style={styles.upload_method} onPress={openImageMethod}>
              {imgMethod ? (
                <Image
                  source={{ uri: imgMethod }}
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
            {/* Nhập mô tả chi tiết cho bước thực hiện */}
            <TextInput
              style={styles.text_method}
              placeholder='Mô tả chi tiết thực hiện'
              value={detailMethod}
              onChangeText={setDetailMethod}
            />
          </View>
          
          <TouchableOpacity onPress={addMethodStep} 
            style={styles.add_method}
            disabled={!stateMethod}
          >
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
    backgroundColor: '#F5F5F5',
  },
  text_upload: {
    textAlign: 'center',
    color: '#CFCFCF',
  },
  text_name: {
    fontSize: 22,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
    padding: 5,
    marginHorizontal: 15,
  },
  text_note: {
    height: 100,
    fontSize: 15,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    textAlign: 'center',
    padding: 5,
    margin: 10,
    marginHorizontal: 15,
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
  },
  inputtext_serving: {
    fontSize: 13,
    width: 170,
    height: 35,
    color: 'black',
    borderRadius: 5,
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
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
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  background_img_ingre: {
    width: '10%',
    height: 40,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'center',
    borderRadius: 5,
  },
  img_ingre: {
    height: 30,
    width: 30,
  },
  text_name_ingre: {
    width: '50%',
    fontSize: 15,
    alignContent: 'center',
    textAlign: 'center',
  },
  text_quality: {
    width: '20%',
    fontSize: 16,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  text_dvi: {
    width: '20%',
    fontSize: 16,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 5,
    height: 60,
    textAlignVertical: 'center',
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
    height: 40,
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
    textAlign: "left",
    fontWeight: "500"
  },
  text_title_method: {
    width: '100%',
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
  },
  upload_method: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    borderStyle: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    backgroundColor: '#F5F5F5',
  },
  text_method: {
    width: '68%',
    height: 100,
    fontSize: 15,
    borderRadius: 5,
    backgroundColor: '#F5F5F5',
    textAlignVertical: 'top',
    textAlign: 'center',
  },
  add_method: {
    marginTop: 70,
    marginBottom: 30,
    flexDirection: 'row',
  },
  
})
