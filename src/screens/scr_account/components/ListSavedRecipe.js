import React from 'react'
import { StyleSheet, View } from 'react-native';
import ItemRecipe from '../../../components/ItemRecipe';
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

const ListRecipe = [
    {
        key: 1,
        name: "Bún bò - Đặc sản Huế ",
        ingredient: "Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ",
        img: require("../../../../assets/bunbo.jpg"),
        ava_user: require("../../../../assets/icons/logo.png"),
        name_user: "Cao Quốc Kiệt"
    },
    {
        key: 2,
        name: "Bún bò - Đặc sản Huế",
        ingredient: "Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ",
        img: require("../../../../assets/bunbo.jpg"),
        ava_user: require("../../../../assets/icons/logo.png"),
        name_user: "Cao Quốc Kiệt"
    },
    {
        key: 3,
        name: "Bún bò - Đặc sản Huế",
        ingredient: "Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ",
        img: require("../../../../assets/bunbo.jpg"),
        ava_user: require("../../../../assets/icons/logo.png"),
        name_user: "Cao Quốc Kiệt"
    },
    {
        key: 4,
        name: "Bún bò - Đặc sản Huế",
        ingredient: "Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ",
        img: require("../../../../assets/bunbo.jpg"),
        ava_user: require("../../../../assets/icons/logo.png"),
        name_user: "Cao Quốc Kiệt"
    }
]

export default function ListSavedRecipe() {
    return(
        <View style={styles.container}>
            <ScrollView>
            {
                ListRecipe.map((recipe) => (
                    
                        <ItemRecipe  key={recipe.key} Recipe={recipe} />
                    
                ))
            }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
    },
});