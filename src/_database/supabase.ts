import { createClient, type Provider } from "@supabase/supabase-js"

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(projectUrl, apiKey)

export const signUp = async (name: string, email: string, password: string, setUser: (user: any | null) => void) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
            },
        },

    })

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        return
    }

    setUser(data.user)
}

export const signInWithEmail = async (email: string, password: string, setUser: (user: any | null) => void, setLoginError: (loginError: any) => void) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,

    })

    console.log("---- data of sign iiiiin:", data, "---- error:", error)

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        setLoginError(error)
        return
    }

    // setUser(data.user)
    setLoginError(null)

    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    console.log("---- user from get:", user)
}

export const signOut = async (setUser: (user: any | null) => void) => {
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        return
    }

    console.log("---- signed out")

    setUser(null)
}

export const singInWithProvider = async (provider: Provider, setProviderCredentialResponse: (providerCredentialResponse: any) => void, setLoginError: (loginError: any) => void) => {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider })
    setProviderCredentialResponse(data)

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        setLoginError(error)
        return
    }
    setLoginError(null)
}

export const getUser = async (setUser: (user: any | null) => void, setProviderCredentialResponse: (providerCredentialResponse: any) => void) => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    setProviderCredentialResponse(null)

    // getFavoriteSet()
}

export const addToFavorites = async (user_id: string, movie_id: number) => {
    const { error: error1 } = await supabase
        .from('favorites')
        .insert({ user_id, movie_id })
    if (error1) {

        console.error("---- error:", user_id, "/", movie_id, "/", error1)
    }

    const { data, error } = await supabase
        .from('favorites')
        .select()
    console.log("---- res:", data, error)

    // const { error: dummyError } = await supabase
    //     .from('dummy')
    //     .insert({ message: "yayaya" })
    // console.error("---- dummy error:", dummyError)

    // const { data, error } = await supabase
    //     .from('favorites')
    //     .select()
}

export const getFavoriteSet = async (setFavoriteSet: (favoriteSet: Set<number>) => void) => {
    // export const getFavoriteSet = async (setFavoriteSet: (favoriteJson: any) => void) => {
    const { data, error } = await supabase
        .from('favorites')
        .select()
    console.log("---- favorites data:", data, "---- error:", error)
    if (!data) {
        console.error("---- fail to get favorite data, but not error in mystical reasons")
        debugger
        return
    }

    const movieIdArray = data.map((el) => el.id)
    const favoriteSet = new Set<number>(movieIdArray)
    setFavoriteSet(favoriteSet)
    //  const { error: error1 } = await supabase
    //     .from('favorites')
    //     .insert({ user_id, movie_id })
    // console.error("---- error:", user_id, "/", movie_id, "/", error1)
}