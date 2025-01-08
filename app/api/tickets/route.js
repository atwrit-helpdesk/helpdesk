import { fakeUsers } from "../../data/ticketsData";
import { NextResponse } from "next/server";

// GET: Fetch all tickets
export async function GET() {
  return NextResponse.json(fakeUsers); // Assuming `fakeUsers` contains your tickets
}

// POST: Create a new ticket
export async function POST(request) {
  const data = await request.json();
  const maxId = fakeUsers.length > 0 ? Math.max(...fakeUsers.map((user) => user.id)) : 0;
  const newTicket = { id: maxId + 1, ...data };

  fakeUsers.push(newTicket); // Add new ticket to the array
  return NextResponse.json(newTicket, { status: 201 });
}
