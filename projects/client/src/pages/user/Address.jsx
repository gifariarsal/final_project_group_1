import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  useDisclosure,
  Stack,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import Navbar from "../../components/landing/Navbar";
import AddAddressModal from "../../components/user/AddAddressModal";
import { IoAddOutline, IoTrashOutline, IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../redux/reducer/AddressReducer";
import DeleteAddressModal from "../../components/user/DeleteAddressModal";
import EditAddressModal from "../../components/user/EditAddressModal";

function Address() {
  const [addressToDeleteId, setAddressToDeleteId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.AuthReducer);

  const id = user.id;

  useEffect(() => {
    dispatch(getAddress(id));
  }, [dispatch]);

  const userAddress = useSelector((state) => state.AddressReducer.userAddress);

  return (
    <Box>
      <Navbar />
      <Box w={"full"} p={"16px 100px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize={"4xl"} fontWeight={"medium"}>
            Address
          </Text>
          <Button
            onClick={onOpen}
            gap={2}
            rounded={"lg"}
            bg={"brand.main"}
            color={"white"}
            _hover={{ bg: "brand.hover" }}
            _active={{ bg: "brand.active" }}
          >
            <IoAddOutline size={24} />
            Add Address
          </Button>
        </Box>
        <Box mt={8}>
          <Stack spacing={4}>
            {userAddress.map((address) => (
              <Box
                key={address.id}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="md"
              >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text>{address.address}</Text>
                  <Box>
                    <IconButton
                      variant={"ghost"}
                      icon={<IoCreateOutline />}
                      aria-label="Edit"
                      size={"md"}
                      colorScheme="green"
                      rounded={"full"}
                      onClick={() => {
                        setAddressToDeleteId(address.id);
                        onOpenEdit();
                      }}
                    />
                    <IconButton
                      variant={"ghost"}
                      icon={<IoTrashOutline />}
                      aria-label="Delete"
                      size={"sm"}
                      colorScheme="red"
                      rounded={"full"}
                      onClick={() => {
                        setAddressToDeleteId(address.id);
                        onOpenDelete();
                      }}
                    />
                  </Box>
                </Flex>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
      <AddAddressModal isOpen={isOpen} onClose={onClose} />
      <DeleteAddressModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        address_id={addressToDeleteId}
      />
      <EditAddressModal isOpen={isOpenEdit} onClose={onCloseEdit} address_id={addressToDeleteId} />
    </Box>
  );
}

export default Address;
