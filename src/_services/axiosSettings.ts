import axios, { type AxiosResponse } from "axios"

/** do nothing */
const handleSuccess = (response: AxiosResponse<any, any>) => {
    // console.log("---- SUCCESS data:", response.data.length)
    return response
}


const handleFailure = (error: any) => {
    // console.error("---- ERROR OCCURRED:", error.response.status)

    return Promise.reject(error)
}

const axiosMovie = axios.create()
axiosMovie.interceptors.response.use(handleSuccess, handleFailure)

export { axiosMovie }