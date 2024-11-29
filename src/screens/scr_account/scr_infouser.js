import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import ItemRecipe from '../../components/ItemRecipe'

const ListRecipe = [
  {
    key: 1,
    name: 'Bún bò - Đặc sản Huế Bún bò - Đặc sản Huế ',
    ingredient:
      'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa,Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, ',
    img: require('../../../assets/bunbo.jpg'),
    ava_user: require('../../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 2,
    name: 'Bún bò - Đặc sản Huế Bún bò - Đặc sản Huế ',
    ingredient:
      'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa,Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, ',
    img: require('../../../assets/bunbo.jpg'),
    ava_user: require('../../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 3,
    name: 'Bún bò - Đặc sản Huế Bún bò - Đặc sản Huế ',
    ingredient:
      'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa,Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, ',
    img: require('../../../assets/bunbo.jpg'),
    ava_user: require('../../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 4,
    name: 'Bún bò - Đặc sản Huế Bún bò - Đặc sản Huế ',
    ingredient:
      'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa,Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, ',
    img: require('../../../assets/bunbo.jpg'),
    ava_user: require('../../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
]
export default function InfoUser() {
  const navigation = useNavigation()
  const [shared, setShare] = useState(0)
  const [saved, setSaved] = useState(1000)
  const [liked, setLiked] = useState(1000)
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.title}>
        {/* Back button */}
        <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
        <Text style={styles.text_title}>Trang cá nhân</Text>
      </View>
      <ScrollView style={{width: "100%"}} >
      <Image
        style={styles.ava}
        resizeMode='cover'
        source={require('../../../assets/icons/logo.png')}
      />
      <Text style={styles.name}>Cao Quốc Kiệt</Text>
      <Text style={styles.email}>caoquockiet@gmail.com</Text>
      <View style={styles.number}>
        <Text style={styles.liked}>
          <Text style={{ fontWeight: 'bold' }}>{saved}</Text> Lưu
        </Text>        
        <Text style={styles.liked}>
          <Text style={{ fontWeight: 'bold' }}>{liked}</Text> Yêu thích
        </Text>
        <Text style={styles.liked}>
          <Text style={{ fontWeight: 'bold' }}>{shared}</Text> Chia sẻ
        </Text>
      </View>
      <View style={{flexDirection: "row", width: "90%", alignSelf: "center", justifyContent: "space-between"}}>
        <TouchableOpacity style={styles.btn_edit}
              onPress={() => navigation.navigate('EditInfo')}
        >
          <Ionicons style={{width: "7%" }} name='pencil'  size={20} color="white"/>
          <Text style={styles.text_edit}>Chỉnh sửa thông tin </Text>        
        </TouchableOpacity>
        <TouchableOpacity style={{width: "10%", backgroundColor: "#FF9320",  borderRadius:7, justifyContent: "center"}}>
          <Ionicons style={{alignContent: "center", textAlign: "center",textAlignVertical: "center", }}  name='log-out-outline'  size={30} color="white"  />
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", borderColor: "#CFCFCF", borderTopWidth: 8, marginTop: 20,}}></View>
      <View style={{ width:"100%",  paddingVertical: 10, borderColor: "#CFCFCF", borderBottomWidth: 1, alignItems: "center"}}>
        <Text style={styles.text_share}>Công thức đã chia sẻ</Text>
      </View>
        {ListRecipe.map((recipe, index) => (    
              <ItemRecipe key={index} Recipe={recipe} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  icon_back: {
    position: "absolute",
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
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  ava: {
    width: 150,
    height: 150,
    marginVertical: 10,
    alignSelf: "center"
  },
  name: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: "center"
  },
  number: {
    flexDirection: 'row',
    width: "90%",
    justifyContent: "space-between",
    marginVertical: 10,    
    alignSelf: "center",
  },
  liked: {
    textAlign: 'left',
    marginVertical: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: "medium",    
    alignSelf: "center"
  },
  email: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'medium',
    marginTop: 5,
    alignSelf: "center"
  },
  btn_edit: {
    backgroundColor: "#FF9320",
    width: "88%",
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
    borderRadius: 7,

  },
  text_edit: {
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold"
  },
  text_share: {
    fontSize: 18,
    fontWeight: "500",
    paddingVertical: 5,
    borderRadius: 30,
    color: "#FF9320",
    alignSelf: "center"
  }
})
