import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
} from "@mui/material";

import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export default function PriorityPage() {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    fetchPriorityNotifications();
  }, []);

  const fetchPriorityNotifications = async () => {
    try {
      const response = await fetch(API_URL);

      const data = await response.json();

      const viewed =
        JSON.parse(localStorage.getItem("viewed")) ||
        [];

      const updated = data.notifications.map(
        (item) => ({
          ...item,
          viewed: viewed.includes(item.ID),
        })
      );

      const sorted = updated
        .sort((a, b) => {
          const weightDifference =
            weights[b.Type] - weights[a.Type];

          if (weightDifference !== 0) {
            return weightDifference;
          }

          return (
            new Date(b.Timestamp) -
            new Date(a.Timestamp)
          );
        })
        .slice(0, 10);

      setNotifications(sorted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Priority Inbox
        </Typography>

        <Grid container spacing={3}>
          {notifications.map((notification) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={notification.ID}
            >
              <NotificationCard
                notification={notification}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}