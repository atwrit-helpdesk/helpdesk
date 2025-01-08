"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardHeader from "../components/DashboardHeader";
import TicketSummary from "../components/TicketSummary";
import TicketTable from "../components/TicketTable";
import AllTicketTable from "../components/AllTicketTable";

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "Low",
    category: "",
    assignedTo: "",
    date: new Date().toLocaleString(),
    status: "Open"
  });
  
  const [editTicket, setEditTicket] = useState(null); // Populate this with the ticket to be edited
  
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  // Sample data for dropdowns
  const categories = ["Bug", "Feature Request", "Support"];

const users = [
  { id: 1, name: "Kshtij" },
  { id: 2, name: "Asjad" },
  { id: 3, name: "Viraj" },
];


  useEffect(() => {
    const storedSession = localStorage.getItem("session");
    if (storedSession) {
      setSession(JSON.parse(storedSession));
      fetchTickets();
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchTickets = async () => {
    try {
      const response = await fetch("/api/tickets");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        console.error("Failed to load tickets");
      }
    } catch (error) {
      console.error("An error occurred while fetching tickets:", error);
    }
  };

  const incrementID = (tickets) => {
    const lastTicket = tickets[tickets.length - 1];
    if (!lastTicket) {
      return "TIC-001";
    }
    const lastTicketID = lastTicket.id;
    const numericPart = parseInt(lastTicketID.split('-')[1], 10);
    const newNumericPart = String(numericPart + 1).padStart(3, "0");
    return `TIC-${newNumericPart}`;
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    try {
      const newTicketID = incrementID(tickets);
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTicket, id: newTicketID }),
      });

      if (response.ok) {
        fetchTickets();
        setNewTicket({ title: "",
          description: "",
          priority: "Low",
          category: "",
          assignedTo: "",
          date: new Date().toLocaleString(),
          status: "Open" });
          
        setIsCreating(false);
      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("An error occurred while creating the ticket:", error);
    }
  };

  const handleEditTicket = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tickets/${editTicket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTicket),
      });

      if (response.ok) {
        fetchTickets();
        setEditTicket(null);
        setIsEditing(false);
      } else {
        console.error("Failed to update ticket:", await response.text());
      }
    } catch (error) {
      console.error("An error occurred while updating the ticket:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchTickets();
      } else {
        console.error("Failed to update ticket status:", await response.text());
      }
    } catch (error)      {
      console.error("An error occurred while updating the ticket status:", error);
    }
  };

  const openEditModal = (ticket) => {
    setEditTicket(ticket);
    setIsEditing(true);
  };

  // Count open and closed tickets
  const openTicketsCount = tickets.filter(ticket => ticket.status === "Open").length;
  const closedTicketsCount = tickets.filter(ticket => ticket.status === "Closed").length;

  return (
    <div className="bg-gray-100 min-h-screen">

        {/* Header */}
        <DashboardHeader
          onAddTicket={() => setIsCreating(true)}
          onLogout={() => {
            localStorage.removeItem("session");
            router.push("/login");
          }}
        />

      <main className="container mx-auto my-8 px-4">
      {/* Summary Section */}
      <TicketSummary
        open={openTicketsCount}
        closed={closedTicketsCount}
        total={tickets.length}
      />

      {/* Ticket Table */}
        <TicketTable
          tickets={tickets}
          handleStatusChange={handleStatusChange}
          openEditModal={openEditModal}
          showAll={true} // Display all tickets (not just open ones)
        />

      </main>

      <main className="container mx-auto my-8 px-4">

      <AllTicketTable
          tickets={tickets}
          handleStatusChange={handleStatusChange}
          openEditModal={openEditModal}
        />
     </main>


{/* Modal for creating and editing tickets */}
{(isCreating || isEditing) && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg w-[800px] flex">
      {/* Left Panel */}
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl mb-4">
          {isCreating ? "Add Ticket" : "Edit Ticket"}
        </h2>
        <form onSubmit={isCreating ? handleCreateTicket : handleEditTicket}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={isCreating ? newTicket.title : editTicket.title}
              onChange={(e) =>
                isCreating
                  ? setNewTicket({ ...newTicket, title: e.target.value })
                  : setEditTicket({ ...editTicket, title: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Created By */}
          <div className="mb-4">
            <label className="block text-gray-700">Created By</label>
            <input
              type="text"
              value={isCreating ? "System" : editTicket.createdBy || "System"}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Created Date */}
          <div className="mb-4">
            <label className="block text-gray-700">Created Date</label>
            <input
              type="text"
              value={
                isCreating
                  ? new Date().toLocaleString()
                  : editTicket.createdDate || new Date().toLocaleString()
              }
              onChange={(e) =>
                isCreating
                  ? setNewTicket({ ...newTicket, date: e.target.value })
                  : setEditTicket({
                      ...editTicket,
                      date: e.target.value,
                    })
              }
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              placeholder="Description"
              value={isCreating ? newTicket.description : editTicket.description}
              onChange={(e) =>
                isCreating
                  ? setNewTicket({ ...newTicket, description: e.target.value })
                  : setEditTicket({
                      ...editTicket,
                      description: e.target.value,
                    })
              }
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700">Category</label>
            <select
              value={isCreating ? newTicket.category : editTicket.category}
              onChange={(e) =>
                isCreating
                  ? setNewTicket({ ...newTicket, category: e.target.value })
                  : setEditTicket({ ...editTicket, category: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
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

          {/* Assigned To */}
          <div className="mb-4">
            <label className="block text-gray-700">Assigned To</label>
            <select
              value={isCreating ? newTicket.assignedTo : editTicket.assignedTo}
              onChange={(e) =>
                isCreating
                  ? setNewTicket({ ...newTicket, assignedTo: e.target.value })
                  : setEditTicket({
                      ...editTicket,
                      assignedTo: e.target.value,
                    })
              }
              className="w-full p-2 border rounded-lg"
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
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => (isCreating ? setIsCreating(false) : setIsEditing(false))}
              className="bg-gray-400 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              {isCreating ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 pl-4 border-l">
        <h3 className="text-lg font-bold mb-4">Ticket History</h3>
        {editTicket?.history?.length > 0 ? (
          <ul className="space-y-2">
            {editTicket.history.map((history, index) => (
              <li
                key={index}
                className="border p-3 rounded bg-gray-50 hover:bg-gray-100"
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
)}

    </div>
  );
}
