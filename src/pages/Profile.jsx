import {Button, Image, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs";

const Profile = () => {
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Profile</p>

      <div className="grid grid-cols-6 my-5 gap-4">
        <div className="border col-span-full lg:col-span-2 px-4 py-10 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-4">
              <Image src="/favicon.ico" className="w-16 h-16 object-contain" />
              {/* name */}
              <p className="capitalize text-xl font-bold text-neutral-700">John Doe</p>
              {/* email */ }
              <p className="capitalize text-sm text-neutral-500">john.doe@example.com</p>
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
                        <Button variant="flat" className="font-bold capitalize" color="success"> Online</Button>
                        <Button variant="flat" className="font-bold capitalize" color="danger">Offline</Button>
                        <Button variant="flat" className="font-bold capitalize" color="warning">Busy</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
              </div>
            </div>
          </div>
          <hr className="border-neutral-300 my-4" />
          <div className="my-4 space-y-4">
            <p className="text-medium capitalize font-serif">Name: John Doe</p>
            <p className="text-medium capitalize font-serif">Company: Bundlet</p>
            <p className="text-medium capitalize font-serif">website: www.example.com</p>
            <p className="text-medium capitalize font-serif">phone: +1234567890</p>
            <p className="text-medium capitalize font-serif">location: nigeria</p>
          </div>
        </div>
        <div className="border col-span-full lg:col-span-4 p-4 rounded-lg">
          <p className="font-bold text-lg capitalize">Account Details</p>
          <p className="font-bold text-tiny text-neutral-500">From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</p>

          {/* Informations */ }
          <div className="grid grid-cols-6 gap-4 mt-4">
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">E-mail address</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Email 1: support@example.com</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Email 2: support@example.com</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Contact Number</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Phone Number 1: 123456789</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Phone Number 2: 123456789</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">address</p>
              <p className="text-small my-3 ps-4 text-neutral-500">1234, Test strest, kansas, united states</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">address 2</p>
              <p className="text-small my-3 ps-4 text-neutral-500">1234, Test strest, kansas, united states</p>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Bank Accounts</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Acount Name: jhon doe</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Account Number: 123*******80</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Bank sort Code: 1234</p>
              <p className="text-small my-3 ps-4 text-neutral-500">Bank Name: United Bank of Africa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile