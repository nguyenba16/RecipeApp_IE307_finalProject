import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListIngreHaved from "./components/ListIngreHaved";
import ListIngreNeed from "./components/ListIngreNeed";

const TabGroceriy = createMaterialTopTabNavigator();

export default function GroceriesScreen() {

    return (
      <View style={styles.container}>
        <View style={styles.backgroundTitle}>
          <Text style={styles.text_title}>Giỏ hàng của tôi</Text>
        </View>
        <TabGroceriy.Navigator
          screenOptions={{
            tabBarIndicatorStyle: { backgroundColor: '#ff9320' },
            tabBarActiveTintColor: '#ff9320',
            tabBarInactiveTintColor: 'black',
            tabBarLabelStyle: { textTransform: 'none', fontSize: 15, fontWeight: 'bold' },
          }}
        >
          <TabGroceriy.Screen
            name='Nguyên liệu thiếu'
            component={ListIngreNeed}
            options={{ tabBarLabel: 'Nguyên liệu thiếu ' }}
          />
          <TabGroceriy.Screen
            name='Công thức chia sẻ'
            component={ListIngreHaved}
            options={{ tabBarLabel: 'Nguyên liệu có' }}
          />
        </TabGroceriy.Navigator>
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