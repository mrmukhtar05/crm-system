import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardCards from "../components/DashboardCards";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketTable from "../components/TicketTable";

function Home() {
  const [allTickets, setAllTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Fetch all tickets once on mount
  const fetchAllTickets = async () => {
    const res = await API.get("/tickets");
    setAllTickets(res.data);
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  // Apply filters and sorting whenever allTickets, search, or status changes
  useEffect(() => {
    let result = [...allTickets];

    // 1. Status filter
    if (status) {
      result = result.filter((ticket) => ticket.status === status);
    }

    // 2. Search filter (name, email, ticket_id)
    if (search.trim()) {
      const lowerSearch = search.toLowerCase().trim();
      result = result.filter(
        (ticket) =>
          ticket.customer_name?.toLowerCase().includes(lowerSearch) ||
          ticket.customer_email?.toLowerCase().includes(lowerSearch) ||
          ticket.ticket_id?.toLowerCase().includes(lowerSearch)
      );
    }

    // 3. Relevance sorting (only when search term exists)
    if (search.trim()) {
      const getScore = (ticket, term) => {
        let score = 0;
        const name = (ticket.customer_name || "").toLowerCase();
        const email = (ticket.customer_email || "").toLowerCase();
        const ticketId = (ticket.ticket_id || "").toLowerCase();

        if (name === term) score += 100;
        else if (name.includes(term)) score += 50;

        if (email === term) score += 100;
        else if (email.includes(term)) score += 50;

        if (ticketId === term) score += 100;
        else if (ticketId.includes(term)) score += 50;

        if (name.startsWith(term)) score += 20;
        if (email.startsWith(term)) score += 20;

        return score;
      };

      result = result
        .map((t) => ({ ticket: t, score: getScore(t, search.toLowerCase()) }))
        .filter((item) => item.score > 0)  // sirf relevant tickets
        .sort((a, b) => b.score - a.score)
        .map((item) => item.ticket);
    }

    setFilteredTickets(result);
  }, [allTickets, search, status]);

  return (
    <div className="space-y-4">
      <DashboardCards tickets={filteredTickets} />

      <div className="flex gap-3 flex-wrap">
        <SearchBar search={search} setSearch={setSearch} />
        <StatusFilter status={status} setStatus={setStatus} />
      </div>

      <TicketTable tickets={filteredTickets} />
    </div>
  );
}

export default Home;