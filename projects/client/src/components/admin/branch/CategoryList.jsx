import React, { useEffect } from "react";
import { Box, Flex, IconButton, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../../redux/reducer/CategoryReducer";
import {
  IoCreateOutline,
  IoTrashOutline,
} from "react-icons/io5";
const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.CategoryReducer.category);
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const getImageUrl = (imagePath) => {
    return `${IMAGE_URL}${imagePath}`;
  };

  return (
    <Box px={8} py={4}>
      <Flex
        alignItems={"center"}
        justifyContent={"flex-start"}
        gap={4}
        wrap={"wrap"}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            align={"center"}
            bg={"white"}
            rounded={"lg"}
            p={4}
            boxShadow={"lg"}
            w={"200px"}
          >
            <Image
              src={getImageUrl(category.category_img)}
              alt={category.name}
              w={"100px"}
            />
            <Text mt={8} fontSize={"md"} fontWeight={"medium"}>
              {category.name}
            </Text>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={4}
              w={"full"}
            >
              <IconButton
                variant={"ghost"}
                icon={<IoCreateOutline />}
                aria-label="Edit"
                size={"md"}
                colorScheme="green"
                rounded={"full"}
              />
              <IconButton
                variant={"ghost"}
                icon={<IoTrashOutline />}
                aria-label="Delete"
                size={"md"}
                colorScheme="red"
                rounded={"full"}
              />
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default CategoryList;
