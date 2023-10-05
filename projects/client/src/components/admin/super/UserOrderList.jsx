import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getAllUserOrder } from "../../../redux/reducer/UserOrderReducer";
import changeDate from "../../dateFormatter/dateFormatter";
import UserOrderDetail from "./UserOrderDetail";
import { Pagination } from "../../components/Pagination";

const UserOrderList = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { page } = useSelector((state) => state.UserOrderReducer);
  const { allUserOrder } = useSelector((state) => state.UserOrderReducer);
  const [detail, setDetail] = useState(false);
  const [index, setIndex] = useState(1);
  const [transactionDetail, setTransactionDetail] = useState({});
  const [transactionProducts, setTransactionProducts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [products, setProducts] = useState();

  const orderStatusArray = [
    { status: "Awaiting Payment", color: "red" },
    { status: "Waiting for Payment Confirmation", color: "orange" },
    { status: "Processing", color: "orange" },
    { status: "Shipped", color: "green" },
    { status: "Confirm Your Order", color: "green" },
    { status: "Canceled", color: "red" },
    { status: "Finished", color: "Green" },
  ];

  const handleClearStartDate = () => {
    setStartDate("");
  };
  const handleClearEndDate = () => {
    setEndDate("");
  };

  const handleOrderDetail = () => {
    onOpen();
  }

  console.log(allUserOrder);

  useEffect(() => {
    dispatch(getAllUserOrder({ index, startDate, endDate, orderBy, order }));
  }, [index, startDate, endDate, orderBy, order, detail]);
  return (
    <>
      <Flex px={8} py={4} gap={4}>
        <Box>
          <FormLabel htmlFor="startDate">Start Date</FormLabel>
          <Flex alignItems="center">
            <Input
              type="date"
              mb={4}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {startDate && (
              <Button
                ml={2}
                colorScheme="red"
                size="sm"
                onClick={handleClearStartDate}
              >
                Clear
              </Button>
            )}
          </Flex>
        </Box>
        <Box>
          <FormLabel htmlFor="endDate">End Date</FormLabel>
          <Flex alignItems="center">
            <Input
              type="date"
              mb={4}
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {endDate && (
              <Button
                ml={2}
                colorScheme="red"
                size="sm"
                onClick={handleClearEndDate}
              >
                Clear
              </Button>
            )}
          </Flex>
        </Box>
        <Box>
          <FormLabel htmlFor="orderBy">Order By</FormLabel>
          <Flex alignItems="center" gap={2}>
            <Select
              placeholder="Select Order"
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value={"id"}>Invoice ID</option>
              <option value={"status"}>Status</option>
            </Select>
            <Button
              colorScheme="green"
              onClick={(e) => {
                setOrder(order === "asc" ? "desc" : "asc");
                setIndex(1);
              }}
            >
              {order === "asc" ? "ASC" : "DESC"}
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Box w={"full"} minH={"100vh"}>
        <Table variant="simple" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Invoice ID</Th>
              <Th>User</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th>Detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUserOrder.map((order) => (
              <Tr key={order.id}>
                <Td>
                  {order.user_id}
                  {order.id}
                </Td>
                <Td>{order.name}</Td>
                <Td>{changeDate(order.createdAt)}</Td>
                <Td color={orderStatusArray[order.status].color}>
                  {orderStatusArray[order.status].status}
                </Td>
                <Td>
                  <Button onClick={handleOrderDetail} size={"sm"}>
                    Detail
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {page > 1 && (
          <Pagination page={page} index={index} setIndex={setIndex} />
        )}
        <UserOrderDetail isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
};

export default UserOrderList;