import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { updateProduct } from "../../redux/reducer/ProductReducer";

const editProductSchema = Yup.object().shape({
  newName: Yup.string().required("Name is required"),
  categoryId: Yup.string().required("Category is required"),
  price: Yup.number().required("Price must be number is required"),
  description: Yup.string().required("Description is required"),
});
export default function ModalEditProduct({ isOpen, onClose, id }) {
  const { category } = useSelector((state) => state.CategoryReducer);
  const [categories, setCategory] = useState([]);
  const dispatch = useDispatch();
  const getCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category");
      console.log("respon", response.data?.categories);
      setCategory(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  const formik = useFormik({
    initialValues: {
      id: id,
      newName: "",
      categoryId: "",
      price: "",
      admin_discount: "",
      description: "",
    },
    validationSchema: editProductSchema,
    onSubmit: (values) => {
      const productImg = document.getElementById("product_img").files[0];
      const formData = new FormData();
      formData.append("product_img", productImg);
      console.log(values, productImg);
      dispatch(updateProduct(values, productImg));
      onClose();
    },
  });
  return (
    <>
      <Box fontFamily={"montserrat"}>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <FormControl
                    isInvalid={formik.touched.newName && formik.errors.newName}
                  >
                    <Input
                      placeholder="Name Product"
                      id="newName"
                      name="newName"
                      type="text"
                      value={formik.values.newName}
                      onChange={formik.handleChange}
                    ></Input>
                    <Center>
                      {formik.touched.newName && formik.errors.newName && (
                        <FormErrorMessage>
                          {formik.errors.newName}
                        </FormErrorMessage>
                      )}
                    </Center>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.categoryId && formik.errors.categoryId
                    }
                  >
                    <Select
                      {...formik.getFieldProps("categoryId")}
                      mt={5}
                      placeholder="Select category"
                      id="categoryId"
                      name="categoryId"
                    >
                      {categories.map((item) => {
                        return <option value={item.id}>{item.name}</option>;
                      })}
                    </Select>
                  </FormControl>
                  <FormControl
                    isInvalid={formik.touched.price && formik.errors.price}
                  >
                    <Input
                      placeholder="Price"
                      id="price"
                      name="price"
                      type="number"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      mt={5}
                    ></Input>
                    <Center>
                      {formik.touched.price && formik.errors.price && (
                        <FormErrorMessage>
                          {formik.errors.price}
                        </FormErrorMessage>
                      )}
                    </Center>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.admin_discount &&
                      formik.errors.admin_discount
                    }
                  >
                    <Input
                      placeholder="Discount (optional)"
                      id="admin_discount"
                      name="admin_discount"
                      type="number"
                      value={formik.values.admin_discount}
                      onChange={formik.handleChange}
                      mt={5}
                    ></Input>
                    <Center>
                      {formik.touched.admin_discount &&
                        formik.errors.admin_discount && (
                          <FormErrorMessage>
                            {formik.errors.admin_discount}
                          </FormErrorMessage>
                        )}
                    </Center>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.description && formik.errors.description
                    }
                  >
                    <Input
                      type="textarea"
                      mt={5}
                      placeholder="Description"
                      id="description"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    ></Input>
                    <Center>
                      {formik.touched.description &&
                        formik.errors.description && (
                          <FormErrorMessage>
                            {formik.errors.description}
                          </FormErrorMessage>
                        )}
                    </Center>
                  </FormControl>
                  <FormControl
                    isInvalid={
                      formik.touched.product_img && formik.errors.product_img
                    }
                  >
                    <Input
                      type="file"
                      mt={5}
                      variant={""}
                      id="product_img"
                      name="product_img"
                      value={formik.values.product_img}
                    ></Input>
                    <Center>
                      {formik.touched.product_img &&
                        formik.errors.product_img && (
                          <FormErrorMessage>
                            {formik.errors.product_img}
                          </FormErrorMessage>
                        )}
                    </Center>
                  </FormControl>
                  <Input
                    type="hidden"
                    id="id"
                    name="id"
                    value={formik.values.id}
                    onChange={formik.handleChange}
                  />
                  <ModalFooter>
                    <Button type="submit">submit</Button>
                  </ModalFooter>
                </form>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
