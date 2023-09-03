import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

const GeocodeForm = () => {
  const [query, setQuery] = useState("");
  const [locationData, setLocationData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8000/api/geocode?query=${query}`
      );
      setLocationData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl" fontWeight="bold">
        Cari Lokasi
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl id="query" isRequired>
          <FormLabel>Masukkan alamat atau nama tempat</FormLabel>
          <Input
            type="text"
            placeholder="Masukkan alamat atau nama tempat"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Cari
        </Button>
      </form>
      {locationData && (
        <Box>
          <Text fontSize="lg" fontWeight="bold" mt={4}>
            Hasil:
          </Text>
          <Text>
            Latitude: {locationData.geometry.lat}, Longitude:{" "}
            {locationData.geometry.lng}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

export default GeocodeForm;
