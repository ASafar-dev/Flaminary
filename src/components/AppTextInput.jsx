import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radii, typography } from "../constants/theme";

export default function AppTextInput({
    label,
    error,
    style,
    containerStyle,
    onFocus,
    onBlur,
    multiline,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    return (
        <View style={[styles.field, containerStyle]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <TextInput
                placeholderTextColor={colors.subtle}
                selectionColor={colors.lime}
                underlineColorAndroid="transparent"
                accessibilityLabel={label || props.accessibilityLabel || props.placeholder}
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "center"}
                {...props}
                onFocus={(event) => {
                    setFocused(true);
                    if (onFocus) onFocus(event);
                }}
                onBlur={(event) => {
                    setFocused(false);
                    if (onBlur) onBlur(event);
                }}
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    focused && styles.focused,
                    error && styles.invalid,
                    style,
                ]}
            />
            {error ? (
                <Text accessibilityLiveRegion="polite" style={styles.error}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
}
const styles = StyleSheet.create({
    field: { marginBottom: 16 },
    label: { ...typography.label, color: colors.text, marginBottom: 8 },
    input: {
        minHeight: 50,
        backgroundColor: colors.surface,
        color: colors.text,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: radii.md,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        lineHeight: 24,
    },
    multiline: { minHeight: 112 },
    focused: { borderColor: colors.lime },
    invalid: { borderColor: colors.error },
    error: { ...typography.small, color: colors.error, marginTop: 7 },
});
