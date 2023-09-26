import {
  Box,
  Button,
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
import ButtonUpdateStock from "../../components/ButtonUpdateStock";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { disableProduct } from "../../../redux/reducer/AdminReducer";

export default function StockManagement() {
  const PUBLIC_URL = "http://localhost:8000";
  const [stock, setStock] = useState([]);
  const [modalClosedTrigger, setModalClosedTrigger] = useState(false);
  const dispatch = useDispatch();
  const getImage = (image) => {
    return `${PUBLIC_URL}/${image}`;
  };
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:8000/api/admin/product/branch`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStock(response.data.data);
  };
  const disable = async (item) => {
    console.log("disbale ", item);
    await dispatch(disableProduct(item, Swal));
    await fetchData();
  };
  const restore = async (item) => {
    // await dispatch(restoreProduct(item, Swal));
    await fetchData();
  };
  useEffect(() => {
    fetchData();
    if (modalClosedTrigger) {
      fetchData();
      setModalClosedTrigger(false); // Reset the trigger
    }
  }, [modalClosedTrigger]);
  return (
    <>
      <Box fontFamily={"montserrat"}>
        <Box ml={"48px"}>
          <Text mt={"24px"} fontSize={{ sm: "24px", md: "32px", lg: "48px" }}>
            Stock Management
          </Text>
          <ButtonUpdateStock setModalClosedTrigger={setModalClosedTrigger} />
          <Divider mt={2} />
          {stock.map((item) => {
            const active = item.isactive;
            const newPrice = item.Product?.price - item.Product?.admin_discount;
            return (
              <Box>
                <Card
                  key={item.id}
                  w={{ md: "600px", lg: "800px" }}
                  mt={"20px"}
                  boxShadow={"lg"}
                  border={"2px"}
                  borderColor={item.isactive ? "gray.100" : "red"} // Add conditional styling
                >
                  <CardBody>
                    <Flex>
                      <Image
                        src={getImage(item.Product?.product_img)}
                        alt="sayur"
                        w={"200px"}
                        h={"150px"}
                        borderRadius="lg"
                      />
                      <Stack spacing="3">
                        <Heading
                          color={item.isactive ? "green" : "red"}
                          textDecoration={item.isactive ? "" : "line-through"}
                        >
                          <Text>{item.Product?.name}</Text>
                        </Heading>
                        <Text fontWeight={"bold"}>
                          Quantity : {item.quantity}
                        </Text>
                        <Flex gap={2} fontSize={"12px"}>
                          <Text
                            textDecoration={item.isactive ? "" : "line-through"}
                            fontWeight={"bold"}
                          >
                            Rp. {item.Product?.price}
                          </Text>
                          <Text
                            textAlign={"center"}
                            fontWeight={"bold"}
                            textDecoration={"line-through"}
                            color={"#9b9b9b"}
                          >
                            {item.Product?.admin_discount > 0
                              ? `Rp. ${item.Product?.admin_discount}`
                              : ""}
                          </Text>
                        </Flex>

                        <Text
                          textDecoration={item.isactive ? "" : "line-through"}
                          fontSize="2xl"
                        >
                          Rp.{newPrice}
                        </Text>
                      </Stack>
                      <Box right={10} top={50} position={"absolute"}>
                        <Stack>
                          {item.isactive ? (
                            <IconButton
                              color={"red"}
                              mt={"12px"}
                              variant={""}
                              icon={
                                <RxCross1
                                  size={"md"}
                                  onClick={() => disable(item)}
                                />
                              }
                            />
                          ) : (
                            <Box>
                              <Stack>
                                <IconButton
                                  color={"green"}
                                  variant={""}
                                  mt={"12px"}
                                  icon={
                                    <FaCheck
                                      size={"md"}
                                      onClick={() => restore(item)}
                                    />
                                  }
                                />
                                {/* <IconButton
                                  mt={"24px"}
                                  color={"red"}
                                  variant={""}
                                  icon={
                                    <FaTrashCan
                                      size={"md"}
                                      onClick={() => handleDeleteProduct(item)}
                                    />
                                  }
                                /> */}
                              </Stack>
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
