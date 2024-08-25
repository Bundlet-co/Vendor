import { BsSearch } from "react-icons/bs";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input} from "@nextui-org/react";


const Order = () =>
{
  const products = [
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
    {
      image: "/assets/img/product/1.jpg",
      name: "Men t-shirt",
      customerName: "Jhon doe",
      amount: 4000,
      quantity: 12,
      stock: 478,
      status: "pending",
      address:"Test street America"
    },
  ]
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Order list</p>

      {/* table */ }
      <div className="border rounded-lg p-3 mt-4">
        <div className="border-b my-4 flex items-center justify-between py-2">
          <p className="font-bold text-lg capitalize">Recent Order</p>
          <div>
            <Input
              type="search"
              placeholder="Search..."
              endContent={ <BsSearch role="button" size={ 18 } />}
            />
          </div>
        </div>

        {/* Order table */ }
        <Table aria-label="Product List">
          <TableHeader>
            <TableColumn>S/N</TableColumn>
            <TableColumn>Product</TableColumn>
            <TableColumn>Customer</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Address</TableColumn>
          </TableHeader>
          <TableBody>
            { products.map( item => (
              <TableRow key={ products.indexOf( item ) + 1 }>
                <TableCell>{ products.indexOf(item)+1 }</TableCell>
                <TableCell>
                  <div className="flex space-x-2 items-center">
                    <Image src={ item.image } className="w-10 h-10 object-contain" />
                    <p>{ item.name }</p>
                  </div>
                </TableCell>
                <TableCell>{ item.customerName }</TableCell>
                <TableCell>&#8358;{ item.amount }</TableCell>
                <TableCell>{ item.quantity }</TableCell>
                <TableCell>{ item.stock }</TableCell>
                <TableCell className={item.status.toLowerCase() === "paid" ? "capitalize text-success" : item.status.toLowerCase() === "pending" ? "capitalize text-warning" : "capitalize text-danger"}>{ item.status }</TableCell>
                <TableCell>{ item.address }</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Order