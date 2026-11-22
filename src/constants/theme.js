export const colors = {
    background: "#F5F3EE",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    surfaceRaised: "#EAF0E9",
    border: "#D8DED7",
    text: "#203B35",
    muted: "#61736B",
    subtle: "#758078",
    lime: "#285548",
    accent: "#285548",
    primary: "#285548",
    onLime: "#FFFFFF",
    error: "#A03026",
    errorSurface: "#FFF1EE",
    success: "#285548",
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
