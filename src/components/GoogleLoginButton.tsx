import { Box } from '@mui/material'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// const GoogleLoginButton = () => {
//     return (
//         <Box className="w-fit">
//             <div id="g_id_onload"
//                 data-client_id={clientId}
//                 data-context="signin"
//                 data-ux_mode="popup"
//                 data-itp_support="true">
//             </div>

//             <div className="g_id_signin"
//                 data-type="standard"
//                 data-shape="rectangular"
//                 data-theme="outline"
//                 data-text="signin_with"
//                 data-size="large"
//                 data-logo_alignment="left">
//             </div>
//         </Box>
//     )
// }

// export default GoogleLoginButton

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useMovieStore from '../_store/store';
import { useNavigate } from 'react-router';

const GoogleLoginButton = () => {
    const setGoogleCredentialResponse = useMovieStore((state) => state.setGoogleCredentialResponse)
    const navigate = useNavigate()
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                        setGoogleCredentialResponse(res)
                        navigate("/")
                    }}
                    onError={() => {
                        console.error("---- One tap login failed")
                        // console.log(error);
                        return
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};

export default GoogleLoginButton