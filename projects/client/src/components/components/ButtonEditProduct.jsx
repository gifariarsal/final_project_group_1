import { Box, IconButton, useDisclosure } from "@chakra-ui/react";
import { BiSolidEdit } from "react-icons/bi";
import ModalEditProduct from "./ModalEditProduct";

export default function ButtonEditProduct({ id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <IconButton
          color={"blackAlpha.800"}
          variant={""}
          icon={<BiSolidEdit size={"md"} />}
          onClick={onOpen}
        />
        <ModalEditProduct
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          id={id}
        />
      </Box>
    </>
  );
}
