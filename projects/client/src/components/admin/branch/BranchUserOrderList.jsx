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
  IconButton,
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
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchUserOrder } from "../../../redux/reducer/UserOrderReducer";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { OrderPagination } from "../super/OrderPagination";
import UserOrderDetail from "../super/UserOrderDetail";
import dateFormatter from "../../../utils/dateFormatter";
import orderStatus from "../../../utils/orderStatus";
import {
  branchSendOrder,
  branchUserCancel,
  branchUserConfirm,
} from "../../../redux/reducer/AdminReducer";
import Swal from "sweetalert2";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillSendCheckFill } from "react-icons/bs";

const BranchUserOrderList = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { store_id } = useParams();
  const { page } = useSelector((state) => state.UserOrderReducer);
  const { branchUserOrder } = useSelector((state) => state.UserOrderReducer);
  const [orderId, setOrderId] = useState(null);
  const [index, setIndex] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [render, setRender] = useState(false);

  const handleOrderDetail = (orderId) => {
    setOrderId(orderId);
    onOpen();
  };

  useEffect(() => {
    dispatch(
      getBranchUserOrder({
        index,
        startDate,
        endDate,
        orderBy,
        order,
        store_id,
      })
    );
  }, [index, startDate, endDate, orderBy, order, render]);

  const handleFilterClick = () => {
    const startDateValue = document.getElementById("startDate").value;
    const endDateValue = document.getElementById("endDate").value;

    setStartDate(startDateValue);
    setEndDate(endDateValue);

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

    const filter = {
      index,
      startDate,
      endDate,
      orderBy,
      order,
      store_id,
    };

    dispatch(getBranchUserOrder(filter));
  };

  const handleClearDate = () => {
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    dispatch(
      getBranchUserOrder({
        index,
        startDate: "",
        endDate: "",
        orderBy,
        order,
        store_id,
      })
    );
  };
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
      getBranchUserOrder();
    }
  };
  const buttonConfirm = async (item) => {
    console.log("confirm awal ", item);
    // dispatch(userCancel(item));
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm order!",
    });
    if (result.isConfirmed) {
      dispatch(branchUserConfirm(item));
      console.log("confirm ", item);
      Swal.fire("Cancel!", "Order Confirm.", "success");
      setRender(true);
      getBranchUserOrder();
    }
  };
  const buttonSend = async (item) => {
    console.log("send ", item);
    // dispatch(userCancel(item));
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send order!",
    });
    if (result.isConfirmed) {
      dispatch(branchSendOrder(item));
      Swal.fire("Cancel!", "Order Confirm.", "success");
      setRender(true);
      getBranchUserOrder();
    }
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
            <Flex wrap={"wrap"} alignItems="flex-end" gap={2}>
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
        {branchUserOrder.length > 0 ? (
          <Table variant="simple" colorScheme="green">
            <Thead>
              <Tr>
                <Th>Invoice ID</Th>
                {isLargerThan768 && <Th>User</Th>}
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Detail</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {branchUserOrder.map((order) => (
                <Tr key={order.id}>
                  <Td>
                    {order.id}
                    {order.user_id}
                  </Td>
                  {isLargerThan768 && <Td>{order.name}</Td>}
                  <Td>{dateFormatter(order.createdAt)}</Td>
                  <Td color={orderStatus[order.status].color}>
                    {orderStatus[order?.status]?.status}
                  </Td>
                  <Td>
                    <Button
                      onClick={() => handleOrderDetail(order.id)}
                      size={"sm"}
                    >
                      Detail
                    </Button>
                  </Td>
                  <Td>
                    <Td>
                      {order.status === 0 ? (
                        <Box>
                          <Button
                            variant={""}
                            _hover={{ bg: "red", color: "white" }}
                            onClick={() => handleCancel(order)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      ) : order.status === 2 ? (
                        <Box>
                          <Button
                            variant={""}
                            _hover={{ bg: "red", color: "white" }}
                            onClick={() => handleCancel(order)}
                          >
                            Cancel
                          </Button>
                          <IconButton
                            onClick={() => buttonSend(order)}
                            variant={""}
                            borderRadius={"30px"}
                            _hover={{ bg: "brand.hover", color: "white" }}
                            icon={<BsFillSendCheckFill />}
                          />
                        </Box>
                      ) : order.status === 1 ? (
                        <Box>
                          <Button
                            variant={""}
                            _hover={{ bg: "red", color: "white" }}
                            onClick={() => handleCancel(order)}
                          >
                            Cancel
                          </Button>
                          <IconButton
                            onClick={() => buttonConfirm(order)}
                            variant={""}
                            borderRadius={"30px"}
                            _hover={{ bg: "brand.hover", color: "white" }}
                            icon={<AiOutlineCheck />}
                          />
                        </Box>
                      ) : order.status === 3 ? (
                        <Box>
                          <Text>AMAN</Text>
                          {/* <Button
                        variant={""}
                        _hover={{ bg: "red", color: "white" }}
                        onClick={() => handleCancel(item)}
                      >
                        Cancel
                      </Button>
                      <IconButton
                        variant={""}
                        borderRadius={"30px"}
                        _hover={{ bg: "brand.hover", color: "white" }}
                        icon={<AiOutlineCheck />}
                      /> */}
                        </Box>
                      ) : (
                        ""
                      )}
                    </Td>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Box
            w={"full"}
            flexDir={"column"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Icon
              mt={4}
              as={MdOutlineRemoveShoppingCart}
              boxSize={16}
              color={"gray.400"}
            />
            <Text mt={4} fontSize={"lg"} fontWeight={"medium"}>
              No data found
            </Text>
          </Box>
        )}
        {page > 1 && (
          <OrderPagination page={page} index={index} setIndex={setIndex} />
        )}
        <UserOrderDetail isOpen={isOpen} onClose={onClose} orderId={orderId} />
      </Box>
    </>
  );
};

export default BranchUserOrderList;
