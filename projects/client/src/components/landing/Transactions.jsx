import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Transactions() {
  const { totalHarga, cart } = useSelector((state) => state.ProductReducer);
  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <>
      <Box ml={"24px"}>
        {cart.map((item) => {
          return (
            <Box>
              <Card key={item.key}>
                <CardBody>
                  <Text fontWeight={"bold"}>Ringkasan Belanja</Text>
                  <Divider />
                  <Text>Harga barang Rp. {item.price}</Text>
                  <Text>Total Barang : {cartLength}</Text>
                  <Divider mt={"20px"} bgColor={"black"} />
                  <Text fontWeight={"bold"}>Total Harga : {totalHarga}</Text>
                  <CardFooter mt={"24px"}>
                    <Button w={"200px"} isDisabled={cartLength <= 0}>
                      Checkout
                    </Button>
                  </CardFooter>
                </CardBody>
              </Card>
            </Box>
          );
        })}
        ;
      </Box>
    </>
  );
}
