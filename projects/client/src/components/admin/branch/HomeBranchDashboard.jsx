import { Box, Text } from '@chakra-ui/react';
import React from 'react'
import ChartBranch from './ChartBranch';

const HomeBranchDashboard = () => {
  return (
    <Box w={"full"} minH={"100vh"}>
      <Box
        h={"62px"}
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
        <ChartBranch />
      </Box>
    </Box>
  );
}

export default HomeBranchDashboard