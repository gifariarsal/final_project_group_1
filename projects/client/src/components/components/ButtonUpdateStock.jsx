import { Box, Button, useDisclosure } from "@chakra-ui/react";
import ModalUpdateStock from "./ModalUpdateStock";

export default function ButtonUpdateStock({ setModalClosedTrigger }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleModalClose = () => {
    setModalClosedTrigger(true); // Set the trigger when the modal is closed
    onClose();
  };
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
        <ModalUpdateStock
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleModalClose}
        />
      </Box>
    </>
  );
}
