import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductListItem from "./ProductListItem";
import { Pagination } from "../components/Pagination";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { addCart, addToCart } from "../../redux/reducer/ProductReducer";

const ProductList = () => {
  const products = useSelector((state) => state.ProductReducer.product);
  const [index, setIndex] = useState(1);
  const { page, cart } = useSelector((state) => state.ProductReducer);
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

  useEffect(() => {}, [index]);

  if (products.length < 1) {
    return (
      <Center h={"30vh"}>
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box w={"100%"} py={"40px"} px={{ base: "60px", lg: "100px" }}>
      <Box mb={10}>
        <Center>
          <Heading as={"h2"}>Products</Heading>
        </Center>
      </Box>
      <Flex gap={{ base: 4, md: 8 }} w={"80%"} justifyContent={"center"}>
        {products.map((product) => (
          <Card>
            <CardBody>
              <ProductListItem product={product} key={product.id} />
            </CardBody>
            <CardFooter>
              <Button
                variant={"outline"}
                colorScheme="teal"
                leftIcon={<HiOutlineShoppingCart />}
                onClick={() => inCart(product)}
              >
                Add Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </Flex>
      <Pagination
      // page={page} index={index} setIndex={setIndex}
      />
    </Box>
  );
};

export default ProductList;
