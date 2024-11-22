import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, KeyboardAvoidingView} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ItemRecipe from "../components/ItemRecipe";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SearchScreen() {
    return (
        <KeyboardAwareScrollView style={styles.container} 
         >
            <View style={styles.backgroundTitle}>
               <View style={styles.search}>
               <TextInput
                    style={styles.text_input}
                    placeholder="Tìm kiếm món ăn"
                    />
                <Image style={styles.icon_search} source={require("../../assets/icons/search.png")}/>
               </View>
               
            </View>
            <ScrollView
            keyboardShouldPersistTaps="handled"
            >
                <ItemRecipe></ItemRecipe>
                <ItemRecipe></ItemRecipe>
                <ItemRecipe></ItemRecipe>
                <ItemRecipe></ItemRecipe>
                <ItemRecipe></ItemRecipe>

            </ScrollView>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#FFFFFF",
       
    },
    backgroundTitle: {
        backgroundColor: "#ff9320",
        width: '100%',
        height: 120,
        alignItems: "center",
    },
    search: {
        flexDirection: "row",
        width: "90%",
        height: 40,
        marginTop:60,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
    },
    text_input: {
        paddingLeft: 15,
        fontSize: 18
    },
    icon_search:{
        height: 30,
        width: 30,
        marginTop:5,
        right: 10,
        position: "absolute"
    }
    

});