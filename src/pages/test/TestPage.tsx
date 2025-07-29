import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";

// 1. api key, project url env에서 꺼내오기
const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY

export const supabase = createClient(projectUrl, apiKey)

//2. 회원가입 함수 만들기 async 필요
const signUp = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: '1234example@email.com',
    password: '1234example-password',
  })

  console.log("---- data:", data, "----error:", error)
}



function App() {
  useEffect(() => {
    signUp()
  }, []);



  return (
    <div>
      TEST SUPABASE
    </div>
  );
}

export default App;