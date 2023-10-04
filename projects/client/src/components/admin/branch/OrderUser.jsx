import {
  Box,
  Button,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userCancel } from "../../../redux/reducer/AuthReducer";
import { branchUserCancel } from "../../../redux/reducer/AdminReducer";
import Swal from "sweetalert2";

const OrderUser = () => {
  const [render, setRender] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const dispatch = useDispatch();

  const getAllTransaction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/branch/transaction`
      );
      console.log("all tr", response);
      setAllTransaction(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransaction();
  }, [render]);

  // const handleButtonClick = () => {
  //   getAllTransaction();
  // };
  const handleCancel = async (item) => {
    console.log("cancel", item);
    // dispatch(userCancel(item));
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel order!",
    });
    if (result.isConfirmed) {
      dispatch(branchUserCancel(item));
      Swal.fire("Cancel!", "The product has been canceled.", "success");
      setRender(true);
      getAllTransaction();
    }
  };

  return (
    <Box
      fontFamily={"montserrat"}
      ml={"48px"}
      mt={{ base: "12px", lg: "24px" }}
    >
      <Text fontSize={"32px"}>User Order</Text>
      {/* <Button
        mt={"10px"}
        variant={""}
        _hover={{ color: "brand.hover" }}
        onClick={handleButtonClick}
      >
        Show All Transaction
      </Button> */}
      <TableContainer
        mt={"10px"}
        ml={"-40px"}
        // w={{ base: "600px", lg: "100%" }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Total Price</Th>
              <Th>Courier</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allTransaction.map((item) => (
              <Tr key={item.id}>
                <Td fontSize={"10px"}>{item.User?.username}</Td>
                {/* <Td fontSize={"12px"}>{item.address}</Td> */}
                <Td
                  fontSize={{ base: "12px", md: "12px", lg: "12px" }}
                  maxW={{ base: "120px", md: "150px", lg: "320px" }}
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {item.address}
                </Td>

                <Td fontSize={"12px"}>{item.total_price}</Td>
                <Td>{item.courier}</Td>
                <Td textColor={item.status === 5 ? "red" : "green"}>
                  {item.status === 0
                    ? "Waiting"
                    : item.status === 5
                    ? "Canceled"
                    : null}
                </Td>
                <Td>
                  {item.status === 0 ? (
                    <Box>
                      <Button
                        variant={""}
                        _hover={{ bg: "red", color: "white" }}
                        onClick={() => handleCancel(item)}
                      >
                        Cancel
                      </Button>
                      <Button>Send</Button>
                    </Box>
                  ) : (
                    ""
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderUser;
