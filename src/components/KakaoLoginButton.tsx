import { singInWithProvider } from '../_database/supabase'
import useMovieStore from '../_store/store'
import KakaoLogo from './KakaoLogo'
import "./kakaoLoginButton.css"

const KakaoLoginButton = () => {
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)
  const setLoginError = useMovieStore((state) => state.setLoginError)
  
  const handleClick = () => {
    singInWithProvider("kakao", setProviderCredentialResponse, setLoginError)
  }
  
  return (
    <div className="flex kakao-button p-3 rounded-lg cursor-pointer font-semibold items-center gap-3"
      onClick={handleClick}>
      <KakaoLogo className="h-[20px]" />
      <p className="mx-auto leading-none">Login with Kakao</p>
    </div>
  )
}

export default KakaoLoginButton