import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";

export default function ModalAddProduct({ isOpen, onClose }) {
  return (
    <>
      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Input placeholder="Product name"></Input>
                <Select mt={5}>
                  <option>Sayur</option>
                </Select>
                <Select mt={5}>
                  <option>Branch Jakarta</option>
                  <option>Branch Makassar</option>
                  <option>Branch Lombok</option>
                  <option>Branch Yogyakarta</option>
                </Select>
                <Input placeholder="Price" mt={5}></Input>
                <Input placeholder="Discount" mt={5}></Input>
                <Input type="file" mt={5}></Input>
                <Input type="textarea" mt={5} placeholder="Description"></Input>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
