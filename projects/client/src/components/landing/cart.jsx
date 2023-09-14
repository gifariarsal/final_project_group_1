import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Transactions from "./Transactions";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  addCart,
  addToCart,
  deleteFromCart,
} from "../../redux/reducer/ProductReducer";
export default function Cart() {
  const { login } = useSelector((state) => state.AuthReducer);
  const { cart } = useSelector((state) => state.ProductReducer);
  // const {total_harga}
  const dispatch = useDispatch();
  const inCart = async (products) => {
    await dispatch(addToCart(products));

    const cartData = {
      total_price: calculateTotal(cart),
      cartItems: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };
    await dispatch(addCart(cartData));
  };

  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [item, setItem] = useState([]);
  const getItem = () => {
    return async (dispatch) => {
      try {
        const fetchData = await axios.get(
          "http://localhost:8000/api/product/item"
        );
        console.log(fetchData);
        setItem(fetchData);
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      <Navbar />
      {login ? (
        <Box>
          <Stack>
            <Box
              ml={"100px"}
              mt={"48px"}
              fontSize={"2xl"}
              fontWeight={"bold"}
              fontFamily={"montserrat"}
            >
              <Text>Keranjang</Text>
            </Box>
            <Divider colorScheme="blackAlpha"></Divider>
            <Flex>
              {cart.map((item) => {
                return (
                  <Box>
                    <Card
                      w={"800px"}
                      ml={"100px"}
                      boxShadow={"lg"}
                      key={item.id}
                    >
                      <CardBody>
                        <Box fontWeight={"bold"} mb={"24px"}>
                          <Text>Click and Play</Text>
                        </Box>
                        <Flex>
                          <Box w={"100px"} h={"100px"} bgColor={"gray"}>
                            Image
                          </Box>
                          <Box ml={"32px"}>
                            <Text fontWeight={"bold"}>
                              {item.Category?.name}
                            </Text>
                            <Text>{item.name}</Text>
                            <Text fontWeight={"bold"}>Rp. {item.price}</Text>
                          </Box>
                        </Flex>
                      </CardBody>
                      <CardFooter>
                        <Flex justify={"space-between"}>
                          <Box>
                            <IconButton
                              color={"blackAlpha.600"}
                              variant={""}
                              icon={<IoTrashOutline size={"md"} />}
                            />
                          </Box>
                          <Box ml={"600px"}>
                            <ButtonGroup variant={"none"}>
                              <IconButton
                                color={"red"}
                                icon={<AiOutlineMinusCircle />}
                                onClick={() => dispatch(deleteFromCart(item))}
                              ></IconButton>
                              <Text fontSize={"2xl"}>{item.quantity}</Text>
                              <IconButton
                                color={"green"}
                                icon={<AiOutlinePlusCircle />}
                                onClick={() => inCart(item)}
                              ></IconButton>
                            </ButtonGroup>
                          </Box>
                        </Flex>
                      </CardFooter>
                    </Card>
                  </Box>
                );
              })}

              <Box>
                <Transactions />
              </Box>
            </Flex>
          </Stack>
        </Box>
      ) : (
        <Box>
          <Text>Please Login Fist</Text>
        </Box>
      )}
    </>
  );
}
