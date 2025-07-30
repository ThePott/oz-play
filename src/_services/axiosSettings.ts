import axios, { type AxiosResponse } from "axios"
const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

/** do nothing */
const handleSuccess = (response: AxiosResponse<any, any>) => {
    // console.log("---- SUCCESS data:", response.data.length)
    return response
}


const handleFailure = (error: any) => {
    // console.error("---- ERROR OCCURRED:", error.response.status)

    return Promise.reject(error)
}

const axiosMovie = axios.create({
    headers: { Authorization: `Bearer ${apiReadAccessToken}` }
})
axiosMovie.interceptors.response.use(handleSuccess, handleFailure)


export { axiosMovie }