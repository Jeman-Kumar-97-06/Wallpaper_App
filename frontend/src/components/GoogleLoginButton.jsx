import { GoogleLogin } from '@react-oauth/google';
import { useAuthContext } from '../hooks/useAuthContext';

export const GoogleLoginButton = () => {
  const {dispatch} = useAuthContext();

  //If success do the following shit : 
  const handleSuccess = async (response) => {
    //Try sending a post request with credential as JSON body:
    try {
      const res = await fetch('http://localhost:4000/api/users/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      //After sending the POST request, you receive response:
      const data = await res.json();
      console.log(data._doc)
      //Now store the user data received from server on the client's localStorage:
      localStorage.setItem('wallpp_user',JSON.stringify(data));
      //Dispatch the login action to update state globally:
      dispatch({type:"LOGIN",payload:data._doc});
      console.log("Dispatched sucessfully")
    } catch (err) {
      console.error(err);
    }
  };
  //If there's an error do the following shit:
  const handleError = () => {
    console.log('Google login failed');
  };

  return (
    // Google button showed on screen:
    <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
  );
};