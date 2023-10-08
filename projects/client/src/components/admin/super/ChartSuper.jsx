import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailyOrderData } from "../../../redux/reducer/UserOrderReducer";
import { Box, Flex, Text } from "@chakra-ui/react";
import priceFormatter from "../../../utils/priceFormatter";
import Chart from "chart.js/auto";

const ChartSuper = () => {
  const dispatch = useDispatch();
  const { dailyOrderData } = useSelector((state) => state.UserOrderReducer);
  const chartRef = useRef(null);

  useEffect(() => {
    dispatch(getDailyOrderData());
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (!dailyOrderData || Object.keys(dailyOrderData).length === 0) {
      return;
    }

    const labels = Object.keys(dailyOrderData);
    const branchNames = Object.keys(dailyOrderData[labels[0]]);
    const branchColors = ["#2ecc71", "#3498db", "#f39c12"];
    const datasets = branchNames.map((branchName, index) => ({
      label: `${branchName}`,
      data: labels.map((date) => dailyOrderData[date][branchName] || 0),
      backgroundColor: branchColors[index],
    }));

    const ctx = document.getElementById("myChart");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return priceFormatter(value);
              },
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                return `${priceFormatter(value)}`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [dailyOrderData]);

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <Box
      p={4}
        w="80%"
        h="400px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
      >
        <canvas id="myChart" width="400" height="200"></canvas>
      </Box>
      <Text mt={4} fontSize="xl" fontWeight="bold">
        Daily Sales of All Branch
      </Text>
    </Flex>
  );
};

export default ChartSuper;
