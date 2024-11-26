import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ItemHaved from "./components/ItemHaved";
import ItemNeed from "./components/ItemNeed";
export default function GroceriesScreen() {
    const ListIngre = [
        {
            key: 1,
            name: "Thịt",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 2,
            name: "Cá",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 3,
            name: "Rau",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 4,
            name: "Đường",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 5,
            name: "Cá",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 6,
            name: "Rau",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },
        {
            key: 7,
            name: "Đường",
            img: require('../../../assets/icons/logo.png') ,
            quality: 3,
            dvi: "kg"
        },

    ]
    return (
        <View style = {styles.container}>
            <View style={styles.backgroundTitle}>
                <Text style={styles.text_title}>Giỏ hàng của tôi</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.text_title_ingre}>Nguyên liệu cần</Text>
                <ScrollView style={styles.background_list}>
                {
                    ListIngre.map((item, index) => (
                        <ItemNeed key={index} ingredient={item}/>
                    ))
                }
                </ScrollView>
                <Text style={styles.text_title_ingre}>Nguyên liệu đã có</Text>
                <ScrollView style={styles.background_list}>
                {
                    ListIngre.map((item, index) => (
                        <ItemHaved key={index} ingredient={item}/>
                    ))
                }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    backgroundTitle: {
        backgroundColor: "#ff9320",
        width: '100%',
        height: 120,
        justifyContent: "center",
        alignContent: "center",
    },
    text_title: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        marginTop: 40,
    },
    text_title_ingre:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#ff9320",
        textAlign: "center",
        justifyContent: "center",
        height: "7%",
        marginTop: 10,        
        paddingTop: 5,
    },
    background_list: {
        height: "43%",
        marginHorizontal: 15,
    }
})