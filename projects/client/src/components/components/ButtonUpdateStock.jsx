import { Box, Button, useDisclosure } from "@chakra-ui/react";
import ModalUpdateStock from "./ModalUpdateStock";

export default function ButtonUpdateStock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Button
          bg={"brand.main"}
          _hover={{ bg: "brand.hover", color: "white" }}
          onClick={onOpen}
        >
          Update stock
        </Button>
        <ModalUpdateStock isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Box>
    </>
  );
}
