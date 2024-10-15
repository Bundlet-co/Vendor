/* eslint-disable react/prop-types */
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem, Input, Textarea} from "@nextui-org/react"
import countries from "../constants/countries";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useMainContext from "../hooks/useMainContext";

const AddLocation = ( { isOpen, onOpenChange } ) =>
{
  const {openToast} = useMainContext()
  const axiosPrivate = useAxiosPrivate();
  const [ formData, setFormData ] = useState( {
    country: "",
    state: "",
    city: "",
    lga: "",
    address: ""
  } );
  const [loading,setLoading] = useState(false)

  const handleChange = ( e ) =>
  {
    const { name, value } = e.target
    setFormData( prev => ( {
      ...prev, [name]:value
    }))
  }

  const submit = async (onClose) =>
  {
    try {
      setLoading(true)
      const res = await axiosPrivate.post( '/dispatch', formData )
      openToast( res.data.message, "success" )
      onClose()
    } catch (error) {
      console.error( error );
      
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="bottom-center">
      <ModalContent>
        { ( onClose ) =>
        (
          <>
            <ModalHeader>Add Location</ModalHeader>
            <ModalBody>
              <Select name="country" selectedKeys={[formData.country]} onChange={handleChange} label="Country" labelPlacement="outside" placeholder="Select a country">
                { countries.map( country => (
                  <SelectItem key={ country.name }>{ country.name }</SelectItem>
                ))}
              </Select>
              <Input
                name="state"
                onChange={ handleChange }
                value={formData.state}
                type="text"
                placeholder="Enter your state or Pronvince"
                label="State/Province"
                labelPlacement="outside"
              />
              <Input 
                name="city" 
                onChange={handleChange} 
                value={formData.city}
                type="text" 
                placeholder="Enter your City" 
                label="City" 
                labelPlacement="outside" 
              />
              <Input 
                name="lga" 
                onChange={handleChange} 
                value={formData.lga}
                type="text" 
                placeholder="Enter your Local Government Area" 
                label="LGA" 
                labelPlacement="outside" 
              />
              <Textarea 
                name="address" 
                onChange={handleChange} 
                value={formData.address}
                type="text" 
                placeholder="Enter dispatch address" 
                label="Address" 
                labelPlacement="outside"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={ onClose }>
                Close
              </Button>
              <Button isLoading={loading} color="primary" onClick={ ()=>submit(onClose) }>
                Add
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default AddLocation