import { Box, Select, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const UserTransaction = () => {
  const [user, setUser] = useState([]);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/branch/transaction`
      );
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Box fontFamily={"montserrat"} ml={"48px"} mt={"24px"}>
      <Text fontSize={"32px"}>User Order</Text>
      {user.length > 0 ? (
        <Select w={"400px"} placeholder="Select Customer">
          {user.map((users) => (
            <option key={users.id} value={users.id}>
              {users.username}
            </option>
          ))}
        </Select>
      ) : (
        <Text>No users available</Text>
      )}
    </Box>
  );
};

export default UserTransaction;
