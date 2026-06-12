import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    API.get(`/tickets/${id}`).then((res) => {
      setTicket(res.data);
      setStatus(res.data.status);
      setNotes(res.data.notes || "");   // null ko empty string
    });
  }, [id]);

  const updateTicket = async () => {
    await API.put(`/tickets/${id}`, { status, notes });
    alert("Ticket updated");
    navigate("/");
  };

  if (!ticket) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{ticket.subject}</h2>
      <p className="text-gray-600 mb-4">
        Ticket ID: {ticket.ticket_id} | Created: {new Date(ticket.created_at).toLocaleString()}
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <p className="bg-gray-50 p-3 rounded border whitespace-pre-wrap">{ticket.description}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-600"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Comments</label>
        <textarea
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-600"
          rows="4"
          placeholder="Add internal notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={updateTicket}
          className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-400 transition"
        >
          Update Ticket
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default TicketDetails;