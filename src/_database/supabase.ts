import { createClient } from "@supabase/supabase-js"

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(projectUrl, apiKey)

export const signUp = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: name,
            }
        }
    })

    console.log("---- data of sign UP:", data, "---- error:", error)
}

export const signInWithEmail = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'thisisemail@gmail.com',
        password: 'andletssupposethisispassword',
    })

    console.log("---- data of sign iiiiin:", data, "---- error:", error)
}