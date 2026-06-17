# Stage 1
## Objective
Implement a Priority Inbox that always shows the 10 most important unread notifications.
---
## Priority Rules
Weight Assignment:
- Placement = 3
- Result = 2
- Event = 1
Notifications are ranked by:
1. Weight (descending)
2. Timestamp (descending)
---
## Algorithm
1. Fetch notifications from API.
2. Convert timestamp to datetime.
3. Assign priority weight.
4. Sort by:
   - weight DESC
   - timestamp DESC
5. Return top 10.
---
## Complexity
Sorting Approach:
Time:
O(N log N)
Space:
O(N)
---
To efficiently maintain top 10 notifications:
Use a Min Heap of size 10.
Process:
1. Insert notification.
2. If heap size < 10:
   push.
3. Else compare with smallest priority.
4. Replace when new notification has higher priority.
Complexity:
Insertion:
O(log 10)
Space:
O(10)
This ensures scalability even when millions of notifications arrive.