import { Avatar, Button, Image, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import logo from "../Assets/img/logo.png"
import {BsBell, BsSearch} from "react-icons/bs"
import { Link } from "react-router-dom";


const content = (
  <PopoverContent className="w-72">
    <div className="w-full p-2">
      <div>
        <p className="font-bold text-medium">Jone Doe</p>
        <p className="text-sm">jone.doe@example.com</p>
      </div>
      <hr className="my-2 border"/>
      <div className="flex flex-col gap-1">
        <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/profile">Profile</Link>
        <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/Help">Help</Link>
        <Link className="hover:bg-neutral-300 rounded-lg p-2" to="/project">Project</Link>
      </div>
      <hr className="my-2 border" />
      <Button color="danger" variant="flat">Log out</Button>
    </div>
  </PopoverContent>
)

const Header = () =>
{
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
                <Avatar src="/favicon.ico" size="sm" className="bg-gray-400 p-1" />
              </PopoverTrigger>
              {content}
            </Popover>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header