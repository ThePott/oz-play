import { createClient } from "@supabase/supabase-js"

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

export const signInWithEmail = async (email: string, password: string, setUser: (user: any | null) => void) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,

    })

    console.log("---- data of sign iiiiin:", data, "---- error:", error)

    if (error) {
        console.error("---- ERROR OCCURRED:", error)
        return
    }

    setUser(data.user)
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