import React, { useEffect, useState } from "react";
import { Box, Text, Center, Flex, Spinner } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserLocation = () => {
  const userLocation = useSelector((state) => state.AuthReducer.location);
  // console.log(userLocation.state);

  return (
    <Box p={4}>
      <Center>
        {userLocation ? (
          <Flex align={"center"}>{<Text fontSize="xl">Lokasi Anda: {userLocation.state}</Text>}</Flex>
        ) : (
          <Spinner size="xs" />
        )}
      </Center>
    </Box>
  );
};

export default UserLocation;
