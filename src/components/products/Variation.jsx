/* eslint-disable react/prop-types */
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react'
import { BsGear } from 'react-icons/bs';
import { FaPencil, FaTrash } from 'react-icons/fa6';

const Variation = ({variations=[],setVariations=()=>{}}) =>
{
  const [ formData, setFormData ] = useState( {
    type: "",
    variant: "",
    price: "",
    quantity:""
  } )
  const [ editIndex, setEditIndex ] = useState( null );
  
    const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
    }
  
  const handleAdd = () =>
  {
    if ( editIndex !== null ) {
      const updateData = [ ...variations ];
      updateData[ editIndex ] = formData
      setVariations( updateData );
      
    } else {
      setVariations([...variations,formData])
    }

    setFormData( {
    type: "",
    variant: "",
    price: "",
    quantity:""
  } )
    setEditIndex( null );
  }

  const handleDelete = ( id ) =>
  {
    const updatedData = variations.filter( ( _, i ) => i !== id );
    setVariations( updatedData );
  }

  const handleEdit = ( id ) =>
  {
    setFormData( variations[ id ] );
    setEditIndex( id );
  }
  
  return (
    <section>
      <div className="mb-2 grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <Select label="Type" placeholder='Variation Type' name='type' selectedKeys={[formData.type]} onChange={handleChange} labelPlacement='outside'>
            <SelectItem key="color">Color</SelectItem>
            <SelectItem key="size">Size</SelectItem>
            <SelectItem key="others">Others</SelectItem>
          </Select>
        </div>
        <div className="col-span-2">
          { formData.type === "color" ? ( <Input type='color' label={ "Color" } placeholder='Color' labelPlacement='outside' name='variant' onChange={handleChange} /> ) : formData.type === "size" ? (
            <Select label="Size" placeholder='Select a size' name='variant' selectedKeys={ [ formData.variant ] } onChange={ handleChange } labelPlacement='outside'>
              <SelectItem key="xs">xs</SelectItem>
              <SelectItem key="sm">sm</SelectItem>
              <SelectItem key="md">md</SelectItem>
              <SelectItem key="l">m</SelectItem>
              <SelectItem key="xl">xl</SelectItem>
              <SelectItem key="xxl">xxl</SelectItem>
            </Select>
          ):<Input type='text' label="Variant" placeholder='Enter vairiant' labelPlacement='outside' name='variant' onChange={handleChange} value={formData.variant}/>}
        </div>
        <div className="col-span-2">
          <Input type='number' name='price' onChange={handleChange} value={formData.price} label="Price" placeholder='e.g. 5000' labelPlacement='outside'/>
        </div>
        <div className="col-span-2">
          <Input type='number' label="Quantity" name='quantity' onChange={handleChange} value={formData.quantity} placeholder='e.g. 5000' labelPlacement='outside'/>
        </div>
        <div className="col-span-full text-end">
          <Button size="sm" color='primary' variant="flat" onClick={ handleAdd }>{ editIndex !==null  ? "Edit" : "Add" }</Button>
        </div>
      </div>

      {/* Dispalay Variations added */ }
      { variations.length === 0 && <div className="h-5 flex justify-center items-center my-4">
        <p>No Variation added yet.</p>
      </div> }
      { variations.length > 0 && <div className='border shadow-sm rounded-md'>
        <div className=" flex items-center p-4 justify-between">
          <p className="text-small font-bold">Type</p>
          <p className='text-small font-bold'>Variant</p>
          <p className='text-small font-bold'>Price</p>
          <p className="text-small font-bold">Quantity</p>
          <p className="text-small font-bold">Actions</p>
        </div>
        <hr />
        { variations.map( ( item, index ) => (
          <div className="flex items-center justify-between p-4" key={ index }>
            <p className="text-small">{ item.type }</p>
            { item.type === "color" ? (
            <div className="h-6 w-6 rounded-md" style={{ backgroundColor: item.variant }}/>
            ): (
              <p className='text-small'> { item.variant }</p>
            )}
            <p className='text-small'> { item.price }</p>
            <p className="text-small">  { item.quantity }</p>
            <Popover placement="bottom" color="default">
              <PopoverTrigger>
                <Button variant="ghost" size="sm">
                  <BsGear size={18}/>
                </Button>
              </PopoverTrigger>
              <PopoverTrigger>
                <PopoverContent className='space-y-2'>
                  <Button color="danger" variant="flat" size='sm' onClick={ () => handleDelete( index ) }>
                    <FaTrash/>
                  </Button>
                  <Button color='primary' variant="flat" size='sm' onClick={ () => handleEdit( index ) }>
                    <FaPencil/>
                  </Button>
                </PopoverContent>
              </PopoverTrigger>
            </Popover>
          </div>
      ))}
      </div> }
      
    </section>
  )
}

export default Variation