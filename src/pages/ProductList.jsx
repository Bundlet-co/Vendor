import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input, Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";

const ProductList = () =>
{
  const products = [
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      price: 20,
      discount: 25,
      purchased: 61,
      stock: 5421,
      status: "active",
      date: '05/11/2023'
    },
    {
      image: "/assets/img/product/2.jpg",
      name: "sofa seat",
      price: 400,
      discount: 30,
      purchased: 80,
      stock: 25,
      status: "pending",
      date: '12/08/2022'
    },
    {
      image: "/assets/img/product/3.jpg",
      name: "Night lamp",
      price: 59,
      discount: 30,
      purchased: 100,
      stock: 56,
      status: "disable",
      date: '25/05/2021'
    },
    {
      image: "/assets/img/product/4.jpg",
      name: "Round cap Hoodie",
      price: 10,
      discount: 30,
      purchased: 250,
      stock: 568,
      status: "active",
      date: '13/09/2019'
    },
    {
      image: "/assets/img/product/5.jpg",
      name: "Digital Watch black",
      price: 582,
      discount: 30,
      purchased: 220,
      stock: 264,
      status: "pending",
      date: '18/02/2023'
    },
    {
      image: "/assets/img/product/6.jpg",
      name: "Digital Camera",
      price: 1254,
      discount: 20,
      purchased: 154,
      stock: 365,
      status: "disable",
      date: '15/11/2021'
    },
    {
      image: "/assets/img/product/7.jpg",
      name: "Headphone beater m3",
      price: 68,
      discount: 30,
      purchased: 159,
      stock: 789,
      status: "active",
      date: '23/04/2024'
    },
    {
      image: "/assets/img/product/8.jpg",
      name: "Camera drone fly b2",
      price: 120,
      discount: 80,
      purchased: 12,
      stock: 325,
      status: "active",
      date: '21/06/2023'
    },
    {
      image: "/assets/img/product/9.jpg",
      name: "Dill machine dregon g1",
      price: 20,
      discount: 10,
      purchased: 254,
      stock: 36,
      status: "pending",
      date: '12/12/2022'
    },
    {
      image: "/assets/img/product/10.jpg",
      name: "Fly cry drone camera",
      price: 548,
      discount: 50,
      purchased: 25,
      stock: 12,
      status: "disable",
      date: '12/05/2023'
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      price: 20,
      discount: 25,
      purchased: 61,
      stock: 5421,
      status: "active",
      date: '05/11/2023'
    },

    {
      image: "/assets/img/product/4.jpg",
      name: "Round cap Hoodie",
      price: 10,
      discount: 30,
      purchased: 250,
      stock: 568,
      status: "active",
      date: '13/09/2019'
    },
    {
      image: "/assets/img/product/5.jpg",
      name: "Digital Watch black",
      price: 582,
      discount: 30,
      purchased: 220,
      stock: 264,
      status: "pending",
      date: '18/02/2023'
    },
    {
      image: "/assets/img/product/6.jpg",
      name: "Digital Camera",
      price: 1254,
      discount: 20,
      purchased: 154,
      stock: 365,
      status: "disable",
      date: '15/11/2021'
    },
    {
      image: "/assets/img/product/7.jpg",
      name: "Headphone beater m3",
      price: 68,
      discount: 30,
      purchased: 159,
      stock: 789,
      status: "active",
      date: '23/04/2024'
    },
    {
      image: "/assets/img/product/8.jpg",
      name: "Camera drone fly b2",
      price: 120,
      discount: 80,
      purchased: 12,
      stock: 325,
      status: "active",
      date: '21/06/2023'
    },
    {
      image: "/assets/img/product/9.jpg",
      name: "Dill machine dregon g1",
      price: 20,
      discount: 10,
      purchased: 254,
      stock: 36,
      status: "pending",
      date: '12/12/2022'
    },
  ]
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Product List</p>

      {/* Table */ }
      <div className="border rounded-lg p-3 mt-4">
        <div className="border-b my-4 flex items-center justify-between py-2">
          <Input
            type="search"
            placeholder="Search..."
            endContent={ <BsSearch role="button" size={ 18 } />}
          />
        </div>
        <Table aria-label="Product List">
          <TableHeader>
            <TableColumn>Product</TableColumn>
            <TableColumn>Name</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Offer</TableColumn>
            <TableColumn>Purchased</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            { products.map( item => (
              <TableRow key={ products.indexOf( item ) + 1 }>
                <TableCell>
                  <Image src={item.image} className="w-10 h-10 object-contain" />
                </TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>&#8358;{ item.price }</TableCell>
                <TableCell>{ item.discount }% off</TableCell>
                <TableCell>{ item.purchased }</TableCell>
                <TableCell>{ item.stock }</TableCell>
                <TableCell className={item.status.toLowerCase() === "active" ? "capitalize text-success" : item.status.toLowerCase() === "pending" ? "capitalize text-warning" : "capitalize text-danger"}>{ item.status }</TableCell>
                <TableCell>{ item.date }</TableCell>
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
  )
}

export default ProductList