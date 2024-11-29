import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function EditInfo() {  
    const navigation = useNavigation()
    const [name, setName] = useState('Cao Quốc Kiệt')
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.title}>
            {/* Back button */}
            <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
            <Ionicons name='arrow-back-outline' size={30} color='white' />
            </TouchableOpacity>
            <Text style={styles.text_title}>Chỉnh sửa trang cá nhân</Text>
        </View>
        <View  style={{  width: "96%",  marginTop: 15,paddingBottom: 10, borderBottomWidth: 1, borderColor: "#CFCFCF"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text  style={styles.text_cate}>Ảnh đại diện</Text>            
                <TouchableOpacity>
                    <Text style={{fontSize: 18, textAlign: "center", textAlignVertical: "center", color: "#0033FF"}}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.ava}
                resizeMode='cover'
                source={require('../../../assets/icons/logo.png')}
            />
        </View>
        <View  style={{  width: "96%",  marginTop: 15,paddingBottom: 10, borderBottomWidth: 1, borderColor: "#CFCFCF"}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text  style={styles.text_cate}>Tên người dùng</Text>            
                <TouchableOpacity>
                    <Text style={{fontSize: 18, textAlign: "center", textAlignVertical: "center", color: "#0033FF"}}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>            
            <Text style={styles.name}>{name}</Text>
        </View>
        <View style={{  width: "100%", paddingHorizontal: 10, marginTop: 15}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text  style={styles.text_cate}>Ảnh đại diện</Text>            
                <TouchableOpacity>
                    <Text style={{fontSize: 18, textAlign: "center", textAlignVertical: "center", color: "#0033FF"}}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>            
            <Text style={styles.name}>{name}</Text>
        </View>
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },  
  icon_back: {
    position: "absolute",
    marginLeft: 10, 
    zIndex: 50,
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
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  text_cate: {
    width: "70%",
    fontSize: 20,
    fontWeight: "bold",
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
    textAlign: "center",
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 15,
  },
})
