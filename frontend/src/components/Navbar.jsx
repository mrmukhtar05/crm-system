import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create Ticket" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="font-bold text-xl tracking-tight">
          🎫 Support CRM
        </h1>

        {/* Links with active highlighting */}
        <div className="flex gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${location.pathname === link.to
                  ? "bg-white text-blue-600 shadow"
                  : "hover:bg-blue-500 text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;