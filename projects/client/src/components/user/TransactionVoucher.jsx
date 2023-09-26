import { Box, Button, Center, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React from 'react'
import StoreVoucher from './StoreVoucher';
import UserVoucher from './UserVoucher';

const TransactionVoucher = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Center>
            <Text fontSize={"xl"} fontWeight={700}>
              Voucher You Might Use
            </Text>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Tabs isFitted variant="line" colorScheme='green'>
            <TabList mb="1em">
              <Tab>Store Voucher</Tab>
              <Tab>User Voucher</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <StoreVoucher />
              </TabPanel>
              <TabPanel>
                <UserVoucher />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            display={"flex"}
            justifyContent={"center"}
            w={"100%"}
            mt={"6"}
            rounded={"lg"}
            color={"white"}
            bgColor={"brand.main"}
            // onClick={onSubmit}
            // isLoading={submitLoading}
            _hover={{ bgColor: "brand.hover" }}
            _active={{ bgColor: "brand.active" }}
          >
            Use Voucher
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TransactionVoucher;