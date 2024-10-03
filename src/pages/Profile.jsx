import {Button, Image, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react"
import { BsBoxArrowDown, BsBoxArrowUp, BsThreeDotsVertical } from "react-icons/bs";
import useMainContext from "../hooks/useMainContext";
import { dev_url } from "../utils/axios";
import { FaWallet } from "react-icons/fa6";

const Profile = () =>
{
  const { user } = useMainContext()
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Profile</p>

      <div className="grid grid-cols-6 my-5 gap-4">
        <div className="border col-span-full lg:col-span-2 px-4 py-10 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-4">
              <Image src={user?.dp ? `${dev_url.replace("/merchant","")}/${user.dp.replace("public/","")}` :"/favicon.ico"} className="w-16 h-16 object-contain" />
              {/* name */}
              <p className="capitalize text-xl font-bold text-neutral-700">{user?.name}</p>
              {/* email */ }
              <p className="text-sm text-neutral-500">{ user?.email }</p>
              {/* Edit Button */ }
              <div className="flex space-x-2 items-center">
                <Button color="primary">Edit Profile</Button>
                <Popover showArrow placement="bottom" color="default">
                    <PopoverTrigger>
                      <Button variant="ghost" size="sm">
                        <BsThreeDotsVertical size={18}/>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col space-y-2">
                        <Button variant="flat" isDisabled={user.status.toLowerCase() === "online" ? true : false} className="font-bold capitalize" color="success"> Online</Button>
                        <Button variant="flat" isDisabled={user.status.toLowerCase() === "offline" ? true : false}  className="font-bold capitalize" color="danger">Offline</Button>
                        <Button variant="flat" isDisabled={user.status.toLowerCase() === "busy" ? true : false}  className="font-bold capitalize" color="warning">Busy</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
              </div>
            </div>
          </div>
          <hr className="border-neutral-300 my-4" />
          <div className="my-4 space-y-4">
            <p className="text-medium capitalize font-serif">Name: {user?.name}</p>
            <p className="text-medium capitalize font-serif">Company: { user?.company ? user?.company : "N/A" }</p>
            <p className="text-medium capitalize font-serif">website: { user?.website ? user?.website : "N/A" }</p>
            <p className="text-medium capitalize font-serif">phone: { user?.phone ? user?.phone : "N/A" }</p>
            <p className="text-medium capitalize font-serif">location: { user?.address ? user?.address : "N/A" }</p>
          </div>
        </div>
        <div className="border col-span-full lg:col-span-4 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="font-bold text-lg capitalize">Account Details</p>
            <Popover shoArrow placement="button" color="daefault">
              <PopoverTrigger>
                <Button variant="ghost" size="sm" className="flex space-x-2">
                  <FaWallet />
                  <span>{user?.balance ? user.balancece :'0.00' }</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-40">
                <div className="w-full p-2">
                  <p className="flex items-center space-x-2 hover:bg-neutral-300 rounded-lg p-2" role="button">
                    <BsBoxArrowDown />
                    <span>Deposit</span>
                  </p>
                  <hr className="my-1 border" />
                  <p className="flex items-center space-x-2 hover:bg-neutral-300 rounded-lg p-2" role="button">
                    <BsBoxArrowUp />
                    <span>Withdraw</span>
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className="font-bold text-tiny text-neutral-500">From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</p>

          {/* Informations */ }
          <div className="grid grid-cols-6 gap-4 mt-4">
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">E-mail address</p>
              <p className="text-small my-3 ps-4 text-neutral-500">{ user?.email }</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Contact Number</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Phone Number: { user?.phone ? user?.phone : "N/A" }</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">address</p>
              <p className="text-small my-3 ps-4 text-neutral-500">{ user?.address ? user?.address : "N/A" }</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Bank Accounts</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Acount Name: { user?.account_name ? user?.account_name : "N/A" }</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Account Number: { user?.account_number ? user?.account_number : "N/A" }</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Bank Name: { user?.bank_name ? user?.bank_name : "N/A" }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile