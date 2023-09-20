import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getTransaction, getTransactionItem } from "../../redux/reducer/TransactionReducer";
import axios from "axios";
const URL_API = process.env.REACT_APP_API_BASE_URL;
const UserOrderOngoing = () => {
  const orderStatusArray = [
    { status: "Awaiting Payment", color: "red" },
    { status: "Waiting for Payment Confirmation", color: "orange" },
    { status: "Processing", color: "orange" },
    { status: "Shipped", color: "green" },
    { status: "Order Confirmed", color: "green" },
    { status: "Canceled", color: "red" },
  ];
  const { transaction, itemTransaction } = useSelector((state) => state.TransactionReducer);
  const dispatch = useDispatch();
  console.log(transaction);

  const changeDate = (createdAt) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dateObject = new Date(createdAt);
    const year = dateObject.getFullYear();
    const monthIndex = dateObject.getMonth();
    const date = dateObject.getDate();
    const monthName = monthNames[monthIndex];
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${date}-${monthName}-${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  useEffect(() => {
    dispatch(getTransaction({}));
  }, []);

  useEffect(() => {}, []);
  console.log(itemTransaction);

  return (
    <>
      {transaction.length > 0 && (
        <>
          {transaction.map((item) => (
            <Flex key={item.id} w={"100%"} border={"1px solid gray"} mb={4} p={4} justifyContent={"space-between"}>
              <Box>
                <Text fontSize={"xl"} fontWeight={"semibold"} textDecoration={"underline"} textTransform={"uppercase"}>
                  Order#{item.user_id}
                  {item.id}
                </Text>
                <Text color={"gray.400"}>{changeDate(item.createdAt)}</Text>
                <Text color={orderStatusArray[item.status].color} fontWeight={"bold"} mt={4}>
                  {orderStatusArray[item.status].status}
                </Text>
              </Box>
              <Box>
                <Image
                  src={itemTransaction.product_img}
                  alt={`Image for Order #${item.user_id}${item.id}${itemTransaction.name}`}
                />
                <Text fontWeight={"bold"}>Harga: Rp.{item.total_price},-</Text>
                <Text fontWeight={"bold"}>Harga Ongkir: Rp.{item.delivery_price},-</Text>
              </Box>
            </Flex>
          ))}
        </>
      )}
    </>
  );
};

export default UserOrderOngoing;
