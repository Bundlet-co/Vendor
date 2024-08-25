import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input} from "@nextui-org/react";
import { BsSearch } from "react-icons/bs";

const RecentOrder = () =>
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
    <div className="my-4 border p-3 shadow-md rounded-lg">
      <div className="border-b my-4 flex items-center justify-between py-2">
        <p className="tex-xl font-bold">Recent Orders</p>
        <div>
          <Input
            type="search"
            placeholder="Search..."
            endContent={ <BsSearch role="button" size={ 18 } />}
          />
        </div>
      </div>
      <Table aria-label="Recent Orders">
        <TableHeader>
          <TableColumn>Product</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Order</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Total</TableColumn>
        </TableHeader>
        <TableBody>
          { products.map( item => (
            <TableRow key={ products.indexOf( item ) + 1 }>
              <TableCell className="flex items-center space-x-4">
                <Image src={item.image} className="w-10 h-10 object-contain" />
                <p className="capitalize">{ item.name }</p>
              </TableCell>
              <TableCell>&#8358;{ item.price }</TableCell>
              <TableCell>{ item.purchased }</TableCell>
              <TableCell>{ item.stock }</TableCell>
              <TableCell>&#8358;{ item.purchased }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RecentOrder