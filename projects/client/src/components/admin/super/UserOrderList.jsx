import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  getAllUserOrder,
  getUserTransactionItem,
} from "../../../redux/reducer/UserOrderReducer";
import dateFormatter from "../../../utils/dateFormatter";
import UserOrderDetail from "./UserOrderDetail";
import { Pagination } from "../../components/Pagination";
import orderStatus from "../../../utils/orderStatus";

const UserOrderList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { page } = useSelector((state) => state.UserOrderReducer);
  const { allUserOrder } = useSelector((state) => state.UserOrderReducer);
  const [orderId, setOrderId] = useState(null);
  const [index, setIndex] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const handleOrderDetail = (orderId) => {
    setOrderId(orderId);
    onOpen();
  };

  useEffect(() => {
    dispatch(getAllUserOrder({ index, startDate, endDate, orderBy, order }));
  }, [index, startDate, endDate, orderBy, order]);

  const handleFilterClick = () => {
    const startDateValue = document.getElementById("startDate").value;
    const endDateValue = document.getElementById("endDate").value;

    if (startDateValue && endDateValue && startDateValue > endDateValue) {
      toast({
        title: "Error",
        description: "End Date cannot be earlier than Start Date",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(
      getAllUserOrder({
        index,
        startDate: startDateValue,
        endDate: endDateValue,
        orderBy,
        order,
      })
    );
  };

  const handleClearDate = () => {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    dispatch(
      getAllUserOrder({ index, startDate: "", endDate: "", orderBy, order })
    );
  };

  return (
    <>
      <Accordion allowToggle mb={8}>
        <AccordionItem>
          <AccordionButton _expanded={{ bg: "#E5F2CE" }}>
            <Box as="span" flex="1" textAlign="left">
              <Text fontWeight={"medium"}>Sort</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex alignItems="center" gap={2}>
              <Select
                size={{ base: "sm", md: "md" }}
                placeholder="Select Order"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
              >
                <option value={"id"}>Invoice ID</option>
                <option value={"status"}>Status</option>
              </Select>
              <Button
                size={{ base: "sm", md: "md" }}
                bg={"brand.main"}
                color="white"
                _hover={{ bg: "brand.hover" }}
                _active={{ bg: "brand.active" }}
                onClick={(e) => {
                  setOrder(order === "asc" ? "desc" : "asc");
                  setIndex(1);
                }}
              >
                {order === "asc" ? "ASC" : "DESC"}
              </Button>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton _expanded={{ bg: "#E5F2CE" }}>
            <Box as="span" flex="1" textAlign="left">
              <Text fontWeight={"medium"}>Filter</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex alignItems="flex-end" gap={2}>
              <Box>
                <FormLabel
                  fontSize={{ base: "sm", md: "md" }}
                  htmlFor="startDate"
                >
                  Start Date
                </FormLabel>
                <Input
                  size={{ base: "sm", md: "md" }}
                  type="date"
                  id="startDate"
                />
              </Box>
              <Box>
                <FormLabel
                  fontSize={{ base: "sm", md: "md" }}
                  htmlFor="endDate"
                >
                  End Date
                </FormLabel>
                <Input
                  size={{ base: "sm", md: "md" }}
                  type="date"
                  id="endDate"
                />
              </Box>
              <Box gap={2}>
                <Button
                  size={{ base: "sm", md: "md" }}
                  bg={"brand.main"}
                  color="white"
                  _hover={{ bg: "brand.hover" }}
                  _active={{ bg: "brand.active" }}
                  onClick={handleFilterClick}
                >
                  Filter
                </Button>
                <Button
                  size={{ base: "sm", md: "md" }}
                  ml={2}
                  colorScheme="red"
                  onClick={handleClearDate}
                >
                  Clear
                </Button>
              </Box>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Box w={"full"} minH={"100vh"}>
        <Table variant="simple" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Invoice ID</Th>
              {isLargerThan768 && <Th>User</Th>}
              <Th>Date</Th>
              {isLargerThan768 && <Th>Status</Th>}
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
                {isLargerThan768 && <Td>{order.name}</Td>}
                <Td>{dateFormatter(order.createdAt)}</Td>
                {isLargerThan768 && (
                  <Td color={orderStatus[order.status].color}>
                    {orderStatus[order.status].status}
                  </Td>
                )}{" "}
                <Td>
                  <Button
                    onClick={() => handleOrderDetail(order.id)}
                    size={"sm"}
                  >
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
        <UserOrderDetail isOpen={isOpen} onClose={onClose} orderId={orderId} />
      </Box>
    </>
  );
};

export default UserOrderList;
