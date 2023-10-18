import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import ChartSuper from './ChartSuper';
import SalesReportStatistic from './SalesReportStatistic';

const HomeDashboard = () => {
  return (
    <Box w={"full"} minH={"100vh"}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"white"}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"#D7F0AA"}
        py={4}
        px={8}
      >
        <Box>
          <Text fontSize={{ base: "xl", lg: "2xl" }} fontWeight={"medium"}>
            Home
          </Text>
        </Box>
      </Box>
      <Box w={"full"}>
        <SalesReportStatistic />
        <ChartSuper />
      </Box>
    </Box>
  );
}

export default HomeDashboard