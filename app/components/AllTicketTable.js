export default function TicketTable({ tickets, handleStatusChange, openEditModal, showAll }) {
  return (
    <section className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Tickets</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2 text-left">Ticket ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Priority</th>
            <th className="px-4 py-2 text-left">Assigned To</th>
            <th className="px-4 py-2 text-left">Creation Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{ticket.ticket_id}</td>
              <td className="px-4 py-2">{ticket.title}</td>
              <td className="px-4 py-2">{ticket.description}</td>
              <td className="px-4 py-2">{ticket.priority}</td>
              <td className="px-4 py-2">{ticket.assigned_to}</td>
              <td className="px-4 py-2">{new Date(ticket.created_date).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                {/* Status dropdown */}
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(ticket._id, e.target.value)} // This triggers the status change
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </td>
              <td className="px-4 py-2 space-x-2">
                {/* Edit Button */}
                <button
                  onClick={() => openEditModal(ticket)}
                  className="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
                >
                  Edit
                </button>
                {/* Close Button (used for closing the ticket) */}
                <button
                  onClick={() => handleStatusChange(ticket._id, "Closed")}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
