import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../constants/theme";

export default function AppScreen({
    children,
    centered = false,
    scroll = true,
    safeTop = true,
    contentStyle,
    style,
    refreshControl,
    ...props
}) {
    const insets = useSafeAreaInsets();
    const contentStyles = [
        styles.content,
        { paddingTop: 20 + (safeTop ? insets.top : 0), paddingBottom: 24 + insets.bottom },
        centered && styles.centered,
        contentStyle,
    ];
    return (
        <View style={[styles.container, style]}>
            {scroll ? (
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={contentStyles}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
                    automaticallyAdjustKeyboardInsets
                    showsVerticalScrollIndicator={false}
                    refreshControl={refreshControl}
                    {...props}
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={contentStyles} {...props}>
                    {children}
                </View>
            )}
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    scroll: { flex: 1 },
    content: {
        flexGrow: 1,
        width: "100%",
        maxWidth: 720,
        alignSelf: "center",
        paddingHorizontal: 20,
    },
    centered: { justifyContent: "center" },
});
