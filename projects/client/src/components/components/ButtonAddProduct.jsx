import { Box, Button, Stack, useDisclosure } from "@chakra-ui/react";
import ModalAddProduct from "./ModalAddProduct";

export default function ButtonAddProduct() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box ml={"48px"}>
        <Button
          bg={"brand.main"}
          _hover={{ bg: "brand.hover" }}
          color={"white"}
          onClick={onOpen}
        >
          Add Product
        </Button>
        <ModalAddProduct isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
    </>
  );
}
