import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  deleteProduct,
  restoreProduct,
  updateProduct,
} from "../../../redux/reducer/ProductReducer";
import ButtonAddProduct from "../../components/ButtonAddProduct";
import { IoTrashOutline } from "react-icons/io5";
import ButtonEditProduct from "../../components/ButtonEditProduct";
import { RxCross1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";

const ProductManagement = () => {
  const PUBLIC_URL = "http://localhost:8000";
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/product");
    setProduct(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const restore = async (item) => {
    await dispatch(restoreProduct(item));
    await fetchData();
  };
  const deactive = async (item) => {
    await dispatch(deleteProduct(item));
    await fetchData();
  };
  const newProduct = (values) => {
    dispatch(addProduct(values));
  };

  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };
  const inactiveProducts = product.filter((item) => !item.isactive);

  return (
    <Box>
      <Stack>
        <Box fontFamily={"montserrat"}>
          <Text ml={"48px"} mt={"24px"} fontSize={"48px"}>
            Product Management
          </Text>
          <ButtonAddProduct />
          <Divider mt={"10px"} />
          {product.map((item) => {
            const active = item.isactive;
            const newPrice = item.price - item.admin_discount;
            return (
              <Box>
                {/* {active ? ( */}
                <Card
                  key={item.id}
                  ml={"24px"}
                  w={"800px"}
                  mt={"20px"}
                  boxShadow={"lg"}
                  border={"2px"}
                  borderColor={item.isactive ? "gray.100" : "red"} // Add conditional styling
                >
                  <CardBody>
                    <Flex>
                      <Image
                        src={getImage(item.product_img)}
                        alt="sayur"
                        w={"200px"}
                        h={"200px"}
                        borderRadius="lg"
                      />
                      <Stack mt="6" spacing="3">
                        <Heading color={item.isactive ? "green" : "red"}>
                          {item.Category?.name}
                        </Heading>
                        <Text>{item.name}</Text>
                        <Flex gap={2} fontSize={"12px"}>
                          <Text fontWeight={"bold"}>Rp. {item.price}</Text>
                          <Text
                            textAlign={"center"}
                            fontWeight={"bold"}
                            textDecoration={"line-through"}
                            color={"#9b9b9b"}
                          >
                            {item.admin_discount > 0
                              ? `Rp. ${item.admin_discount}`
                              : ""}
                          </Text>
                        </Flex>

                        <Text fontSize="2xl">Rp.{newPrice}</Text>
                        <Text>{item.description}</Text>
                      </Stack>
                      <Box right={10} top={50} position={"absolute"}>
                        <Stack>
                          <ButtonEditProduct id={item.id} />
                          {item.isactive ? (
                            <IconButton
                              color={"red"}
                              variant={""}
                              icon={
                                <RxCross1
                                  size={"md"}
                                  onClick={() => deactive(item)}
                                />
                              }
                            />
                          ) : (
                            <IconButton
                              color={"green"}
                              variant={""}
                              icon={
                                <FaCheck
                                  size={"md"}
                                  onClick={() => restore(item)}
                                />
                              }
                            />
                          )}
                        </Stack>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </Box>
            );
          })}
          ;
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductManagement;
