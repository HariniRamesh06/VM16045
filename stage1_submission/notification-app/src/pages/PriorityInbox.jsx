import { useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import NotificationCard from "../components/NotificationCard";

const weights = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export default function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [topCount, setTopCount] = useState(10);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const data = await getNotifications();

    const sorted = [...data].sort((a, b) => {
      const weightDiff =
        weights[b.Type] - weights[a.Type];

      if (weightDiff !== 0) {
        return weightDiff;
      }

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    setNotifications(sorted);
  }

  return (
    <div>
      <h2>Priority Inbox</h2>

      <select
        value={topCount}
        onChange={(e) =>
          setTopCount(Number(e.target.value))
        }
      >
        <option value={10}>Top 10</option>
        <option value={15}>Top 15</option>
        <option value={20}>Top 20</option>
      </select>

      <br />
      <br />

      {notifications
        .slice(0, topCount)
        .map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
          />
        ))}
    </div>
  );
}