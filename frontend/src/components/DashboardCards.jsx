function DashboardCards({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter(t => t.status === "Open").length;
  const inProgress = tickets.filter(t => t.status === "In Progress").length;
  const closed = tickets.filter(t => t.status === "Closed").length;

  const cards = [
    { label: "Total Tickets", value: total, icon: "🎫", sub: "All time", border: "border-l-blue-500", num: "text-blue-900" },
    { label: "Open", value: open, icon: "🔓", sub: "Need attention", border: "border-l-amber-400", num: "text-amber-800" },
    { label: "In Progress", value: inProgress, icon: "⚙️", sub: "Being handled", border: "border-l-purple-400", num: "text-purple-800" },
    { label: "Closed", value: closed, icon: "✅", sub: "Resolved", border: "border-l-green-500", num: "text-green-800" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div key={card.label}
          className={`bg-white rounded-xl border border-gray-200 border-l-4 ${card.border} p-4`}>
          <div className="flex justify-between items-start mb-3">
            <p className="text-sm text-gray-500 font-medium">{card.label}</p>
            <span className="text-xl">{card.icon}</span>
          </div>
          <p className={`text-3xl font-bold ${card.num}`}>{card.value}</p>
          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;