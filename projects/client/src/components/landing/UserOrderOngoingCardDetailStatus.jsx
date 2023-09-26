import { Box, Button, ButtonGroup, Flex, Icon, Text } from "@chakra-ui/react";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiPackage } from "react-icons/bi";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userCancel } from "../../redux/reducer/AuthReducer";

const UserOrderOngoingCardDetailOrder = ({ status, transactionProducts }) => {
  const [confirmed, setConfirmed] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setConfirmed(true);
    if (confirmed) console.log("masuk ke confirm order");
  };

  const handleCancel = (item) => {
    // setConfirmed(false);
    console.log("cancel", item.transaction_id);
    dispatch(userCancel(item));
  };

  const handleUpload = () => {
    console.log("masuk ke upload");
  };

  if (status === 0) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="10vh"
        mt={10}
      >
        <Icon as={AiOutlineClockCircle} boxSize={12} color="gray.500" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Waiting for Payment
        </Text>
        <Text color="gray.600" mt={2}>
          Please complete your payment to continue, and upload the Payment
          information
        </Text>{" "}
        <ButtonGroup>
          <Button
            variant="outline"
            colorScheme="teal"
            mt={4}
            leftIcon={<Icon as={AiOutlineCloudUpload} />}
            onClick={handleUpload}
          >
            Upload
          </Button>
          {transactionProducts.map((item) => {
            console.log("ts_id", item.transaction_id);
            return (
              <Box key={item.id}>
                <Button
                  mt={4}
                  colorScheme="red"
                  onClick={() => handleCancel(item)}
                >
                  Cancel
                </Button>
              </Box>
            );
          })}
        </ButtonGroup>
      </Flex>
    );
  }
  if (status === 1) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="10vh"
        mt={10}
      >
        <Icon as={AiOutlineClockCircle} boxSize={12} color="gray.500" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Awaiting Admin Confirmation
        </Text>
        <Text color="gray.600" mt={2}>
          Your request is pending admin approval.
        </Text>
      </Flex>
    );
  }

  if (status === 2) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="10vh"
        mt={10}
      >
        <Icon as={BiPackage} boxSize={12} color="gray.500" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Your Order is Being Processed
        </Text>
        <Text color="gray.600" mt={2}>
          We're working on your order. It will be ready soon.
        </Text>
      </Flex>
    );
  }

  if (status === 3) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="10vh"
        mt={10}
      >
        <Icon as={LiaShippingFastSolid} boxSize={12} color="gray.500" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Your Order is Being Shipped
        </Text>
        <Text color="gray.600" mt={2}>
          We're Shipping your order. It will be There Soon.
        </Text>
      </Flex>
    );
  }

  if (status === 4) {
    return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        h="100%"
      >
        <Icon as={AiOutlineCheckCircle} boxSize={12} color="green.400" />
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          {confirmed ? "Are You Sure?" : "Confirm Your Order"}
        </Text>
        <Text color="gray.600" mt={2}>
          {confirmed
            ? 'This action cannot be undone. Click "Yes" to confirm or "No" to cancel.'
            : "Review your order details and confirm your purchase."}
        </Text>
        {confirmed ? (
          <Flex mt={4}>
            <Button colorScheme="red" mr={4} onClick={handleCancel}>
              No
            </Button>
            <Button colorScheme="green" onClick={handleConfirm}>
              Yes
            </Button>
          </Flex>
        ) : (
          <Button
            colorScheme="green"
            mt={4}
            leftIcon={<Icon as={AiOutlineCheckCircle} />}
            onClick={handleConfirm}
          >
            Confirm Order
          </Button>
        )}
      </Flex>
    );
  }

  return (
    <Box>
      ini daftar status
      <Box></Box>
    </Box>
  );
};

export default UserOrderOngoingCardDetailOrder;
