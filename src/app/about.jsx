import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";

export default function About() {

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/tasks")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>About My Tasks</Text>
            <Text style={styles.text}>
                This app helps us manage tasks, we can add, completed, delete and filter them!
            </Text>

            <AppButton text="Go back" onPress={goBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#F5F3Ee", padding: 20
    },
    heading: {
        fontSize: 30, fontWeight: "bold", color: "#203B35"
    },
    text: {
        fontSize: 18, lineHeight: 28
    }
})


