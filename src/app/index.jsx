import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";

export default function WelcomeScreen() {

    //A use effect takes 2 arguments
    //the first argument is the callback
    //that means it's the function that is called when this hook is invoked
    //the second arugment is the list of dependency arguments
    useEffect(function () {
        console.log("Application started");
        router.replace("/tasks");
    }, [])



    function openLogin() {
        router.replace("/login");
    }

    return (
        <AppScreen centered>
            <Text style={styles.heading}>Welcome to My Tasks</Text>
            <Text style={styles.subtitle}>A clearer day!</Text>

            <AppButton onPress={openLogin} text="Get Started" />
        </AppScreen>
    )
}

const styles = StyleSheet.create({

    heading: {
        fontSize: 34, fontWeight: "bold", color: "#203B35"
    },
    subtitle: {
        fontSize: 18, lineHeight: 26, color: "#61736b", marginVertical: 20
    }
})