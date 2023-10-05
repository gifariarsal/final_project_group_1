import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTransactionItem, setOrderItem } from "../../../redux/reducer/UserOrderReducer";
import orderStatus from "../../../utils/orderStatus";
import dateFormatter from "../../../utils/dateFormatter";
import getImage from "../../../utils/getImage";
import priceFormatter from "../../../utils/priceFormatter";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

const UserOrderDetail = ({ isOpen, onClose, orderId }) => {
  const dispatch = useDispatch();
  const { orderItem } = useSelector((state) => state.UserOrderReducer);
  console.log(orderId);

  const handleClose = () => {
    onClose();
    dispatch(setOrderItem(""));
  }

  useEffect(() => {
    dispatch(getUserTransactionItem(orderId));
  }, [orderId]);
  console.log(orderItem);

  if (!orderItem) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"full"} flexDir={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"} py={8}>
              <Icon as={MdOutlineRemoveShoppingCart} boxSize={16} color={"gray.400"} />
              <Text mt={4} fontSize={"lg"} fontWeight={"bold"}>Order not found</Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize={"xl"} fontWeight={700}>
            Order #{orderItem.user_id}
            {orderItem.id} Detail
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"space-between"} alignItems={"center"} mb={2}>
            <Text fontWeight="bold">{orderItem.Store?.name}</Text>
            <Text
              fontWeight="bold"
              color={orderStatus[orderItem?.status]?.color}
            >
              {orderStatus[orderItem?.status]?.status}
            </Text>
          </Flex>
          <Text>Date: {dateFormatter(orderItem.createdAt)}</Text>
          <Text>User: {orderItem.name}</Text>
          <Text>Address: {orderItem.address}</Text>
          <Text>Product Price: {priceFormatter(orderItem.total_price)}</Text>
          <Text>
            Delivery Price: {priceFormatter(orderItem.delivery_price)}
          </Text>
          <Text>Discount: {priceFormatter(orderItem.total_discount)}</Text>
          <Text fontWeight="bold" mt={4}>
            Products:
          </Text>
          {orderItem.Transactionitems?.map((transactionItem, index) => (
            <Box key={transactionItem.id}>
              <Box display={"flex"} alignItems={"center"} gap={4}>
                {transactionItem.Product.product_img && (
                  <Image
                    src={getImage(transactionItem.Product.product_img)}
                    alt={transactionItem.Product.name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
                <Box>
                  <Text>{transactionItem.Product.name}</Text>
                  <Text>Qty: {transactionItem.quantity}</Text>
                  <Text>{priceFormatter(transactionItem.Product.price)}</Text>
                </Box>
              </Box>
              {index < orderItem.Transactionitems.length - 1 && (
                <Divider my={2} />
              )}
            </Box>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserOrderDetail;
