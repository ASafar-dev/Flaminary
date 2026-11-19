import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "../components/AppButton";
import ImageInputList from "../components/ImageInputList";

//Tasks details show the task chosen from the tasks list

export default function TaskDetailsScreen() {
    const params = useLocalSearchParams();
    const photos = getPhotos(params.photoUris);

    let title = "No title";
    let status;
    let id = "-1";

    title = params.taskTitle;

    id = params.taskId;

    if (params.taskStatus === "true") {
        status = "Completed";
    } else {
        status = "Active";
    }

    function getPhotos(photoUris) {
        if (typeof photoUris !== "string") return [];

        try {
            const images = JSON.parse(photoUris);
            if (Array.isArray(images)) {
                return images.filter(function (uri) {
                    return typeof uri === "string" && uri.length > 0;
                });
            }
        } catch {
            return [];
        }
        return [];
    }

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/tasks");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.text}>ID: {id}</Text>
            <Text style={styles.text}>Status: {status}</Text>
            {photos.length > 0 && <ImageInputList imageUris={photos} />}

            <AppButton text="Back to tasks" onPress={goBack} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F3EE",
        padding: 20
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#203B35"
    },
    text: {
        fontSize: 18,
        marginVertical: 12,
        color: "#61736b"
    }
})
