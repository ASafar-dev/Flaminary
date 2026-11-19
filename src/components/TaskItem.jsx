import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskItem({ task, onOpen, onDelete }) {

    return (
        <View key={task.id} style={styles.card}>
            <Pressable onPress={() => { onOpen(task) }} >
                <Text style={[styles.taskTitle, task.completed && styles.completed]}>{task.title}</Text>
            </Pressable>
            <Pressable onPress={() => { onDelete(task.id) }} style={styles.iconButton}>
                <Ionicons name="trash-outline" size={22} color="#A03026" />
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 18,
        borderRadius: 16, marginBottom: 10,
        flexDirection: "row",
        alignItems: "center", justifyContent: "space-between"
    },
    taskTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#203B35"
    },
    completed: { color: "#aa622e", textDecorationLine: "line-through" },
    iconButton: {
        width: 44, height: 44, alignItems: "center", justifyContent: "center"
    }
})
