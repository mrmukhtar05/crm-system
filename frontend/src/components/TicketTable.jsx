import { Link, useNavigate } from "react-router-dom";

const statusStyles = {
  Open: "bg-blue-100 text-blue-800",
  "In Progress": "bg-amber-100 text-amber-800",
  Closed: "bg-green-100 text-green-800",
};

function getInitials(name) {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function avatarColor(name) {
  const colors = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-amber-100 text-amber-700",
    "bg-green-100 text-green-700",
    "bg-pink-100 text-pink-700",
  ];
  return colors[name?.charCodeAt(0) % colors.length];
}

function TicketTable({ tickets }) {
  const navigate = useNavigate();

  if (tickets.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 py-16 text-center text-gray-400">
        <p className="text-4xl mb-3">🎫</p>
        <p className="font-medium">No tickets found</p>
        <p className="text-sm mt-1">Try changing search or filter</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 border-b-2 border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Ticket ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Customer
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Subject
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, i) => (
            <tr
              key={ticket.id}
              onClick={() => navigate(`/ticket/${ticket.id}`)}
              className={`border-b border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <td className="px-4 py-3">
                <Link
                  to={`/ticket/${ticket.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {ticket.ticket_id}
                </Link>
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarColor(
                      ticket.customer_name
                    )}`}
                  >
                    {getInitials(ticket.customer_name)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">{ticket.customer_name}</span>
                    <span className="text-gray-400 text-xs">{ticket.customer_email}</span>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-gray-500 max-w-xs truncate">
                {ticket.subject}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[ticket.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-400 text-xs">
                {new Date(ticket.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              <td className="px-4 py-3 text-gray-500 truncate max-w-xs">
                {ticket.notes ? (
                  ticket.notes.length > 40 ? ticket.notes.substring(0, 40) + "..." : ticket.notes
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable; 