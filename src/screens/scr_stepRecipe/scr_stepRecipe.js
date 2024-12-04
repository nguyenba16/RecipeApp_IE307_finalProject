import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { useState } from 'react';

const data = [
    { 
        img: require('../../../assets/bunbo.jpg'),
        title: 'Nội dung trang 1 Nội dung trang 1', 
        desc: "hdjhsdhdshjjhjsdjh" 
    },
    { 
        img: require('../../../assets/bunbo.jpg'),
        title: 'Nội dung trang 1 Nội dung trang 1', 
        desc: "Cho giò heo, xương gà đã qua một lần nước vào nồi, đổ nước lọc vào cho ngập là được, cho hành tây đã bóc vỏ và cắt làm 4 vào, cho nước vào nồi và cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho"  
    },
    { 
        img: require('../../../assets/bunbo.jpg'),
        title: 'Nội dung trang 1' , 
        desc: "hdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjhhdjhsdhdshjjhjsdjh"  
    },
];

export default function StepRecipe() {
    const navigation = useNavigation()
    const swiperRef = React.useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleIndexChanged = (index) => { 
        setCurrentIndex(index)
    }
    
    return(
        <View style={styles.container}>
            <Swiper 
                ref={swiperRef} 
                loop={false}
                onIndexChanged={handleIndexChanged}
                renderPagination={(index, total) => ( 
                    <View style={styles.paginationStyle}> 
                        <TouchableOpacity style={styles.btn_index}
                            onPress={() => swiperRef.current.scrollBy(-1)}
                            disabled={currentIndex === 0}
                        >
                            <Ionicons name='chevron-back' size={30} color='white'/>
                        </TouchableOpacity>
                        <Text style={styles.paginationText}> {index+1} / {total} </Text>                         
                        <TouchableOpacity style={styles.btn_index}
                            onPress={() => swiperRef.current.scrollBy(+1)}
                            disabled={currentIndex === data.length-1}
                        >
                            <Ionicons name='chevron-forward' size={30} color='white'/>
                        </TouchableOpacity>
                    </View> 
                )} >
                {data.map((item, index) => (
                    <ScrollView key={index} style={styles.scrollStyle}>
                        <Image style={styles.img} source={item.img}/>  
                        <TouchableOpacity style={styles.btn_back} onPress={() => navigation.goBack()}>
                            <Ionicons name='close-outline' size={30} color='black' />
                        </TouchableOpacity>                                        
                        <Text style={styles.text_title}>{item.title}</Text>
                        <View style={styles.line}></View>
                        <Text style={styles.title_desc}>Mô tả: <Text style={styles.text_desc}>{item.desc}</Text></Text>
                    </ScrollView>
                ))}
            </Swiper>
                  
        </View>
        
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    btn_back: {
        width: 40,
        height: 40,
        borderRadius: 1000,
        backgroundColor: '#fff',
        position: "absolute",
        top: 30,
        left: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text_title: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 10,
      },
      line: {
        backgroundColor: "black", 
        height: 1,
        opacity: 0.3,
        marginHorizontal: 10,        
    },
    title_desc: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "justify", 
        marginVertical: 15,
        paddingHorizontal: "10"
    }, 
    text_desc: {
        fontWeight: "400",
        fontSize: 18,
        textAlign: "justify", 
        lineHeight: 25
    },
    paginationStyle: { 
        position: 'absolute', 
        bottom: 0,
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    btn_index: {
        backgroundColor: "#ff9320", 
        height: 35,
        width: 35,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
    } , 
    paginationText: { 
        color: 'black', 
        fontSize: 20, 
        fontWeight: "600",
        alignSelf: 'center',
    },
    scrollStyle: {
        flex: 1, 
        marginBottom: 70,
    }
  })
  