const url = `https://accounts.google.com/signin/oauth/error/
v2?authError=ChVyZWRpcmVjdF91cmlfbWlzbWF0Y2gSwQEK7JWx7J20IEdvb2dsZeydmCBPQXV0aCAyLjAg7KCV7LGF7J2EIOykgOyImO2VmOyngCDslYrquLAg65WM66y47JeQIOyVseyXkCDroZzqt7jsnbjtlaAg7IiYIOyXhuyKteuLiOuLpC4KCuyVsSDqsJzrsJzsnpDrnbzrqbQgR29vZ2xlIENsb3VkIENvbnNvbGXsl5DshJwg66as65SU66CJ7IWYIFVSSeulvCDrk7HroZ3tlZjshLjsmpQuCiAgGm1odHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3dlYi1zZXJ2ZXIjYXV0aG9yaXphdGlvbi1lcnJvcnMtcmVkaXJlY3QtdXJpLW1pc21hdGNoIJADKkkKDHJlZGlyZWN0X3VyaRI5aHR0cHM6Ly9oeWxweWhxeW1rcGp3cHJhdHFxYi5zdXBhYmFzZS5jby9hdXRoL3YxL2NhbGxiYWNrMrUCCAESwQEK7JWx7J20IEdvb2dsZeydmCBPQXV0aCAyLjAg7KCV7LGF7J2EIOykgOyImO2VmOyngCDslYrquLAg65WM66y47JeQIOyVseyXkCDroZzqt7jsnbjtlaAg7IiYIOyXhuyKteuLiOuLpC4KCuyVsSDqsJzrsJzsnpDrnbzrqbQgR29vZ2xlIENsb3VkIENvbnNvbGXsl5DshJwg66as65SU66CJ7IWYIFVSSeulvCDrk7HroZ3tlZjshLjsmpQuCiAgGm1odHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3dlYi1zZXJ2ZXIjYXV0aG9yaXphdGlvbi1lcnJvcnMtcmVkaXJlY3QtdXJpLW1pc21hdGNo&client_id=809758090882-oqbm693qv3m6rgvs8caf0bmqs97lpdft.apps.googleusercontent.com&flowName=GeneralOAuthFlow`

// import { useNavigate, type NavigateFunction } from "react-router"
// import { supabase } from "../../_database/supabase"

// import type { accounts, CredentialResponse } from 'google-one-tap'
// import GoogleLoginButton from "../../components/GoogleLoginButton"
// import { useEffect, useRef } from "react"
// import { Box } from "@mui/material"

// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// declare const google: { accounts: accounts }

// const generateNonce = async (): Promise<string[]> => {
//   const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
//   const encoder = new TextEncoder()
//   const encodedNonce = encoder.encode(nonce)
//   const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
//   const hashArray = Array.from(new Uint8Array(hashBuffer))
//   const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
//   return [nonce, hashedNonce]
// }

// export const initializeGoogleOneTap = async (navigate: NavigateFunction, buttonRef: React.RefObject<HTMLDivElement | null>) => {
//   if (typeof google === 'undefined') {
//     setTimeout(() => initializeGoogleOneTap(navigate, buttonRef), 100)
//     return
//   }

//   const [nonce, hashedNonce] = await generateNonce()
//   const { data, error } = await supabase.auth.getSession()
//   if (error) {
//     console.error('---- Error getting session', error)
//   }

//   if (data.session) {
//     navigate('/')
//     return
//   }

//   /* global google */
//   google.accounts.id.initialize({
//     client_id: clientId,
//     callback: async (response: CredentialResponse) => {
//       try {
//         const { data, error } = await supabase.auth.signInWithIdToken({
//           provider: 'google',
//           token: response.credential,
//           nonce,
//         })
//         if (error) { throw error }

//         navigate('/')
//       } catch (error) {
//         console.error('---- Error logging in with Google One Tap', error)
//       }
//     },
//     nonce: hashedNonce,
//     use_fedcm_for_prompt: true,
//   })
//   google.accounts.id.prompt()

//   // Render the button
//   if (buttonRef.current) {
//     google.accounts.id.renderButton(buttonRef.current, {
//       theme: 'outline',
//       size: 'large',
//       type: 'standard',
//       text: 'signin_with',
//       shape: 'rectangular',
//     })
//   }
// }



const TestPage = () => {
  // const buttonRef = useRef<HTMLDivElement>(null)
  // const navigate = useNavigate()

  // useEffect(
  //   () => {
  //     initializeGoogleOneTap(navigate, buttonRef)
  //   },
  //   []
  // )


  return (
    <>TEST PAGE
      {/* <GoogleLoginButton /> */}
      {/* <Box className="w-fit">
        <div ref={buttonRef}></div>
      </Box> */}
    </>
  )
}

export default TestPage