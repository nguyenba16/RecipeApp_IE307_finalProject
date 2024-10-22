import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
    return (
        <View style = {styles.maincontent}>
            <Text>Acc Screen</Text>
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