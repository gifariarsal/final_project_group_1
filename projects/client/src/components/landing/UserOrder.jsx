import { Box, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import UserOrderOngoing from "./UserOrderOngoing";

const UserOrder = () => {
  return (
    <Box>
      <Navbar />
      <Text ml={"96px"} mt={"24px"} fontSize={"48px"} borderBottomColor={"red"} border={"10px"}>
        Order
      </Text>
      <Stack align={"center"}>
        <Tabs isFitted variant="enclosed" w={"50%"}>
          <TabList mb="1em">
            <Tab bg={"red"} color={"white"}>
              Ongoing Order
            </Tab>
            <Tab bg={"green"} color={"white"}>
              Finished Order
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <UserOrderOngoing />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>{" "}
    </Box>
  );
};

export default UserOrder;
