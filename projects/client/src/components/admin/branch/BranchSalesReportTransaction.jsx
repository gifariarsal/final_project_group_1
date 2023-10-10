import { Table, Thead, Tbody, Tr, Th, Td, Box, Center, Skeleton, Stack, Badge } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";
const URL_API = process.env.REACT_APP_API_BASE_URL;

const BranchSalesReportTransaction = ({ id, orderState, endDateState, startDateState }) => {
  const { order, setOrder } = orderState;
  const { endDate, setEndDate } = endDateState;
  const { startDate, setStartDate } = startDateState;
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

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

  const orderStatusArray = [
    { status: "Awaiting Payment", color: "red" },
    { status: "Waiting for Payment Confirmation", color: "orange" },
    { status: "Processing", color: "orange" },
    { status: "Shipped", color: "green" },
    { status: "Confirm Your Order", color: "green" },
    { status: "Cancelled", color: "red" },
    { status: "Finished", color: "green" },
  ];

  const [transaction, setTransaction] = useState(null);
  const fetchData = async () => {
    try {
      let query = `?page=${index}`;
      if (startDate) query += `&startDate=${startDate}`;
      if (endDate) query += `&endDate=${endDate}`;
      if (order) query += `&order=${order}`;
      const { data } = await axios.get(`${URL_API}/report/transaction/${id}/${query}`);
      await setPage(data.totalPage);
      await setTransaction(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [order, endDate, startDate, index]);

  return (
    <Stack>
      <Center w={"100%"} mt={"24px"}>
        <Table variant="simple" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Date</Th>
              <Th>Total Price</Th>
              <Th>Delivery Price</Th>
              <Th>Discount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transaction &&
              transaction.map((item, index) => (
                <Tr key={index} _hover={{ bg: "gray.100" }} cursor={"pointer"}>
                  <Td>
                    {item.user_id}
                    {item.id}
                  </Td>
                  <Td>{changeDate(item.createdAt)}</Td>
                  <Td>Rp.{item.total_price},-</Td>
                  <Td>Rp.{item.delivery_price},-</Td>
                  <Td>Rp.{item.total_discount},-</Td>
                  <Td>
                    <Badge
                      bg={orderStatusArray[item.status]?.color}
                      fontWeight={"bold"}
                      mt={4}
                      textColor={"white"}
                      borderRadius={"2xl"}
                      px={3}
                      py={1}>
                      {orderStatusArray[item.status]?.status}
                    </Badge>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Center>
      <Pagination page={page} index={index} setIndex={setIndex} />
    </Stack>
  );
};

export default BranchSalesReportTransaction;
