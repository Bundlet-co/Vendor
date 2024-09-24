import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input, Popover, PopoverTrigger, PopoverContent, Button, Spinner} from "@nextui-org/react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { dev_url } from "../utils/axios";
import useProductList from "../hooks/useProductList";

const ProductList = () =>
{
  const{products, isLoading,hasMore} = useProductList()


  
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
        <Table
          aria-label="Product List"
          isHeaderSticky
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={products.isLoading} variant="flat" onPress={products.loadMore}>
                  {products.isLoading && <Spinner color="primary" size="sm" />}
                  Load More
                </Button>
              </div>
            ) : null
          }
          classNames={{
            base: "max-h-[75dvh] overflow-scroll",
            table: "max-h-[70dvh] overflow-auto",
          }}
        >
          <TableHeader>
            <TableColumn key="dp">Product</TableColumn>
            <TableColumn key="name">Name</TableColumn>
            <TableColumn key="price">Price</TableColumn>
            <TableColumn key="quantity">Quantity</TableColumn>
            <TableColumn key="inStock">Status</TableColumn>
            <TableColumn key="createdAt">Date</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody isLoading={ isLoading } loadingContent={ <Spinner color="primary" /> } emptyContent={ products.items.length === 0 ? "No Product to display" : null } className="align-top">
            
            { products.items.map( item => (
              <TableRow key={ item.id } className="rounded-lg shadow-md h-10">
                <TableCell>
                  <Image src={`${dev_url.replace("/merchant","")}/${item.dp.replace("public/","")}`} className="w-10 h-10 object-contain" />
                </TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>&#8358;{ item.price }</TableCell>
                <TableCell>{ item.quantity }</TableCell>
                <TableCell className={item.inStock ? "capitalize text-success"  : "capitalize text-danger"}>{ item.inStock ? "available" : "unavailable" }</TableCell>
                <TableCell>{ item.createdAt }</TableCell>
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
            ) ) }
            
            
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductList;



{/* { products.map( item => (
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
            ))} */}