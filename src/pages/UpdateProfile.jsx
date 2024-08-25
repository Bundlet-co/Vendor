import {Button, Image, Popover, PopoverContent, PopoverTrigger,Input,Textarea} from "@nextui-org/react"
import { BsThreeDotsVertical } from "react-icons/bs";

const UpdateProfile = () => {
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Update Profile</p>

      <div className="grid grid-cols-6 my-5 gap-4">
        <div className="border col-span-full lg:col-span-2 px-4 py-10 rounded-lg">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center flex-col gap-4">
              <Image src="/favicon.ico" className="w-16 h-16 object-contain" />
              {/* name */}
              <Input placeholder="Name" type="text"/>
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
          <div className="my-4 p-4 space-y-8">
            <Input
                label="Name"
                labelPlacement="outside"
                type="text"
                placeholder="Name"
              />
            <Input
                label="Company"
                labelPlacement="outside"
                type="text"
                placeholder="Company"
              />
            <Input
                label="Website"
                labelPlacement="outside"
                type="url"
                placeholder="Website url"
              />
            <Input
                label="Location"
                labelPlacement="outside"
                type="text"
                placeholder="Location"
              />
          </div>
        </div>
        <div className="border col-span-full lg:col-span-4 p-4 rounded-lg">
          <p className="font-bold text-lg capitalize">Account Details</p>
          <p className="font-bold text-tiny text-neutral-500">From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</p>

          {/* Informations */ }
          <div className="grid grid-cols-6 gap-4 mt-4">
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border space-y-8">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">E-mail address</p>
              <Input
                label="Email 1:"
                labelPlacement="outside"
                type="text"
                placeholder="name@example.com"
              />
            <Input
                label="Email 2:"
                labelPlacement="outside"
                type="text"
                placeholder="name@example.com"
              />
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border space-y-8">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Contact Number</p>
              <Input
                label="Phone number 1:"
                labelPlacement="outside"
                type="tel"
                placeholder="0912346578"
              />
            <Input
                label="Phone number 2:"
                labelPlacement="outside"
                type="tel"
                placeholder="0912346578"
              />
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border space-y-8">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">address</p>
              <Textarea placeholder="Enter your address"/>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border space-y-8">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">address 2</p>
              <Textarea placeholder="Enter your address"/>
            </div>
            <div className="col-span-full lg:col-span-3 shadow p-4 rounded border space-y-8">
              <p className="capitalize text-medium border p-2 bg-neutral-200 rounded-md">Bank Accounts</p>
              <Input
                label="Account Name:"
                labelPlacement="outside"
                type="text"
                placeholder="John Doe"
              />
            <Input
                label="Account Number:"
                labelPlacement="outside"
                type="number"
                placeholder="0912346578"
              />
              <Input
                label="Bank Name"
                labelPlacement="outside"
                type="text"
                placeholder="United Bank"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile