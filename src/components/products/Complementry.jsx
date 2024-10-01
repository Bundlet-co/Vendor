/* eslint-disable react/prop-types */
import { Button, Image, Input } from '@nextui-org/react';
import thumb from "../../Assets/img/thumb.png"
import { useState } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';



const Complementry = ({submittedData,setSubmittedData}) =>
{
  const [ formData, setFormData ] = useState( { name: "", price: "", quantity: "", file: null } );
  const [ complementryHero, setComplementryHero ] = useState( thumb );
  const [ editIndex, setEditIndex ] = useState( null );

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target;
    setFormData({...formData,[name]:value})
  }

  const handleFileChanges = ( e ) =>
  {
    setFormData( { ...formData, file: e.target.files[ 0 ] } );
    setComplementryHero(URL.createObjectURL(e.target.files[ 0 ] ))
  }

  const handleAdd = () =>
  {
    if ( editIndex !== null ) {
      const updateData = [ ...submittedData ];
      updateData[ editIndex ] = formData
      setSubmittedData( updateData );
      
    } else {
      setSubmittedData([...submittedData,formData])
    }

    setFormData( { name: "", price: "", quantity: "", file: null } )
    setComplementryHero( thumb );
    setEditIndex( null );
  }

  const handleDelete = ( id ) =>
  {
    const updatedData = submittedData.filter( ( _, i ) => i !== id );
    setSubmittedData( updatedData );
  }

  const handleEdit = ( id ) =>
  {
    setFormData( submittedData[ id ] );
    setEditIndex( id );

    if ( submittedData[ id ].file ) {
      setComplementryHero(URL.createObjectURL(submittedData[ id ].file))
    } else {
      setComplementryHero(thumb)
    }
  }


  return (
    <section>
      <div className='grid grid-cols-5 gap-4 mb-4'>
        <div className="col-span-2 my-auto">
          <div className="h-32 border rounded-lg relative">
              <div className="w-full relative flex items-center justify-center h-full">
                <Image src={complementryHero} className="h-24 w-24 object-contain"/>
              </div>
              <div className="absolute top-0 right-0 z-10 bg-white rounded-lg">
                <div className="border w-10 h-10 flex items-center justify-center">
                  <label htmlFor="hero_image_complementry" role="button"><FaPencil /></label>
                  <input type="file" name="hero_image_complementry" id="hero_image_complementry" onChange={handleFileChanges} className="hidden" />
                </div>
              </div>
            </div>
        </div>
        <div className="col-span-3">
          <Input
            name='name'
            placeholder='Product name'
            label="Product name"
            labelPlacement='outside'
            onChange={handleChange}
            value={ formData.name }
            className='mb-8'
          />
          <Input
            name="price"
            placeholder='Price'
            label="Product price"
            labelPlacement='outside'
            onChange={handleChange}
            value={ formData.price }
            className='mb-8'
          />
          <Input
            name="quantity"
            placeholder='Available stock'
            label="Product Quantity"
            labelPlacement='outside'
            onChange={handleChange}
            value={ formData.quantity }
            className='mb-4'
          />
          
        </div>
        <div className="col-span-full text-end">
          <Button size="sm" color='primary' variant="flat" onClick={ handleAdd }>{ editIndex !==null  ? "Edit" : "Add" }</Button>
        </div>
      </div>

      {/* Dispalay Product added */ }
      { submittedData.length === 0 && <div className="h-5 flex justify-center items-center my-4">
        <p>No Item added yet.</p>
      </div> }
      { submittedData.map( ( item, index ) => (
        <div className="shadow-sm rounded-md flex border items-center gap-2 px-4 my-2" key={ index }>
          <Image src={ item.file ? URL.createObjectURL( item.file ) : thumb } className="h-20 w-20 object-contain" />
          <div className='flex-grow xl:flex xl:items-center xl:justify-between'>
            <p className="text-lg font-bold">{ item.name }</p>
            <p className='text-small'>Price: { item.price }</p>
            <p className="text-small">Quantity: { item.quantity }</p>
            <div className="flex space-x-3 my-2">
            <Button color="danger" variant="flat" size='sm' onClick={ () => handleDelete( index ) }>
              <FaTrash/>
            </Button>
            <Button color='primary' variant="flat" size='sm' onClick={ () => handleEdit( index ) }>
              <FaPencil/>
            </Button>
          </div>
          </div>
          
        </div>
      ))}
    </section>
  )
}

export default Complementry