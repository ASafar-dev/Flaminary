export const colors = {
    background: "#F3F5F8",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    surfaceRaised: "#E8EEF8",
    border: "#D5DCE6",
    text: "#1F2937",
    muted: "#5C6678",
    subtle: "#697586",
    accent: "#315AA8",
    primary: "#315AA8",
    onPrimary: "#FFFFFF",
    error: "#B42335",
    errorSurface: "#FFF0F2",
    errorBorder: "#EABCC5",
    success: "#315AA8",
};
export const spacing = { xs: 4, sm: 8, md: 12, lg: 20, xl: 24, xxl: 32, screen: 20 };
export const radii = { sm: 8, md: 10, lg: 12, pill: 10 };
export const typography = {
    eyebrow: { fontSize: 14, fontWeight: "500", lineHeight: 21 },
    title: { fontSize: 28, fontWeight: "600", lineHeight: 35 },
    heading: { fontSize: 24, fontWeight: "600", lineHeight: 30 },
    body: { fontSize: 16, lineHeight: 24 },
    small: { fontSize: 14, lineHeight: 21 },
    label: { fontSize: 16, fontWeight: "500", lineHeight: 23 },
};
export const theme = { colors, spacing, radii, typography };
export default theme;
