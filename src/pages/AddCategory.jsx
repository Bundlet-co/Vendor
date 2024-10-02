import { Button, Input, Textarea,Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Popover, PopoverTrigger, PopoverContent, Spinner } from "@nextui-org/react";
import { BsGear, BsSearch } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMainContext from "../hooks/useMainContext";

const AddCategory = () =>
{
  const [ formData, setFormData ] = useState( {
    name: "",
    slug: [],
    description: ""
    } )
  const [ slug, setSlug ] = useState( "" );
  const axiosPrivate = useAxiosPrivate()
  const { openToast, closeToast } = useMainContext();
  const [ loading, setLoading ] = useState( false );
  const [ isLoading, setIsloading ] = useState( true )
  const [categories,setCategories] = useState([])

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
      const res = await axiosPrivate.post( "/category", formData, {
        headers: {
          "Content-Type":"application/json"
        }
      } )
      setCategories( prev => [ { ...res.data.data.category, subCategory: [] }, ...prev ] );
      openToast( res.data.message, "success" );
      setFormData({
        name: "",
        slug: [],
        description: ""
      })
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


  useEffect( () =>
  {
    ( async() =>
    {
      try {
        const res = await axiosPrivate.get( '/category' );
        const result = res.data
        setCategories( result.data.category )
      } catch (error) {
        console.error(error);
      }finally{
        setIsloading(false)
      }
    })()
  })



  return (
    <div className="p-4 w-full h-full overflow-y-auto">
      <p className="font-extrabold text-xl capitalize text-primary">Category</p>
      
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-full lg:col-span-5 border rounded-lg p-3 h-fit">
          <p className="font-bold text-lg capitalize">Add new category</p>
          {/* Form data */ }
          <div className="my-4 grid grid-cols-1 gap-4">
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
            <div className="w-full">
              <Textarea
                name="description"
                value={ formData.description }
                onChange={handleChange}
                label="Description"
                labelPlacement="outside"
                type="text"
                placeholder="Enter category description"
              />
            </div>
            <div className="w-full my-4">
              <Button color="primary" variant="flat" isLoading={ loading } onClick={ submit }>{ loading ? "Submitting" : "submit" }</Button>
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
          }}>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Sub Category</TableColumn>
              <TableColumn>Action</TableColumn>
            </TableHeader>
            <TableBody isLoading={ isLoading } loadingContent={ <Spinner color="primary" /> } emptyContent={ categories.length === 0 ? "No Product to display" : null }>
              { categories.map( item => (
                <TableRow key={ item.id }>
                  <TableCell>{ item.name }</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <p className="bg-primary p-2 rounded-lg text-default">{ item.subCategory.length }</p>
                      { item.subCategory.map( sub => (
                          <p className="bg-neutral-200 p-2 rounded-lg" key={item.subCategory.id}>{ sub.name }</p>
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

export default AddCategory