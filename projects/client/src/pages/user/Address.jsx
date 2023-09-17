import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Select, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/landing/Navbar";
import AddAddressModal from "../../components/user/AddAddressModal";
import { IoAddOutline } from "react-icons/io5";
const API_KEY = process.env.REACT_APP_RO_KEY;
const URL_API = process.env.REACT_APP_API_BASE_URL;

function Address() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar />
      <Box w={"full"} p={"16px 100px"}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize={"4xl"} fontWeight={"bold"}>
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
      </Box>
      <AddAddressModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Address;
