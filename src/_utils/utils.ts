import type { MovieCardInfo } from "../_interfaces/interfaces";

export const filterOnlySafe = (movieCardInfoArray: MovieCardInfo[]) => {
    const filteredArray = movieCardInfoArray.filter((movieCardInfo) => movieCardInfo.overview)
    return filteredArray
}

export const isSystemDark = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}