function StatusFilter({ status, setStatus }) {
  const options = [
    { value: "", label: "All Status", emoji: "📋" },
    { value: "Open", label: "Open", emoji: "🔵" },
    { value: "In Progress", label: "In Progress", emoji: "🟡" },
    { value: "Closed", label: "Closed", emoji: "🟢" },
  ];

  const handleClear = () => {
    setStatus("");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg px-3 py-1.5 text-sm border-2 outline-none 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     transition-all duration-200 appearance-none cursor-pointer
                     bg-white hover:border-gray-400 min-w-[140px]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1.2rem",
            paddingRight: "2rem",
          }}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.emoji} {o.label}
            </option>
          ))}
        </select>
      </div>

      {status && (
        <button
          onClick={handleClear}
          className="px-2 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-600 
                     hover:bg-gray-200 hover:text-gray-800 transition-all duration-200"
        >
          ✕ Clear
        </button>
      )}
    </div>
  );
}

export default StatusFilter;