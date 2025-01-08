export default function TicketModal({
    isOpen,
    onClose,
    onSubmit,
    ticket,
    setTicket,
    isEditing,
    ticketHistory = [], // Array of ticket-related changes and status updates
    users = [], // Array of users for "Assigned To" dropdown
    categories = [], // Array of categories for dropdown
    subcategories = [], // Array of subcategories for dropdown
  }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow w-[800px] flex transition-all">
          {/* Left Panel */}
          <div className="w-1/2 pr-4">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Ticket" : "Create Ticket"}
            </h2>
            <form onSubmit={onSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  value={ticket.title}
                  onChange={(e) =>
                    setTicket({ ...ticket, title: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                  required
                />
              </div>
  
              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  value={ticket.description}
                  onChange={(e) =>
                    setTicket({ ...ticket, description: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                  required
                />
              </div>
  
              {/* Priority */}
              <div className="mb-4">
                <label className="block text-gray-700">Priority</label>
                <select
                  value={ticket.priority}
                  onChange={(e) =>
                    setTicket({ ...ticket, priority: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
  
              {/* Created By */}
              <div className="mb-4">
                <label className="block text-gray-700">Created By</label>
                <input
                  type="text"
                  value={ticket.createdBy || "System"}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-none"
                />
              </div>
  
              {/* Created Date */}
              <div className="mb-4">
                <label className="block text-gray-700">Created Date</label>
                <input
                  type="text"
                  value={ticket.createdDate || new Date().toLocaleString()}
                  readOnly
                  className="w-full border px-3 py-2 rounded bg-gray-100 focus:outline-none"
                />
              </div>
  
              {/* Category */}
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <select
                  value={ticket.category}
                  onChange={(e) =>
                    setTicket({ ...ticket, category: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Subcategory */}
              <div className="mb-4">
                <label className="block text-gray-700">Subcategory</label>
                <select
                  value={ticket.subcategory}
                  onChange={(e) =>
                    setTicket({ ...ticket, subcategory: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                  required
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Assigned To */}
              <div className="mb-4">
                <label className="block text-gray-700">Assigned To</label>
                <select
                  value={ticket.assignedTo}
                  onChange={(e) =>
                    setTicket({ ...ticket, assignedTo: e.target.value })
                  }
                  className="w-full border px-3 py-2 rounded focus:outline-none focus:ring transition-colors"
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
  
              {/* Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
  
          {/* Right Panel */}
          <div className="w-1/2 pl-4 border-l">
            <h3 className="text-lg font-bold mb-4">Ticket History</h3>
            {ticketHistory.length > 0 ? (
              <ul className="space-y-2">
                {ticketHistory.map((history, index) => (
                  <li
                    key={index}
                    className="border p-3 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <p className="text-sm text-gray-700">{history.date}</p>
                    <p className="text-sm font-semibold">{history.change}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No history available.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  