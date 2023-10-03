import {
  Box,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export default function ProductPicture({ isOpen, onClose, item }) {
  const PUBLIC_URL = "http://localhost:8000";
  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };
  console.log("vieww", item);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={"40px"}>
          <ModalHeader>{item.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image
                src={getImage(item.product_img)}
                alt="sayur"
                w={"500px"}
                h={"400px"}
                borderRadius="lg"
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
