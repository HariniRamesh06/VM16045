import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllNotifications from "./pages/AllNotifications";
import PriorityInbox from "./pages/PriorityInbox";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Campus Notifications</h1>

        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">All Notifications</Link>
          {" | "}
          <Link to="/priority">Priority Inbox</Link>
        </nav>

        <Routes>
          <Route path="/" element={<AllNotifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;