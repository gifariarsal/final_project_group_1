import {
  Badge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import ButtonUpdateStock from "../../components/ButtonUpdateStock";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa6";
import { RiHistoryFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import {
  disableProduct,
  enableProduct,
} from "../../../redux/reducer/AdminReducer";
import StockManagementHistory from "./StockManagementHistory";

export default function StockManagement() {
  const [detail, setDetail] = useState(0);
  const [itemDetail, setItemDetail] = useState({});
  const PUBLIC_URL = "http://localhost:8000";
  const toast = useToast();
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
    console.log("niii", response);
    await setStock(response.data.datas);
  };
  const disable = async (item) => {
    console.log("disbale ", item);
    await dispatch(disableProduct(item, Swal, toast));
    await fetchData();
  };
  const restore = async (item) => {
    console.log("resote, ", item);
    await dispatch(enableProduct(item, Swal, toast));
    await fetchData();
  };
  const stockHistory = async (item) => {
    await setItemDetail(item);
    setDetail(1);
  };
  useEffect(() => {
    fetchData();
    if (modalClosedTrigger) {
      fetchData();
      setModalClosedTrigger(false); // Reset the trigger
    }
  }, [modalClosedTrigger]);

  if (detail)
    return (
      <StockManagementHistory setDetail={setDetail} itemDetail={itemDetail} />
    );

  console.log("stocks", stock);
  return (
    <>
      <Box fontFamily={"montserrat"}>
        <Box ml={{ base: "32px", lg: "48px" }}>
          <Text mt={"24px"} fontSize={{ sm: "24px", md: "32px", lg: "48px" }}>
            Stock Management
          </Text>
          <ButtonUpdateStock setModalClosedTrigger={setModalClosedTrigger} />
          <Divider mt={2} />
          {stock &&
            stock.map((item) => {
              const active = item.isactive;
              const newPrice =
                item.Product?.price - item.Product?.admin_discount;
              return (
                <Box key={item.id}>
                  <Card
                    key={item.id}
                    w={{ base: "680px", lg: "800px" }}
                    mt={"20px"}
                    boxShadow={"lg"}
                    border={"2px"}
                    borderColor={item.isactive ? "gray.100" : "red"} // Add conditional styling
                  >
                    <CardBody boxShadow={"lg"}>
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
                            color={item.isactive ? "green" : "gray.400"}
                            fontStyle={item.isactive ? "" : "italic"}
                          >
                            {item.isactive ? (
                              <Flex>
                                <Text>{item.Product?.name}</Text>
                                {item.Product?.admin_discount > 0 ? (
                                  <Image
                                    src="https://cdn.icon-icons.com/icons2/1138/PNG/512/1486395314-13-discount_80575.png"
                                    w={"8%"}
                                    ml={5}
                                  />
                                ) : (
                                  ""
                                )}
                              </Flex>
                            ) : (
                              <Text>out of stock</Text>
                            )}
                          </Heading>
                          <Text fontWeight={"bold"}>
                            Quantity : {item.quantity}
                          </Text>
                          <Flex gap={2} fontSize={"16px"}>
                            <Text
                              textDecoration={
                                item.isactive ? "" : "line-through"
                              }
                              fontWeight={"bold"}
                            >
                              Rp. {item.Product?.price}
                            </Text>
                            {item.Product?.admin_discount > 0 ? (
                              <Badge colorScheme="green" rounded={"full"}>
                                Rp. {item.Product?.admin_discount}
                              </Badge>
                            ) : (
                              ""
                            )}
                          </Flex>

                          <Text
                            fontSize="2xl"
                            color={item.isactive ? "green" : "gray.500"}
                            fontWeight={"bold"}
                          >
                            {item.isactive ? (
                              `Rp. ${newPrice}`
                            ) : (
                              <Text> - </Text>
                            )}
                            {/* Rp.{newPrice} */}
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
                                </Stack>
                              </Box>
                            )}
                          </Stack>
                          <IconButton
                            color={"black"}
                            variant={""}
                            mt={"12px"}
                            icon={
                              <RiHistoryFill
                                size={"md"}
                                onClick={() => stockHistory(item)}
                              />
                            }
                          />
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
