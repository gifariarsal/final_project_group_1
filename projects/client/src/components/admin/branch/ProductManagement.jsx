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
  updateProduct,
} from "../../../redux/reducer/ProductReducer";
import ButtonAddProduct from "../../components/ButtonAddProduct";
import { IoTrashOutline } from "react-icons/io5";
import ButtonEditProduct from "../../components/ButtonEditProduct";
import ButtonChangeImageProduct from "../../components/ButtonChangeImageProduct";

const ProductManagement = () => {
  const PUBLIC_URL = "http://localhost:8000";
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/api/product");
    console.log("respon", response.data);
    setProduct(response.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log("id", product.id);

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
            console.log("id", item.id);
            const active = item.isactive;
            const newPrice = item.price - item.admin_discount;
            return (
              <Box>
                {active ? (
                  <Card
                    key={item.id}
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
                            <ButtonEditProduct id={item.id} />
                            {/* onClick={() => editProduct(item)} */}
                            <IconButton
                              color={"red"}
                              variant={""}
                              icon={<IoTrashOutline size={"md"} />}
                            />
                          </Stack>
                        </Box>
                      </Flex>
                      {/* <ButtonChangeImageProduct id={item.id} /> */}
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
