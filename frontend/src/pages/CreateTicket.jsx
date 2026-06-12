import { useState } from "react";
import API from "../services/api";

function CreateTicket() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
    notes: "",        // 👈 new field
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/tickets", formData);
      alert("Ticket Created");
      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
        notes: "",
      });
    } catch (error) {
      alert("Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4 font-bold">Create New Ticket</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Full Name *"
          value={formData.customer_name}
          onChange={(e) =>
            setFormData({ ...formData, customer_name: e.target.value })
          }
          required
        />

        <input
          type="email"
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Email Address *"
          value={formData.customer_email}
          onChange={(e) =>
            setFormData({ ...formData, customer_email: e.target.value })
          }
          required
        />

        <input
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Subject *"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          required
        />

        <textarea
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Description *"
          rows="3"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        {/* 👇 New notes field */}
        <textarea
          className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Notes (optional)"
          rows="2"
          value={formData.notes}
          onChange={(e) =>
            setFormData({ ...formData, notes: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-800 to-blue-500 text-white px-5 py-3 rounded-lg hover:from-blue-700 hover:to-blue-400 transition-all duration-200 shadow disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}

export default CreateTicket;