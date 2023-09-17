import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../redux/reducer/AddressReducer";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const DeleteAddressModal = ({ isOpen, onClose, address_id }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);

  const id = user.id;

  const deleteAddress = async () => {
    try {
      await axios.patch(`${URL_API}/address/deactivate/${address_id}`);
      toast({
        title: "Success",
        description: "Address has been deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: error.response.data.message,
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      console.log(error);
    }
  };

  const handleDelete = async () => {
    await deleteAddress(address_id);
    onClose();
    await dispatch(getAddress(id));
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Delete Address
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Once you delete this address, it cannot be undone. Are you sure want
            to delete this address?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={6}
            variant={"ghost"}
            color={"brand.main"}
            _hover={{ bg: "gray.100" }}
            _active={{ bg: "gray.300" }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color={"white"}
            bg={"brand.main"}
            _hover={{ bg: "brand.hover" }}
            _active={{ bg: "brand.active" }}
          >
            Yes, Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteAddressModal;
