import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTicket />} />
          {/* ✅ Use :id (numeric) - matches the Link to={`/ticket/${ticket.id}`} */}
          <Route path="/ticket/:id" element={<TicketDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;