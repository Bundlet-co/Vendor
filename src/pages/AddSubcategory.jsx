/* eslint-disable react/prop-types */
import { Button, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Popover, PopoverTrigger, PopoverContent, Select, SelectItem,Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMainContext from "../hooks/useMainContext";


const DeleteModal = ({isOpen,onOpenChange,id,setId,setCategories}) =>
{
  const axiosPrivate = useAxiosPrivate();
  const { openToast } = useMainContext();
  const deleteItem = async ( onClose ) =>
  {
    try {
      const res = await axiosPrivate.delete( `/subcategory/${ id }` )
      const result = res.data
      openToast(result.message, "success")
      onClose()
      setCategories( prev => prev.filter(item=>item.id!==id))
      setId( "" )
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
              Delete Categotry!
            </ModalHeader>
            <ModalBody>
              <p>Are you sure you will like to delete this category?</p>
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

const AddSubcategory = () =>
{
  const { isOpen, onOpenChange, onOpen } = useDisclosure();
  const [ categories, setCategories ] = useState( [] );
    const [ id, setId ] = useState( "" )
  const [openPopoverId, setOpenPopoverId] = useState(null);
  const [ formData, setFormData ] = useState( {
    name: "",
    slug: [],
    category_id:""
    } )
  const [ slug, setSlug ] = useState( "" );
  const axiosPrivate = useAxiosPrivate()
  const { openToast, closeToast } = useMainContext();
  const [ loading, setLoading ] = useState( false )
  const [subCategories,setSubCategories] = useState([])
  const [ isLoading, setIsloading ] = useState( true );
  const [editId,setEditId] = useState(null)
  
    const handleChange = ( e,setState ) =>
  {
    const { name, value } = e.target;
    if ( Array.isArray( formData[ name ] ) ) {
      if ( /[ ,]$/.test( value ) ) {
        const newWord = value.split( /[ ,]+/ ).map( word => word.trim() ).filter( word => word );
        const updatedWord = [ ...new Set( [ ...formData.slug, ...newWord ] ) ];
        setFormData( ( prev ) => ( {
          ...prev, [ name ]: updatedWord
        } ) ) 
        setState('')
      } else {
        setState(value)
      }
    } else {
      setFormData( ( prev ) => ( {
        ...prev, [name]:value
      }))
    }
  };
  const handleKeyDown = ( e ) =>
  {
    if ( e.key === 'Backspace' && slug === "" && formData.slug.length > 0 ) {
      const lastWord = formData.slug[ formData.slug.length - 1 ];
      setSlug( lastWord );
      setFormData( prev => (
        {
          ...prev, slug:formData.slug.slice(0, -1)
        }
      ))
    }
  }

  const submit = async () =>
  {
    try {
      setLoading( true );
      if (editId  === null ) {
        const res = await axiosPrivate.post( "/subcategory", formData, {
          headers: {
            "Content-Type":"application/json"
          }
        })
        openToast( res.data.message, "success" );
        setFormData({
          name: "",
          slug: [],
          description: ""
        } )
        setSubCategories(prev=>[res.data.data.category,...prev])
        return;
      } else {
        const res = await axiosPrivate.patch( `/subcategory/${editId}`, formData, {
          headers: {
            "Content-Type":"application/json"
          }
        })
        openToast( res.data.message, "success" );
        setSubCategories(prev=> prev.map(category=> category.id === editId ? {...res.data.data.category}:category))
        setFormData({
          name: "",
          slug: [],
          description: ""
        } )
        setEditId( null );
      }
    } catch (error) {
      openToast(error.response.data.message,"error")
    } finally {
      setLoading( false );
      setTimeout( () =>
      {
        closeToast()
      },3000)
    }
  }

    const showEdit = ( id ) =>
  {
    setEditId( id );
      const subCat = subCategories.find( category => category.id === id );
    setFormData( {
      name: subCat.name,
      category_id: subCat.category_id,
      slug:subCat.slug
    } );
  }

  const deleteItem = ( onOpen,id ) =>
  {
    setId( id )
    setOpenPopoverId(openPopoverId === id ? null : id);
    onOpen()
  }


  useEffect( () =>
  {
    const getCategories = async () =>{
      try {
        const res = await axiosPrivate.get( '/category' );
        const result = await res.data
        setCategories( result.data.category )
      } catch (error) {
        console.error(error)
      }
    }

    const getSubCategory = async() => {
      try {
        const res = await axiosPrivate.get( '/subcategory' )
        const result = res.data.data.category
        setSubCategories( result );
      } catch (error) {
        console.error(error);
      }
      finally {
        setIsloading(false)
      }
    }
    
    getCategories();
    getSubCategory();
  },[axiosPrivate])
  
  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">sub Category</p>

      <div className="grid grid-cols-12 gap-4 my-4">
        <div className="col-span-full lg:col-span-5 border rounded-lg p-3 h-fit">
          <p className="font-bold text-lg capitalize">Add new category</p>
          {/* Form data */ }
          <div className="my-4 grid grid-cols-1 gap-4">
            <div className="w-full">
              <Select label="Main Category" labelPlacement="outside" placeholder="Select Main category" onKeyDown={handleKeyDown} required selectedKeys={[formData.category_id] } name="category_id" onChange={handleChange}>
                { categories.map( category => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                )) }
              </Select>
            </div>
            <div className="w-full">
              <Input
                label="Name"
                labelPlacement="outside"
                type="text"
                placeholder="Name"
                name="name"
                value={ formData.name }
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <Input
                name="slug"
                value={ slug }
                onChange={(e)=>handleChange(e,setSlug)}
                label="Slug"
                labelPlacement="outside"
                type="text"
                placeholder="Slug"
                onKeyDown={handleKeyDown}
              />
              { formData.slug.length > 0 ? <div className="flex items-center space-x-4 py-2">
                {
                  formData.slug.map( item => (
                  <p key={item} className="bg-neutral-300 mx-1 text-neutral-700 capitalize rounded-lg p-1">{ item }</p>
                ))
                }
              </div>: null}
            </div>
            <div className="w-full my-4">
              <Button color="primary" variant="flat" isLoading={loading} onClick={submit}>{ loading ? "Submitting" : "submit" }</Button>
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
          <Table aria-label="Caategory List"
          isHeaderSticky
          classNames={{
            base: "max-h-[75dvh] overflow-scroll",
            table: "max-h-[70dvh] overflow-auto",
          }} >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Slug</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody isLoading={ isLoading } loadingContent={ <Spinner color="primary" /> } emptyContent={ subCategories.length === 0 ? "No Subcategories to display" : null }>
              { subCategories.map( item => (
                <TableRow key={ item.id }>
                  <TableCell>{ item.name }</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <p className="bg-primary p-2 rounded-lg text-default">{ item.slug.length }</p>
                      { item.slug.map( sub => (
                          <p className="bg-neutral-200 p-2 rounded-lg"key={item.slug.indexOf(sub)}>{ sub }</p>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Popover showArrow placement="bottom" color="default">
                      <PopoverTrigger>
                        <Button variant="ghost" size="sm">
                          <BsGear size={18}/>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className="flex flex-col space-y-2">
                          <Button variant="flat" color="primary" onClick={()=>showEdit(item.id)}><FaPencil/> Edit</Button>
                          <Button variant="flat" color="danger" onClick={()=>deleteItem(onOpen,item.id)}><FaTrash/> Delete</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <DeleteModal id={ id } isOpen={ isOpen } onOpenChange={ onOpenChange } setId={ setId } setCategories={ setSubCategories } />
      </div>
    </div>
  )
}

export default AddSubcategory