export const colors = {
  background: "#111610", surface: "#1C231A", card: "#1C231A", surfaceRaised: "#263020",
  border: "#303C2B", text: "#F4F3E9", muted: "#A3AD9C", subtle: "#747F6E",
  lime: "#D9FC80", accent: "#D9FC80", primary: "#D9FC80", onLime: "#17200E",
  error: "#FFB4A5", errorSurface: "#35231F", success: "#D9FC80",
};
export const spacing = { xs: 4, sm: 8, md: 12, lg: 20, xl: 28, xxl: 40, screen: 24 };
export const radii = { sm: 10, md: 16, lg: 24, pill: 100 };
export const typography = {
  eyebrow: { fontSize: 11, fontWeight: "700", letterSpacing: 2.2, lineHeight: 18 },
  title: { fontSize: 34, fontWeight: "800", letterSpacing: -1.2, lineHeight: 39 },
  heading: { fontSize: 24, fontWeight: "700", letterSpacing: -0.6, lineHeight: 30 },
  body: { fontSize: 15, lineHeight: 23 }, small: { fontSize: 12, lineHeight: 18 },
  label: { fontSize: 13, fontWeight: "600", lineHeight: 20 },
};
export const theme = { colors, spacing, radii, typography };
export default theme;
