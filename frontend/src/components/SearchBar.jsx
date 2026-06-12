import { useState, useEffect, useRef } from "react";

function SearchBar({ search, setSearch }) {
  const [inputValue, setInputValue] = useState(search);
  const debounceTimer = useRef(null);

  // Debounce: update parent only after user stops typing
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
      }
    }, 300);
    return () => clearTimeout(debounceTimer.current);
  }, [inputValue, setSearch, search]);

  // Sync input when parent clears search externally
  useEffect(() => {
    if (search !== inputValue) {
      setInputValue(search);
    }
  }, [search]);

  const handleClear = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search by name, email, or ticket ID..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-3 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-transparent transition-all shadow-sm"
        aria-label="Search tickets"
      />

      {/* Clear Button - appears when input has text */}
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                     hover:text-gray-600 hover:bg-gray-100 rounded-full p-1
                     transition-all duration-200 text-xl font-bold"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;