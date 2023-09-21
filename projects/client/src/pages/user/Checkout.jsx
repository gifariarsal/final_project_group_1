import {
  Box,
  Divider,
  Flex,
  Image,
  Text,
  useDisclosure,
  Select,
  Spinner,
  Button,
  Card,
  CardBody,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Logo from "../../assets/logo_main.png";
import ConfirmBackToCart from "../../components/user/ConfirmBackToCart";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/reducer/CartReducer";
import PlainFooter from "../../components/user/PlainFooter";

const Checkout = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState("");
  const { user } = useSelector((state) => state.AuthReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userAddress, defaultAddress } = useSelector(
    (state) => state.AddressReducer
  );
  const { carts, item } = useSelector((state) => state.CartReducer);
  let price = 0;
  const nameExist = user.name ? user.name : user.username;

  const selectOptions = userAddress.map((address) => ({
    label: address.address,
    value: address.address,
  }));

  const handleAddressSelect = (event) => {
    setSelectedAddress(event.target.value);
  };

  carts.map((cart) => {
    return (price += cart.total_price);
  });

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <Box>
      <Box>
        <Flex
          bg={"white"}
          color={"#1c1c1c"}
          minH={"60px"}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={"#D7F0AA"}
          align={"center"}
        >
          <Box w={"full"} my={"16px"} mx={{ base: "16px", lg: "100px" }}>
            <Flex justifyContent={{ base:"center", lg:"flex-start"}} align={"center"}>
              <div style={{ width: "184px" }}>
                <Image
                  onClick={onOpen}
                  src={Logo}
                  h={"28px"}
                  cursor={"pointer"}
                  _hover={{
                    filter: "brightness(70%)",
                    transition: "300ms",
                  }}
                />
              </div>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box w={"full"} py={"16px"} px={{ base: "28px", lg: "100px" }}>
        <Text fontSize={{ base:"2xl", lg:"4xl"}} fontWeight={"medium"}>
          Checkout
        </Text>
        <Divider />
        <Box w={"full"} py={4}>
          <Flex gap={8} flexDir={{ base: "column", lg: "row" }}>
            <Box w={{ base: "100%", lg: "70%" }}>
              <Box>
                <Text fontWeight={"bold"} color={"brand.main"}>
                  Shipping Address
                </Text>
                <Divider my={2} />
                <Text fontWeight={"medium"}>{nameExist}</Text>
                <Text my={2}>{user.phone}</Text>
                <Text>
                  {selectedAddress ? (
                    selectedAddress
                  ) : defaultAddress ? (
                    defaultAddress.address
                  ) : (
                    <Spinner size="sm" />
                  )}
                </Text>
                <Text
                  my={2}
                  fontSize={"xs"}
                  color={"gray.500"}
                  fontStyle={"italic"}
                >
                  Want it sent to another address?
                </Text>
                <Select
                  placeholder="Select another address"
                  value={selectedAddress}
                  onChange={handleAddressSelect}
                >
                  {selectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
                <Divider my={4} />
                <Text fontWeight={"bold"} mb={2} color={"brand.main"}>
                  Delivery Options
                </Text>
                <Select placeholder="Select delivery option"></Select>
              </Box>
              <Divider my={4} />
              <Text fontWeight={"bold"} mb={2} color={"brand.main"}>
                Product{"("}s{")"} you purchased
              </Text>
              <Box>
                {item.map((products) => {
                  return (
                    <Box>
                      <Card
                        mt={"4"}
                        w={"full"}
                        boxShadow={"lg"}
                        key={products.id}
                      >
                        <CardBody>
                          <Box fontWeight={"bold"} mb={"24px"}>
                            <Text>Click and Play</Text>
                          </Box>
                          <Flex>
                            <Image
                              src="https://cdn10.bigcommerce.com/s-f70ch/products/106/images/307/18__31743.1449827934.1280.1280.jpg?c=2"
                              w={"20%"}
                            />
                            <Box ml={"32px"}>
                              <Text>{products.name}</Text>
                              <Text fontWeight={"bold"}>
                                Rp. {products.price}
                              </Text>
                            </Box>
                          </Flex>
                        </CardBody>
                      </Card>
                    </Box>
                  );
                })}
              </Box>
            </Box>
            <Box
              w={{ base: "100%", lg: "30%" }}
              h={"fit-content"}
              pos={"sticky"}
              top={"20px"}
              rounded={"lg"}
              border={"1px"}
              borderColor={"gray.200"}
              boxShadow={"lg"}
            >
              <Box w={"full"} p={4}>
                <Select placeholder="Save more with discount"></Select>
              </Box>
              <Divider />
              <Box w={"full"} p={4}>
                <Text fontWeight={"bold"} mb={4}>
                  Shopping Summary
                </Text>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text>Product price:</Text>
                  <Text> Rp.{price}</Text>
                </Flex>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text>Shipping fee:</Text>
                  <Text> Rp.</Text>
                </Flex>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text>Discount:</Text>
                  <Text> Rp.</Text>
                </Flex>
                <Divider my={4} bg={"black"} />
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Text fontWeight={"bold"}>Total Payment:</Text>
                  <Text fontWeight={"bold"}> Rp.</Text>
                </Flex>
                <Button
                  w={"full"}
                  color={"white"}
                  bg={"brand.main"}
                  _hover={{ bg: "brand.hover" }}
                  _active={{ bg: "brand.active" }}
                  mt={8}
                >
                  Order
                </Button>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      <PlainFooter />
      <ConfirmBackToCart isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Checkout;
