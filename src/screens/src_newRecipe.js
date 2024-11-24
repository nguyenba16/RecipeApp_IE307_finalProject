import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Image, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import RNPickerSelect from 'react-native-picker-select';

export default function NewRecipe({navigation}) {

    //Nhận đường dẫn của ảnh món ăn
    const [photo, setPhoto] = useState(); 
    const openImage = async () => { const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
        if (permissionResult.granted === false) { 
            alert("Permission to access camera roll is required!"); 
            return; 
        } 
        const result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1, 
        }); 
        if (!result.canceled) { 
            setPhoto(result.assets[0].uri);
        }
    }
    const ListIngre =[
        {
            key: 1,
            name: "Ngữ vị hương",
            dvi: "kg",
            img: require('../../assets/icons/logo.png')
        },
        {
            key: 2,
            name: "Cá",
            dvi: "kg",
            img: require('../../assets/icons/logo.png')
        },
        {
            key: 3,
            name: "Rau",
            dvi: "kg",
            img: require('../../assets/icons/logo.png')
        },
        {
            key: 4,
            name: "Đường",
            dvi: "kg",
            img: require('../../assets/icons/logo.png')
        },
        {
            key: 5,
            name: "Muối",
            dvi: "gam",
            img: require('../../assets/icons/logo.png')
        },

    ]
    //Danh sách các nguyên liệu đã được thêm
    const [ListAddIngre, setListAddIngre] =useState([])
    //Thêm nguyên liệu vào danh sách
    const AddIngredient = ((value) =>{
        if(value!=null){
            Alert.alert("đã thêm")
            setListAddIngre([...ListAddIngre,value])
        }
    })    
    //Nhận giá trị của tên món ăn
    const [nameDish, setNameDish] = useState();
    //Nhận giá trị của mô tả
    const [desc, setDesc] = useState();
    //Nhận giá trị khẩu phần ăn 
    const [serving, setServing] = useState();
    //Nhận giá trị thời gian nấu 
    const [timecook, setTimecook] = useState();
    //Nhận mảng các nguyên liệu
    const [ingredient, setIngredient] = useState();     
    const pickerItems = ListIngre.map(item => ({ label: item.name, value: item.key, })); 
    //Nhận img của từng nguyên liệu
    const [imgIngre, setImgIngre] = useState()
    //Nhận giá trị của số lượng
    const [quality, setQuality] = useState() 
    //Nhận giá trị của đơn vị
    const [dvi, setDvi] = useState("Đơn vị" );
    const handleIngredientChange = (value) => { 
        ListIngre.map(item => {
            if(value === item.key ){
                setDvi(item.dvi); 
                setImgIngre(item.img)
            }
        })
        setIngredient(value);
    };
    //Nhận giá trị của tiêu đề từng bước
    const [titleMethod, setTitleMethod] = useState()
    //Nhận đường dẫn của ảnh từng bước thực hiện
    const [imgMethod, setImgMethod] = useState(); 
    const openImageMethod = async () => { const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
        if (permissionResult.granted === false) { 
            alert("Permission to access camera roll is required!"); 
            return; 
        } 
        const result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1, 
        }); 
        if (!result.canceled) { 
            setImgMethod(result.assets[0].uri);
        }
    }
    //Nhận giá trị mô tả chi tiết cho từng bước
    const [detailMethod, setDetailMethod] = useState()
    return (
        <SafeAreaView style = {styles.container}>
            {/* header */}
            <View style={styles.title}>
                {/* Back button */}
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                >
                    <Ionicons style={styles.back} name='arrow-back-outline' size={30} color='white' />
                </TouchableOpacity>
                
                {/* Share button */}
                <TouchableOpacity style={styles.touch_share}>
                    <Text style={styles.text_touch}>Chia sẻ</Text>
                </TouchableOpacity>
                
            </View>
            {/* Màn hình nhập các thông tin */}
            <ScrollView style={styles.scroll}>
                {/* Thêm hình ảnh cho món ăn */}                
                <TouchableOpacity 
                    style={styles.touch_up_img}
                    onPress={openImage} 
                >
                {photo ? (<Image source={{ uri: photo }} style={{ width: "102%", height: "102%", borderRadius: 5, }} />):(
                    <View>
                        <Ionicons style={styles.text_upload} name='cloud-upload-outline' size={30} color='#FF9320'  />
                        <Text style={styles.text_upload}>Tải ảnh đại diện cho món ăn của bạn</Text>
                    </View>                        
                )}
                </TouchableOpacity>
                {/* Nhập tên món ăn */}
                <TextInput
                    style={styles.text_name}
                    placeholder="Tên món ăn"
                    multiline={true}
                    value={nameDish}
                    onChange={setNameDish}
                />
                {/* Nhập mô tả món ăn */}
                <TextInput
                    style={styles.text_note}
                    placeholder="Hãy viết dòng chia sẻ về món ăn của bạn"
                    multiline={true}
                    value={desc}
                    onChange={setDesc}
                />
                {/* Nhập khẩu phần ăn */}
                <View style={styles.serving}>
                    <Text style={styles.text_serving}>Khẩu phần</Text>
                    <View style={styles.inputtext_serving}>
                        <RNPickerSelect  
                            placeholder={{ label: "Khẩu phần", value: null }}
                            value={serving}
                            onValueChange={(value) => setServing(value)}
                            items={[
                                { label: '1 người', value: 1 },
                                { label: '2 người', value: 2 },
                                { label: '3 người', value: 3},
                                { label: '3 người', value: 3},
                                { label: '4 người', value: 4},
                                { label: '5 người', value: 5},
                                { label: '6 người', value: 6},
                            ]}
                        /> 
                    </View>  
                </View>             
                {/* Nhập thời gian nấu ăn */}
                <View style={styles.serving}>
                    <Text style={styles.text_serving}>Thời gian nấu</Text>
                    <View style={styles.inputtext_serving}>
                        <RNPickerSelect  
                            placeholder={{ label: "Thời gian", value: null }}
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
                
                {/* Danh sách các nguyên liệu */}
                <Text style={styles.title_ingredient}>Nguyên liệu</Text>
                {
                    ListAddIngre.map((value)=>{
                        ListIngre.map((item)=>{
                            if(item.key==value)
                            {
                                
                            }
                            return(
                                <Text>{value}</Text>
                            )
                        })
                    })
                }
                <View style={styles.ingredient}>
                    <View style={styles.background_img_ingre}>                        
                        <Image style={styles.img_ingre} source={imgIngre}/>     
                    </View>               
                    {/* Chọn tên nguyên liệu */}
                    <View style={styles.text_name_ingre}>                        
                        <RNPickerSelect placeholder={{ label: "Chọn nguyên liệu", value: null }} 
                        value={ingredient} 
                        onValueChange={(value) => handleIngredientChange(value)} 
                        items={pickerItems} /> 
                    </View>
                    {/* Nhập số lượng nguyên liệu */}
                    <TextInput
                        keyboardType = "numeric"
                            style={styles.text_quality}
                            placeholder="Số lượng"
                            value={quality}
                            onChange={setQuality}
                        />
                    {/* Đơn vị nguyên liệu */}
                    <Text style={styles.text_dvi} >{dvi}</Text>                    
                </View>
                <TouchableOpacity style={styles.add_ingre}
                    onPress={()=>AddIngredient(ingredient)}
                >
                    <Ionicons style={styles.icon_add}  name='add-outline' size={25} color='black' />
                    <Text style={styles.text_add}  >Thêm nguyên liệu</Text>
                </TouchableOpacity>

                <Text style={styles.title_ingredient}>Các bước thực hiện</Text>

                <View style={styles.methodcook}>
                    <View style={styles.title_method}>
                        {/* Thứ tự bước thực hiện */}
                        <Text style={styles.method_number}>1</Text>
                        {/* Nhập title bước thực hiện */}
                        <TextInput
                            style={styles.text_title_method}
                            placeholder="Tóm tắt bước thực hiện"
                            value={titleMethod}
                            onChange={setTitleMethod}
                        />
                    </View>
                    <View style={styles.title_method}>
                        <Text style={{width: "10%"}}></Text>
                        {/* Thêm ảnh cho bước thực hiện */}                        
                        <TouchableOpacity 
                            style={styles.upload_method}
                            onPress={openImageMethod} 
                        >
                        {imgMethod ? (<Image source={{ uri: photo }} style={{ width: "100%", height: "100%", borderRadius: 5, }} />):(
                            <View>
                                <Ionicons style={{textAlign: "center"}} name='cloud-upload-outline' size={30} color='#FF9320'  />
                            </View>                        
                        )}
                        </TouchableOpacity>
                        {/* Nhập mô tả chi tiết cho bước thực hiện */}
                        <TextInput
                            style={styles.text_method}
                            placeholder="Mô tả chi tiết thực hiện"
                            value={detailMethod}
                            onChange={setDetailMethod}
                        />
                    </View>                    
                    <TouchableOpacity style={styles.add_method}>
                        <Ionicons style={styles.icon_add}  name='add-outline' size={25} color='black' />
                        <Text style={styles.text_add}  >Thêm bước</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
    },
    scroll: {
        width: "100%",
        paddingHorizontal: 5,
    },
    title: {
        flexDirection: "row",
        width: "100%",
        height: 60,
        backgroundColor: "#FF9320",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    touch_share: {
        backgroundColor: "white",
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    text_touch: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FF9320"
    },
    touch_up_img: {
        height: 300,
        marginTop: 5,
        borderColor: 'black',
        borderStyle: 'dashed', 
        borderRadius: 5,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text_upload: {
        textAlign: "center"
    },
    text_name: {
        fontSize: 22,
        borderWidth: 1,
        borderRadius: 5,
        textAlign: "center",
        marginTop: 10,
        padding: 5,
    },
    text_note: {
        height: 100,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        textAlign: "center",
        padding: 5,
    },
    serving: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    text_serving: {
        fontSize: 18,
        color: "black"
    },
    inputtext_serving: {
        fontSize: 13,
        width: 170,
        height: 35,
        color: "black",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center"
    },
    title_ingredient: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 30,
    },
    ingredient: {
        width: "100%",
        marginTop: 15,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    background_img_ingre: {
        width: "10%",
        height: 40,
        alignItems: "center",
        justifyContent: "center",        
        borderStartStartRadius: 5,
        borderBottomStartRadius:5,
        borderWidth: 1,
        borderRightWidth: 0,
        paddingLeft: 10,
    },
    img_ingre:{
        height: 30,
        width: 30,
    },
    text_name_ingre: {
        borderWidth: 1,
        height: 40,
        width: "50%",
        fontSize: 15,
        justifyContent: "center",
        borderRightWidth: 0,
        borderLeftWidth: 0,
    },
    text_quality: {
        width: "20%",
        fontSize: 15,
        height: 40,
        alignContent: "center",
        borderWidth: 1,
        borderRightWidth: 0,
        paddingTop: 5,
        textAlign: "center",
        justifyContent: "center"
    },
    text_dvi: {
        width: "20%",
        fontSize: 15,
        height: 40,
        borderBottomRightRadius: 5,
        borderTopRightRadius: 5,
        textAlignVertical: "center",
        borderWidth: 1,
        paddingLeft: 5,
    },
    add_ingre: {
        flexDirection: "row",
        marginTop: 10,
    },
    icon_add: {
        width: "38%",
        textAlign: "right",
    },
    text_add: {
        width: "62%",
        fontSize: 15,
        alignSelf: "center",
        marginLeft: 5,
    },
    methodcook: {
        width: "100%",
        marginTop: 10,
    },
    title_method: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        height: 40,
        fontSize: 15,
        marginTop: 5,
    },
    method_number: {
        width: "10%",
        fontSize: 18,
        backgroundColor: "#FF9320",
        textAlign: "center",
        borderRadius: 100,
        textAlignVertical: "center"
    },
    text_title_method: {
        width: "88%",
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 5,
    },
    upload_method: {
        width: "28%",
        height: 100,
        justifyContent: "center",
        borderColor: 'black',
        borderStyle: 'dashed', 
        borderRadius: 5,
        borderWidth: 1,
    },
    text_method: {
        width: "58%",
        height: 100,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 5,
    },
    add_method: {
        marginTop: 65,
        flexDirection: "row",
    }
});

