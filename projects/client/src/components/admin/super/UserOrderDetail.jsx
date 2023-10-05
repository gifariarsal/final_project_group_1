import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

const UserOrderDetail = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Create Branch Admin
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Text>tes</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default UserOrderDetail