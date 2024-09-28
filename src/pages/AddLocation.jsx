/* eslint-disable react/prop-types */
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react"

const AddLocation = ({isOpen, onOpenChange}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader>
        Add Location
      </ModalHeader>
      <ModalContent>
        Add Location
      </ModalContent>
    </Modal>
  )
}

export default AddLocation