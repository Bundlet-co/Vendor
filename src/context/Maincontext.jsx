/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { EMAIL_REGEX, PWD_REGEX } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";


const MainContext = createContext( {} );

export const MainProvider = ( { children } ) =>
{
  const navigate = useNavigate();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  //Toast States
  const [ show, setShow ] = useState( false )
  const [ message, setMessage ] = useState( "" )
  const [ status, setStatus ] = useState( "" )
  const [ persist, setPersist ] = useState( () =>
  {
    const storedValue = localStorage.getItem("persist");
  return storedValue ? JSON.parse(storedValue) : false;
  } );
  //user state
  const [ user, setUser ] = useState( {} );
  const [ loading, setLoading] = useState(false)
  const [ formData, setFormData ] = useState( {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    confirmPassword: "",
    code:""
  } )
  const [timeInSec,setTimeInSec] = useState(0)
    const [ dp, setDp ] = useState( null );

  const closeToast = () =>
  {
    setShow( false )
    setMessage( "" )
    setStatus("")
  }

  const openToast = (message,status) =>
  {
    
    setMessage( message ),
      setStatus( status );
    setShow( true )
  }

  const loginSubmit = async () =>
  {
    try {
      setLoading( true );
      const res = await axios.post( '/auth/login', formData, {
        headers:{"Content-Type":"application/json"}
      } )
      const result = await res.data.data
      setUser( result.user );
      openToast( "Login successfully", "success" )
      navigate(from,{replace:true})
    } catch ( error ) {
      setStatus("error")
      if ( !error.response ) {
        openToast("No server response","error")
      } else if ( error.response?.status === 400 ) {
        openToast("Email and password missing","error")
      } else if ( error.response?.status === 404 ) {
        openToast("Not a Vendor" , "error")
      } else if ( error.response?.status === 401 ) {
        setMessage(  );
        openToast("Invalid credentilas","error")
      } else {
        openToast(error.response.data.message, "error")
      }
    } finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  const registerSubmit = async () =>
  {
    const v1 = EMAIL_REGEX.test( formData.email );
    const v2 = PWD_REGEX.test( formData.password );
    if (!v1) {
      openToast( 'Enter a valid email',"error");
      return;
    }

    if (!v2) {
      openToast( 'Password must be 8 to 24 characters long which must include 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',"error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      openToast('Password does not match ',"error");
      return;
    }
    try {
      setLoading(true)
      const data = new FormData();
      data.append( "dp", dp )
      data.append( "email", formData.email )
      data.append( "name", formData.name )
      data.append( "password", formData.password )
      data.append( "address", formData.address )
      data.append( "phone", formData.phone )

      const res = await axios.post( '/auth/register', data, {
        headers:{"Content-Type":"multipart/form-data"}
      } )
      const result = await res.data
      openToast( result.message, "success" );
      setTimeInSec( 60 * 5 )
      setFormData({...formData,name:"",confirmPassword:"",address:"",phone:"",email:result.data.email})
      navigate("/verify")
    } catch (error) {
      console.error( error );
      openToast(error.response.data.message, "error")
    }finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }


  const resendOtp = async () =>
  {
    try {
      setLoading( true );
      setTimeInSec( 60 * 5 );
      await axios.get( `/verify${ formData.email }` );
      openToast("Otp code has bee sent successfully","success")
    }catch (error) {
      console.error( error );
      openToast(error.response.data.message, "error")
    }finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  const verifyCode = async () =>
  {
    try {
      setLoading(true)
      const res = await axios.post( '/verify', { email: formData.email,code:formData.code }, {
        headers: {
          "Content-Type":"application/json"
        }
      } )
      const result = res.data
      openToast( result.message, "success" );
      setFormData( {
        ...formData, name: "", confirmPassword: "", address: "", phone: "", code: ""
      } );
      await loginSubmit()
    }catch (error) {
      console.error( error );
      openToast(error.response.data.message, "error")
    }finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData , [e.target.name]: e.target.value });
  };


  useEffect( () =>
  {
    if ( timeInSec <= 0 ) return setTimeInSec( 0 );
    const interval = setInterval( () =>
    {
      setTimeInSec(prev=>prev-1)
    }, 1000 )
    
    return ()=> clearInterval(interval)
  },[timeInSec])
  
  return (
    <MainContext.Provider value={ {user,persist,setPersist,formData,handleChange,loginSubmit,loading,show,message,status,closeToast,setDp, registerSubmit, timeInSec,resendOtp,verifyCode,setUser,openToast} }>
      {children}
    </MainContext.Provider>
  )
}

export default MainContext