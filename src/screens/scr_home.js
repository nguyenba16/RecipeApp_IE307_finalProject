import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style = {styles.maincontent}>
            <Text>Home Screen</Text>
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