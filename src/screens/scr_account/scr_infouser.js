import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function InfoUser() {

    const navigation = useNavigation();
    const [shared, setShare] = useState(0)
    const [saved, setSaved] = useState(0)
    const [liked, setLiked] = useState(0)
    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.title}>
                {/* Back button */}
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                >
                    <Ionicons style={styles.back} name='arrow-back-outline' size={30} color='white' />
                </TouchableOpacity>                
            </View>
            <Image style={ styles.ava} resizeMode="cover" source={require('../../../assets/icons/logo.png')} />
            <Text style={styles.name}>Cao Quốc Kiệt</Text>            
            <Text style={styles.email}>caoquockiet@gmail.com</Text>
            <View style={styles.number}>
                <Text style={styles.liked}><Text style={{fontWeight: "bold"}}>{saved}</Text> lưu</Text>
                <Text style={styles.liked}><Text style={{fontWeight: "bold"}}>{shared}</Text> chia sẻ</Text>
                <Text style={styles.liked}><Text style={{fontWeight: "bold"}}>{liked}</Text> yêu thích</Text>
            </View>
        </SafeAreaView>    
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        alignItems: "center"
    },
    background_info: {
        flexDirection: "row"
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
    ava: {
        width: 150,
        height: 150,
        marginVertical: 10
    },
    name: {
        fontSize: 20,
        color: "black",
        fontWeight: "bold"
    },
    number: {
        flexDirection: "row",

    },
    liked: {
        flex: 1,
        textAlign: "center",
        marginVertical: 10,
        fontSize: 18,
        color: "black",        
        fontWeight: "medium"
    },
    email: {
        fontSize: 15,
        color: "black",
        fontWeight: "medium"
    }
});