/* eslint-disable react/prop-types */
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image, Input, Popover, PopoverTrigger, PopoverContent, Button, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { dev_url } from "../utils/axios";
import useSuplementryList from "../hooks/useSuplementryList";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMainContext from "../hooks/useMainContext";
import { useNavigate } from "react-router-dom";


const DeleteModal = ({isOpen,onOpenChange,id,setId}) =>
{
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate()
  const { openToast } = useMainContext();
  const deleteItem = async ( onClose ) =>
  {
    try {
      const res = await axiosPrivate.delete( `/suplementry/${ id }` )
      const result = res.data
      openToast(result.message, "success")
      onClose()
      setId( "" )
      navigate(0)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
      <ModalContent>
        { onClose => (
          <>
            <ModalHeader>
              Delete Product!
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you will like to delete this product?</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="primary" onClick={onClose}>Cancle</Button>
              <Button color="danger" onClick={()=>deleteItem(onClose)}><FaTrash /> {"Delete" }</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

const Supplementry = () =>
{
  const { products, isLoading, hasMore } = useSuplementryList();
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [ id, setId ] = useState( "" )
  const [openPopoverId, setOpenPopoverId] = useState(null);
  
  const deleteItem = ( onOpen,id ) =>
  {
    setId( id )
    setOpenPopoverId(openPopoverId === id ? null : id);
    onOpen()
  }

  const togglePopover = (id) => {
    setOpenPopoverId(openPopoverId === id ? null : id); // Toggle popover for the specific item
  };

  

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
                <TableCell>
                  <Popover showArrow placement="bottom" color="default" onClose={() => setOpenPopoverId(null)} isOpen={openPopoverId === item.id}>
                    <PopoverTrigger>
                      <Button variant="ghost" size="sm" onClick={() => togglePopover(item.id)}>
                        <BsGear size={18}/>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col space-y-2">
                        <Button variant="flat" color="primary"><FaPencil/> Edit</Button>
                        <Button variant="flat" color="danger" onClick={()=>deleteItem(onOpen,item.id)}><FaTrash/> Delete</Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ) ) }
          </TableBody>
        </Table>
        <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={id} setId={setId}/>
      </div>
    </div>
  )
}

export default Supplementry