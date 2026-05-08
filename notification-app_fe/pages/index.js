import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";

const API_URL =
  "http://4.224.186.213/evaluation-service/notifications";

export default function Home() {
  const [notifications, setNotifications] =
    useState([]);

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const fetchNotifications = async () => {
    try {
      let url = API_URL;

      if (filter !== "All") {
        url += `?notification_type=${filter}`;
      }

      const response = await fetch(url);

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

      setNotifications(updated);
    } catch (error) {
      console.log(error);
    }
  };

  const markViewed = (id) => {
    let viewed =
      JSON.parse(localStorage.getItem("viewed")) ||
      [];

    if (!viewed.includes(id)) {
      viewed.push(id);
    }

    localStorage.setItem(
      "viewed",
      JSON.stringify(viewed)
    );

    fetchNotifications();
  };

  return (
    <>
      <Navbar />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          All Notifications
        </Typography>

        <FormControl
          sx={{ minWidth: 200, mb: 3 }}
        >
          <InputLabel>Filter</InputLabel>

          <Select
            value={filter}
            label="Filter"
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <MenuItem value="All">All</MenuItem>

            <MenuItem value="Placement">
              Placement
            </MenuItem>

            <MenuItem value="Result">
              Result
            </MenuItem>

            <MenuItem value="Event">
              Event
            </MenuItem>
          </Select>
        </FormControl>

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
                onClick={() =>
                  markViewed(notification.ID)
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}