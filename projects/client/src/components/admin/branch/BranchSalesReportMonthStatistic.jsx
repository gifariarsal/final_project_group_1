import {
  Box,
  Flex,
  Select,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const BranchSalesReportMonthStatistic = ({ data }) => {
  return (
    <Box borderBottom={"1px solid #ccc"}>
      <StatGroup>
        <Box
          w={"full"}
          px={8}
          py={4}
          gap={4}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Stat>
            <Box w={{ base: "150px", md: "200px" }}>
              <StatLabel>Total User Buy</StatLabel>
              <StatNumber>{data.totalUserBuy}</StatNumber>
            </Box>
          </Stat>
          <Stat>
            <Box w={{ base: "150px", md: "200px" }}>
              <StatLabel>Total Product Bought</StatLabel>
              <StatNumber>{data.totalProductBuy || 0}</StatNumber>
            </Box>
          </Stat>
          <Stat>
            <Box w={{ base: "150px", md: "200px" }}>
              <StatLabel>Most Popular Product</StatLabel>
              <StatNumber>
                {data.mostSoldProduct?.Product.name || "None"}
              </StatNumber>
            </Box>
          </Stat>
          <Stat>
            <Box w={{ base: "150px", md: "200px" }}>
              <StatLabel>Total Sales</StatLabel>
              <StatNumber>Rp.{data.data},-</StatNumber>
            </Box>
          </Stat>
        </Box>
      </StatGroup>{" "}
    </Box>
  );
};

export default BranchSalesReportMonthStatistic;
