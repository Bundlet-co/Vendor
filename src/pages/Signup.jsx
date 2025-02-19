import { Button,  Image, Input } from "@nextui-org/react";
import {  useState } from "react";
import { BsEnvelope, BsEyeFill, BsEyeSlashFill, BsLock, BsPerson, BsPhone } from "react-icons/bs";
import useMainContext from "../hooks/useMainContext";
import { Link } from "react-router-dom";
import { FaLocationDot, FaPencil } from "react-icons/fa6";
import thumb from "../Assets/img/thumb.png"

const Signup = () =>
{
  const { formData, handleChange, loading,setDp,registerSubmit } = useMainContext()
  const [img, setImg] = useState(thumb)
  const [ showPassword, setShowPassword ] = useState( false );
  const [ isVisible, setIsVisible ] = useState( false );

  const toggleVisibility = ( setState, state ) =>
  {
    setState(!state)
  }
  const handleFileChange = ( e ) =>
  {
    const file = e.target.files[ 0 ];
    setDp( file );

    if ( file ) {
      const previewUrl = URL.createObjectURL( file );
      setImg(previewUrl)
    } else {
      setImg(thumb)
    }
    
  }
  
  
  return (
    <section className="h-[100dvh] flex justify-center items-center w-full">
      <div className="w-full md:w-11/12 lg:w-3/4 2xl:w-1/2 shadow-md border rounded-md py-4 px-8">
        <p className="text-primary text-2xl font-bold text-center my-4">Welcome To Bundlet</p>
        <p className="text-lg font-thin">Register</p>
        <hr className="mb-8"/>
        <div className="my-4 flex items-center justify-between">
          {/* Form input */}
          <div className="grid grid-cols-2 gap-4 lg:gap-8 p-4 flex-1">
            <div className="col-span-2 lg:col-span-1">
              <Input
                type="text"
                name="name"
                value={ formData?.name }
                onChange={handleChange}
                label="Name"
                labelPlacement="outside"
                startContent={ <BsPerson size={ 18 } /> }
                placeholder="Enter your Fullname"
                variant="underlined"
                color="primary"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                type="email"
                name="email"
                value={ formData?.email }
                onChange={handleChange}
                label="Email"
                labelPlacement="outside"
                startContent={ <BsEnvelope size={ 18 } /> }
                placeholder="Enter your email address"
                variant="underlined"
                color="primary"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                type={ isVisible ? "text" : "password" }
                endContent={
                  <button className="focus:outline-none" type="button" onClick={()=>toggleVisibility(setIsVisible,isVisible)}>
                  {isVisible ? (
                    <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                  </button>
                }
                name="password"
                value={ formData?.password }
                onChange={handleChange}
                label="Password"
                labelPlacement="outside"
                startContent={ <BsLock size={ 18 } /> }
                placeholder="Enter a preferred password"
                variant="underlined"
                color="primary"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                type={ showPassword ? "text" : "password" }
                endContent={
                  <button className="focus:outline-none" type="button" onClick={()=>toggleVisibility(setShowPassword,showPassword)}>
                  {showPassword ? (
                    <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                  )}
                  </button>
                }
                name="confirmPassword"
                value={ formData?.confirmPassword }
                onChange={handleChange}
                label="Confirm Password"
                labelPlacement="outside"
                startContent={ <BsLock size={ 18 } /> }
                placeholder="Confirm your password"
                variant="underlined"
                color="primary"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                type="text"
                name="address"
                value={ formData?.address }
                onChange={handleChange}
                label="Address"
                labelPlacement="outside"
                startContent={ <FaLocationDot size={ 18 } /> }
                placeholder="Enter your residential address"
                variant="underlined"
                color="primary"
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <Input
                type="tel"
                name="phone"
                value={ formData?.phone }
                onChange={handleChange}
                label="Telephone"
                labelPlacement="outside"
                startContent={ <BsPhone size={ 18 } /> }
                placeholder="Enter your phone number"
                variant="underlined"
                color="primary"
              />
            </div>
          </div>
          {/* Form image */ }
          <div className="h-72 border relative rounded-md">
            <div className="w-full relative flex items-center justify-center h-full p-4">
              <Image src={img} className="h-64 w-64 object-contain"/>
            </div>
            <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
              <div className="border w-10 h-10 flex items-center justify-center">
                <label htmlFor="hero_image" role="button"><FaPencil /></label>
                <input type="file" name="hero_image" id="hero_image" onChange={handleFileChange} className="hidden" />
              </div>
            </div>
          </div>
        </div>
        <div className="my-2 flex justify-end items-center">
          <Button isLoading={loading} isDisabled={loading} color="primary" onClick={registerSubmit}>Register</Button>
        </div>
        <hr />
        <div className="text-center">
          <p>Already a vendor? <Link to="/login" className="text-primary">Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default Signup