import { Box, Button, Divider, Text } from "@chakra-ui/react";
import ButtonUpdateStock from "../../components/ButtonUpdateStock";

export default function StockManagement() {
  return (
    <>
      <Box fontFamily={"montserrat"}>
        <Box ml={"48px"}>
          <Text mt={"24px"} fontSize={{ sm: "24px", md: "32px", lg: "48px" }}>
            Stock Management
          </Text>
          <ButtonUpdateStock />
          <Divider mt={2} />
        </Box>
      </Box>
    </>
  );
}
