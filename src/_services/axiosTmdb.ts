import axios, { type AxiosResponse } from "axios"

/** do nothing */
const handleSuccess = (response: AxiosResponse<any, any>) => {
    // console.log("---- SUCCESS data:", response.data.length)
    return response
}

const handleFailure = (error: any) => {
    console.error("---- ERROR from TMDB:", error)
    return Promise.reject(error)
}

const axiosTmdb = axios.create({
    headers: { "Content-Type": "text/plain" }
})
axiosTmdb.interceptors.response.use(handleSuccess, handleFailure)
// ---- !!!!! fill in here !!!! ----
axiosTmdb.defaults.baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:3456/tmdb" : "http://todo-fill-in-here"

export { axiosTmdb }
