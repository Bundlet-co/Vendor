import { BsSearch } from "react-icons/bs";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";


const Order = () =>
{
  const axiosPrivate = useAxiosPrivate()
  const [ orders, setOrders ] = useState( [] );
  const navigate = useNavigate()



  useEffect( () =>
  {
    ( async() =>
    {
      try {
        const res = await axiosPrivate.get( `/order` )
        setOrders( res.data.data.orders )
      } catch (error) {
        console.error(error);
      }
    })()
  },[axiosPrivate])
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
            <TableColumn>Status</TableColumn>
            <TableColumn>Address</TableColumn>
          </TableHeader>
          <TableBody>
            { orders.map( item => (
              <TableRow key={ item.id } onClick={ () => navigate(`/order/${item.id}`) } role="button">
                <TableCell>{ orders.indexOf(item)+1 }</TableCell>
                <TableCell>
                  <div className="flex space-x-2 items-center">
                    <Image src={ item.products[0].product.dp } className="w-10 h-10 object-contain" />
                    <p>{ item.products[0].product.name }</p>
                  </div>
                </TableCell>
                <TableCell>{ item.user.name }</TableCell>
                <TableCell>&#8358;{ item.netAmount }</TableCell>
                <TableCell className={item.status.toLowerCase() === "accepted" ||item.status.toLowerCase() === "delivered" ? "capitalize text-success" : item.status.toLowerCase() === "pending" || item.status.toLowerCase() === "out_for_delivery" ? "capitalize text-warning" : "capitalize text-danger"}>{ item.status }</TableCell>
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