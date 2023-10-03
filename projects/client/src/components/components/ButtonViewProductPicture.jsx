import { Box, Button, IconButton, useDisclosure } from "@chakra-ui/react";
import { BiSolidEdit } from "react-icons/bi";
import ModalEditProduct from "./ModalEditProduct";
import ProductPicture from "../admin/branch/ProductPicture";

export default function ButtonViewProductPicture({ item }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Button onClick={onOpen} variant={""}>
          View
        </Button>
        <ProductPicture
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          item={item}
        />
      </Box>
    </>
  );
}
