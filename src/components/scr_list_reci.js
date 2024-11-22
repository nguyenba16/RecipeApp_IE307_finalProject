import React, { Fragment } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native';
import ItemRecipe from './ItemRecipe';
export default function ListReci() {
    return(
        <ScrollView style={styles.container}>
            <ItemRecipe></ItemRecipe>
            <ItemRecipe></ItemRecipe>
            <ItemRecipe></ItemRecipe>
            <ItemRecipe></ItemRecipe>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFFFFF",
        height: '100%',
        width: '100%',
    },
});