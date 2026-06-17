import { useEffect, useState } from "react";
import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../services/notificationService";

// Material UI imports:
// Container, Typography, FormControl, InputLabel,
// Select, MenuItem, Button, Box, CircularProgress

export default function AllNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const limit = 10;

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);

        const data = await getNotifications();

        setNotifications(data);
      } catch (err) {
        setError("Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  // Filter logic here

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(/* type comparison */);

  // Pagination logic here

  const start = (page - 1) * limit;
  const end = start + limit;

  const currentPageNotifications =
    filteredNotifications.slice(start, end);

  const hasNextPage =
    end < filteredNotifications.length;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>All Notifications</h2>

      {/* Filter dropdown here */}

      {/* Render currentPageNotifications */}

      {currentPageNotifications.map((notification) => (
        <NotificationCard
          key={notification.ID}
          notification={notification}
        />
      ))}

      {/* Pagination buttons */}

      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>

      <button
        disabled={!hasNextPage}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
}