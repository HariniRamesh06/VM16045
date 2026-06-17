import { Card, CardContent, Typography, Chip } from "@mui/material";

export default function NotificationCard({ notification, onRead }) {
  const viewedNotifications = JSON.parse(
    localStorage.getItem("viewedNotifications") || "[]"
  );

  const isRead = viewedNotifications.includes(notification.ID);

  const handleClick = () => {
    if (!isRead) {
      const updated = [...viewedNotifications, notification.ID];

      localStorage.setItem(
        "viewedNotifications",
        JSON.stringify(updated)
      );

      if (onRead) {
        onRead();
      }
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: "pointer",
        backgroundColor: isRead ? "#f5f5f5" : "#e8f5e9",
        borderLeft: isRead
          ? "5px solid #9e9e9e"
          : "5px solid #4caf50",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {notification.Type}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          {notification.Message}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {notification.Timestamp}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            mt: 1,
            wordBreak: "break-all",
          }}
        >
          ID: {notification.ID}
        </Typography>

        <Chip
          label={isRead ? "Read" : "Unread"}
          color={isRead ? "default" : "success"}
          size="small"
          sx={{ mt: 2 }}
        />
      </CardContent>
    </Card>
  );
}