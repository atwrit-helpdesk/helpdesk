// components/TicketModalForm.jsx

import React from "react";

const TicketModalForm = ({
  isCreating,
  isEditing,
  newTicket,
  editTicket,
  categories,
  users,
  handleCreateTicket,
  handleEditTicket,
  setNewTicket,
  setEditTicket,
  closeModal,
  isFormValid
}) => {

  const handleCancel = () => {
    if (isCreating) {
      setNewTicket({}); // Reset the newTicket state if needed
    } else if (isEditing) {
      setEditTicket({}); // Reset the editTicket state if needed
    }
    closeModal(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[800px] flex">
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
                value={isCreating ? "System" : editTicket.created_by || "System"}
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
                    : editTicket.created_date || new Date().toLocaleString()
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
                value={isCreating ? newTicket.assigned_to : editTicket.assigned_to}
                onChange={(e) =>
                  isCreating
                    ? setNewTicket({ ...newTicket, assigned_to: e.target.value })
                    : setEditTicket({
                        ...editTicket,
                        assigned_to: e.target.value,
                      })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Assignee</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="mb-4">
              <label className="block text-gray-700">Priority</label>
              <select
                value={isCreating ? newTicket.priority : editTicket.priority}
                onChange={(e) =>
                  isCreating
                    ? setNewTicket({ ...newTicket, priority: e.target.value })
                    : setEditTicket({
                        ...editTicket,
                        priority: e.target.value,
                      })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-700">Status</label>
              <select
                value={isCreating ? newTicket.status : editTicket.status}
                onChange={(e) =>
                  isCreating
                    ? setNewTicket({ ...newTicket, status: e.target.value })
                    : setEditTicket({ ...editTicket, status: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid()}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {isCreating ? "Create Ticket" : "Update Ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketModalForm;
