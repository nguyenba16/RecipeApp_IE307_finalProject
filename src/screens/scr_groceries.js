import { View, Text, StyleSheet } from "react-native";

export default function GroceriesScreen() {
    return (
        <View style = {styles.maincontent}>
            <Text>Shopping List Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    maincontent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
})