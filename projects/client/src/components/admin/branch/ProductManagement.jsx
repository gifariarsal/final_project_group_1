import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
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
  updateProduct,
} from "../../../redux/reducer/ProductReducer";
import ButtonAddProduct from "../../components/ButtonAddProduct";
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

const ProductManagement = () => {
  const PUBLIC_URL = "http://localhost:8000";
  const [product, setProduct] = useState([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/product");
    console.log("respon", response.data.data);
    setProduct(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editProduct = (values) => {
    dispatch(updateProduct(values));
  };

  const newProduct = (values) => {
    dispatch(addProduct(values));
  };

  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };
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
                {active ? (
                  <Card
                    key={item.key}
                    ml={"24px"}
                    w={"800px"}
                    mt={"20px"}
                    boxShadow={"lg"}
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
                          <Heading>{item.Category?.name}</Heading>
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
                              {/* Rp. {item.admin_discount} */}
                            </Text>
                          </Flex>
                          <Text fontSize="2xl">Rp.{newPrice}</Text>
                        </Stack>
                        <Box right={10} top={50} position={"absolute"}>
                          <Stack>
                            <IconButton
                              color={"blackAlpha.800"}
                              variant={""}
                              icon={<BiSolidEdit size={"md"} />}
                              onClick={() => editProduct(item)}
                            />
                            <IconButton
                              color={"red"}
                              variant={""}
                              icon={<IoTrashOutline size={"md"} />}
                            />
                          </Stack>
                        </Box>
                      </Flex>
                    </CardBody>
                  </Card>
                ) : (
                  ""
                )}
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
