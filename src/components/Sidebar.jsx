import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { BsChevronRight, BsPersonVcard, BsSpeedometer } from "react-icons/bs";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="text-black">
      <hr className=" border-neutral-400" />
      <Accordion defaultExpandedKeys={["1","2"]} className="">
        <AccordionItem key="1" aria-label="Dashboard" title="Dashboard" startContent={ <BsSpeedometer size={ 18 } /> } indicator={ <BsChevronRight /> }>
          <div className="flex flex-col gap-2">
            <Link to="/" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Ecommerce</Link>
            <Link to="/product" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Product List</Link>
            <Link to="/add" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Add Product</Link>
            <Link to="/category" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Add Category</Link>
            <Link to="/sub-category" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Add sub category</Link>
            <Link to="/order" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Order List</Link>
          </div>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Vendor" title="Vendor" startContent={ <BsPersonVcard size={ 18 } /> } indicator={ <BsChevronRight /> }>
          <div className="flex flex-col gap-2">
            <Link to="/profile" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Profile</Link>
            <Link to="/update" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">Vendor update</Link>
            <Link to="/invoice" className="border rounded-lg p-2 border-neutral-400 hover:bg-neutral-500 hover:text-neutral-200 text-medium font-bold capitalize">invoice</Link>
            <Button color="danger" variant="flat" className="font-bold">Log out</Button>
          </div>
        </AccordionItem>
        
      </Accordion>
    </aside>
  )
}

export default Sidebar