import { StyleSheet } from "react-native";

const colors = {
    accent: "#F72B2B",
    primary: "#D61B1F",
    secondary: "#3A3232",
    tertiary: "#ED6004",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#D9D2D2",
    gray2: "#F6F5F5",
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.primary },
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5, backgroundColor: '#000' },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth }
});

export default styles;