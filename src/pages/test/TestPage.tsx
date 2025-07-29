import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Box } from "@mui/material";

const projectUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const apiKey = import.meta.env.VITE_SUPABASE_API_KEY

const supabase = createClient(projectUrl, apiKey)

const getSupabase = async () => {
  const { data, error } = await supabase
    .from('characters')
    .select()

  console.log("---- get data:", data, "---- error:", error)
}

async function getInstruments(setInstruments: React.Dispatch<React.SetStateAction<any[] | null>>) {
  const { data } = await supabase.from("instruments").select();
  setInstruments(data);
}

async function signUp() {
  console.log("---- project url:", projectUrl)
  console.log("---- api key:", apiKey)


  const { data, error } = await supabase.auth.signUp({
    email: 'thisisemail@gmail.com',
    password: 'andletssupposethisispassword',
  })

  console.log("---- data of sign UP:", data, "---- error:", error)
}

const signInWithEmail = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'thisisemail@gmail.com',
    password: 'andletssupposethisispassword',
  })

  console.log("---- data of sign iiiiin:", data, "---- error:", error)
}

function App() {
  const [instruments, setInstruments] = useState<any[] | null>([]);

  useEffect(() => {
    // getInstruments(setInstruments)
    // signUp()
    signInWithEmail()

  }, []);



  return (
    <Box>
      TEST SUPABASE
      <ul>
        {instruments?.map((instrument) => (
          <li key={instrument.name}>{instrument.name}</li>
        ))}
      </ul>
    </Box>
  );
}

export default App;