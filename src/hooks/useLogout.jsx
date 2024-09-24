import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";
import useMainContext from "./useMainContext";


const useLogout = () => {
  const { setUser,openToast, closeToast } = useMainContext()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  
  const logout = async () =>
  {
    try {
      await axiosPrivate.get( '/logout' );
      setUser( {} );
      openToast( 'Logged out successfully', "success" );
      navigate('/login')
    } catch (error) {
      if ( !error?.response ) return openToast( 'No server error', "error" );
      openToast( 'Internal server error', "error" );
    }finally {
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  return logout
}

export default useLogout