import { View, Text, StyleSheet } from "react-native";

export default function SearchScreen() {
    return (
        <View style = {styles.maincontent}>
            <Text>Search Screen</Text>
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