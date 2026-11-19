
import { Pressable, StyleSheet, Text, View } from "react-native";
export default function TaskFilters({ onChange, selected }) {
    function showAll() {
        onChange("All");
    }

    function showActive() {
        onChange("Active");
    }

    function showCompleted() {
        onChange("Completed");
    }

    function getStyle(value) {
        if (selected === value) {
            return styles.activeFilterButton;
        }
        return [styles.filterButton]
    }
    return (
        <View style={styles.filters}>
            <Pressable onPress={showAll} style={[getStyle("All")]}>
                <Text style={styles.filterText}>All</Text>
            </Pressable>
            <Pressable onPress={showActive} style={[getStyle("Active")]}
            ><Text style={styles.filterText}>Active</Text>
            </Pressable>
            <Pressable onPress={showCompleted} style={[getStyle("Completed")]}>
                <Text style={styles.filterText}>Completed</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    activeFilterButton: {
        backgroundColor: "#5b716d", paddingBlock: 8, paddingInline: 18, borderRadius: 8
    },
    filterText: {
        fontSize: 18
    },
    filterButton: {
        paddingBlock: 8, paddingInline: 18, borderRadius: 8
    },
    filters: {
        flexDirection: "row",
        gap: 8, marginBlock: 20
    },
})