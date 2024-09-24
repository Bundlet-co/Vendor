import { Avatar, Button, Image, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import logo from "../Assets/img/logo.png"
import {BsBell, BsSearch} from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import useMainContext from "../hooks/useMainContext";
import { dev_url } from "../utils/axios";
import useLogout from "../hooks/useLogout";



const Header = () =>
{
  const { user } = useMainContext()
  const logout = useLogout()
  const navigate = useNavigate()
  return (
    <header>
      <nav className="px-2 py-2 flex items-center gap-10"> 
        <div className="w-1/4 lg:w-1/5">
          <Image src={logo} alt="Logo" width="100%" className="object-contain h-12"/>
        </div>
        <div className="flex justify-between px-8 flex-grow">
          <div>
            <Input
              type="search"
              placeholder="Search..."
              endContent={ <BsSearch role="button" size={ 18 } />}
            />
          </div>
          <div className="flex space-x-5 items-center">
            <BsBell size={20}/>
            <Popover placement="bottom" color="default">
              <PopoverTrigger>
                <Avatar src={user?.dp ? `${dev_url.replace("/merchant","")}/${user.dp.replace("public/","")}` :"/favicon.ico"} size={user?.dp ? "md" : "sm"}  className="bg-gray-400" role="button"/>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="w-full p-2">
                  <div>
                    <p className="font-bold text-medium">{user?.name ? user.name :'Login/Signup' }</p>
                    <p className="text-sm">{ user?.email ? user.email : "example@email.com" }</p>
                  </div>
                  <hr className="my-2 border"/>
                  <div className="flex flex-col gap-1">
                    <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/profile">Profile</Link>
                    <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/Help">Help</Link>
                    <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/project">Project</Link>
                  </div>
                  <hr className="my-2 border" />
                  { user.name ? (
                    <Button color="danger" variant="flat" className="font-bold" onClick={logout}>Log out</Button>
                  ):<Button color="primary" variant="flat" className="font-bold" onClick={()=>navigate('/login')}>Login</Button>}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header