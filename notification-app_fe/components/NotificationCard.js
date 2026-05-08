import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

export default function NotificationCard({
  notification,
  onClick,
}) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: "pointer",
        backgroundColor: notification.viewed
          ? "#f5f5f5"
          : "#e3f2fd",
      }}
    >
      <CardContent>
        <Typography variant="h6">
          {notification.Type}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          {notification.Message}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mt: 1 }}
        >
          {notification.Timestamp}
        </Typography>

        <Chip
          label={
            notification.viewed
              ? "Viewed"
              : "New"
          }
          color={
            notification.viewed
              ? "default"
              : "primary"
          }
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
}