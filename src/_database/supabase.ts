import { createClient, type Provider } from "@supabase/supabase-js"
import type { FavoriteIdDict } from "../_store/store"

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
    const { data: _data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,

    })

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        setLoginError(error)
        return
    }

    setLoginError(null)

    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
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
}

export const toggleFavoriteInDb = async (user_id: string, movie_id: number, to: boolean) => {
    if (to) {
        const { error } = await supabase
            .from('favorites')
            .insert({ user_id, movie_id })
        if (error) {
            console.error("---- error:", user_id, "/", movie_id, "/", error)
        }
        return
    }

    const response = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user_id)
        .eq("movie_id", movie_id)
    console.log("---- response:", response)
}

export const getFavoriteIdDict = async (setFavoriteIdDict: (favoriteIdDict: FavoriteIdDict) => void) => {
    const { data, error: _error } = await supabase
        .from('favorites')
        .select()

    if (!data) {
        console.error("---- fail to get favorite data, but not error in mystical reasons")
        debugger
        return
    }

    const favoriteIdDict = data.reduce((acc: FavoriteIdDict, cur: any) => {
        cur.created_at = Number(new Date(cur.created_at))
        acc[cur.movie_id] = cur
        return acc
    }, {})

    setFavoriteIdDict(favoriteIdDict)
}