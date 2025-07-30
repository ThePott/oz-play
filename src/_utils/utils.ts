// import type { MovieCardInfo } from "../_interfaces/interfaces";

export const filterOnlySafe = (movieCardInfoArray: any[]) => {
    const filteredArray = movieCardInfoArray.filter((movieCardInfo) => movieCardInfo.overview)
    return filteredArray
}


export const makeButtonSx = (variant: "OUTLINED" | "TEXT", isDark: boolean) => {
    const sx = {
        fontSize: "16px",
        fontWeight: 600,
        color: isDark ? "oklch(0.75 0 0)" : "oklch(0.15 0 0)",
    }
    if (variant === "TEXT") { return sx }

    const borderSx = {
        borderColor: isDark ? "oklch(0.45 0 0)" : "oklch(0.45 0 0)"
    }
    return { ...sx, ...borderSx }
}