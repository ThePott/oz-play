import type { MovieCardInfo } from "../_interfaces/interfaces";

export const filterOnlySafe = (movieCardInfoArray: MovieCardInfo[]) => {
    const filteredArray = movieCardInfoArray.filter((movieCardInfo) => movieCardInfo.overview)
    return filteredArray
}