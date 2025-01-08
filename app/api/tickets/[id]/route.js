import { NextRequest, NextResponse } from "next/server";
import { fakeUsers } from "../../../data/ticketsData"; // Adjust the path if needed

// GET request to fetch a specific ticket by id
export async function GET({ params }) {
  const { id } = params;  // Dynamically extract 'id' from params
  const ticket = fakeUsers.find((ticket) => ticket.id === id);

  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  return NextResponse.json(ticket);
}

// PUT request to update a specific ticket by id
export async function PUT(req, { params }) {
  const { id } = await params;  // Dynamically extract 'id' from params

  // Ensure id is present in params
  if (!id) {
    return new NextResponse(JSON.stringify({ message: "Ticket ID is required" }), { status: 400 });
  }

  // Find the ticket by its ID
  const ticketIndex = fakeUsers.findIndex((ticket) => ticket.id === id);

  // If the ticket is not found, return an error
  if (ticketIndex === -1) {
    return new NextResponse(JSON.stringify({ message: "Ticket not found" }), { status: 404 });
  }

  // Parse the request body to get the updated ticket data
  const updatedTicket = await req.json();

  // Update the ticket with new data
  fakeUsers[ticketIndex] = { ...fakeUsers[ticketIndex], ...updatedTicket };

  // Return the updated ticket as a JSON response
  return new NextResponse(JSON.stringify(fakeUsers[ticketIndex]), { status: 200 });
}

// DELETE request to delete a specific ticket by id
export async function DELETE({ params }) {
  const { id } = params;  // Dynamically extract 'id' from params

  // Ensure id is present in params
  if (!id) {
    return NextResponse.json({ message: "Ticket ID is required" }, { status: 400 });
  }

  const ticketIndex = fakeUsers.findIndex((ticket) => ticket.id === id);

  if (ticketIndex === -1) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  fakeUsers.splice(ticketIndex, 1);  // Remove the ticket from the list
  return NextResponse.json({ message: "Ticket deleted successfully" });
}
