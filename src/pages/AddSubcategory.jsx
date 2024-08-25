import { Button, Input, Textarea,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Popover, PopoverTrigger, PopoverContent, Select, SelectItem } from "@nextui-org/react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";

const AddSubcategory = () =>
{
  const category = [
    {
      name: "Cooler",
      category:[ "Electronics"],
      productAmount: 20,
      status: true,
    },
    {
      name: "Cooler",
      category:[ "Electronics"],
      productAmount: 20,
      status: true,
    },
    {
      name: "Cooler",
      category:[ "Electronics"],
      productAmount: 20,
      status: true,
    },
    {
      name: "Cooler",
      category:[ "Electronics"],
      productAmount: 20,
      status: true,
    },
    {
      name: "Cooler",
      category:[ "Electronics"],
      productAmount: 20,
      status: true,
    },
  ]
  
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">sub Category</p>

      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="col-span-full lg:col-span-5 border rounded-lg p-3 h-fit">
          <p className="font-bold text-lg capitalize">Add new category</p>
          {/* Form data */ }
          <div className="my-4 grid grid-cols-1 gap-4">
            <div className="w-full">
              <Select label="Main Category" labelPlacement="outside" placeholder="Select Main category" required>
                <SelectItem>Clothe</SelectItem>
                <SelectItem>Electronics</SelectItem>
                <SelectItem>Computer</SelectItem>
                <SelectItem>Furniture</SelectItem>
                <SelectItem>Costmetics</SelectItem>
                <SelectItem>Perfume</SelectItem>
                <SelectItem>Shoes</SelectItem>
              </Select>
            </div>
            <div className="w-full">
              <Input
                label="Name"
                labelPlacement="outside"
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="w-full">
              <Input
                label="Slug"
                labelPlacement="outside"
                type="text"
                placeholder="Slug"
              />
            </div>
            <div className="w-full">
              <Textarea
                label="Sort description"
                labelPlacement="outside"
                type="text"
                placeholder="Sort description"
              />
            </div>
            <div className="w-full">
              <Textarea
                label="Product Details"
                labelPlacement="outside"
                type="text"
                placeholder="Full description"
              />
            </div>
            <div className="w-full">
              <Input
                label="Product Tag ( Make comma to separate tags )"
                labelPlacement="outside"
                type="text"
                placeholder="Product tag"
              />
            </div>
            <div className="w-full my-4">
              <Button color="primary" variant="flat">Submit</Button>
            </div>
          </div>
        </div>
        <div className="col-span-full lg:col-span-7 border rounded-lg p-3">
          <div className="border-b my-4 flex items-center justify-between py-2">
            <Input
              type="search"
              placeholder="Search..."
              endContent={ <BsSearch role="button" size={ 18 } />}
            />
          </div>
          <Table aria-label="Product List">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Main Category</TableColumn>
              <TableColumn>Product</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody>
              { category.map( item => (
                <TableRow key={ category.indexOf( item ) + 1 }>
                  <TableCell>{ item.name }</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <p className="bg-primary p-2 rounded-lg text-default">{ item.category.length }</p>
                      { item.category.map( sub => (
                          <p className="bg-neutral-200 p-2 rounded-lg"key={item.category.indexOf(sub)}>{ sub }</p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{ item.productAmount }</TableCell>
                  <TableCell className={item.status ? "text-success" :"text-danger"}>{ item.status ? "Active" : "Inactive" }</TableCell>
                  <TableCell>
                    <Popover showArrow placement="bottom" color="default">
                      <PopoverTrigger>
                        <Button variant="ghost" size="sm">
                          <BsGear size={18}/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col space-y-2">
                          <Button variant="flat" color="primary"><FaPencil/> Edit</Button>
                          <Button variant="flat" color="danger"><FaTrash/> Delete</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default AddSubcategory