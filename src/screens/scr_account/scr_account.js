import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListSavedRecipe from "./components/ListSavedRecipe";
import ListSharedRecipe from "./components/ListSharedRecipe";

const Tab = createMaterialTopTabNavigator();

export default function ProfileScreen() {
    return (
        <View style={styles.container} >
            <View style={styles.backgroundTitle}>
                <View style={[styles.user, styles.userLayout]}>
                    <Text style={[styles.name]}>Cao Quốc Kiệt</Text>
                    <Text style={[styles.email]}>caokiet@gmail.com</Text>
                    <Image style={[styles.avatar]} resizeMode="cover" source={require('../../../assets/icons/logo.png')}/>
                </View>
                <TouchableOpacity style={styles.backgroung_setting} onPress={()=>alert('Setting')}>
                    <Image resizeMode="cover" source={require('../../../assets/icons/setting.png')} />
                </TouchableOpacity>
                
            </View>
            <Tab.Navigator
                screenOptions={{                    
                    tabBarIndicatorStyle: { backgroundColor: '#ff9320'},
                    tabBarActiveTintColor: '#ff9320',
                    tabBarInactiveTintColor: 'black',
                    tabBarLabelStyle: { textTransform: "none",fontSize: 15, fontWeight: 'bold' },                        
                }}                
            >
                <Tab.Screen
                    name="Công thức đã lưu"
                    component={ListSavedRecipe}
                    options={{ tabBarLabel: 'Công thức đã lưu '}}
                />
                <Tab.Screen
                    name="Công thức chia sẻ"
                    component={ListSharedRecipe}                    
                    options={{ tabBarLabel: 'Công thức chia sẻ' }}
                />
            </Tab.Navigator> 
        </View>
        

        
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
    },
    backgroundTitle: {
        backgroundColor: "#ff9320",
        width: '100%',
        height: 120
    },
    userLayout: {
        height: 70,
        position: "relative"
    },
    user: {
        top: 40,
        left: 10,
    },
    avatar: {
        left: 10,
        borderRadius: 100,
        width: 65,
        height: 65,
    },
    name: {
        top: 5,
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
        width: 500,
        height: 50,
        display: "flex",
        textAlign: "left",
        left: 82,
        position: "absolute"
    },
    email: {
        top: 32,
        fontSize: 15,
        color: "#000",
        width: 148,
        height: 30,
        opacity: 0.5,
        alignItems: "center",
        display: "flex",
        textAlign: "left",
        left: 84,
        position: "absolute"
    },
    backgroung_setting:{
        top: 55,
        right: "3.92%",
        position: "absolute"
        
    },

});