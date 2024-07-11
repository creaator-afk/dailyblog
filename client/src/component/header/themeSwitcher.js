import material from "../../material";

export function getTheme(isDark) {
    return isDark ? (material().dark):(material().light);
}