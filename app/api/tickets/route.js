// app/api/tickets/route.js
import connect from '../../lib/mongoose';
import Ticket from '../../models/Ticket'; // Correct import path
import { NextResponse } from 'next/server';

// GET: Fetch all tickets
export async function GET(req) {
  try {
    await connect();
    const tickets = await Ticket.find({});
    return NextResponse.json(tickets, { status: 200 });
  } catch (err) {
    console.error('Error fetching tickets:', err);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

// POST: Add a new ticket
export async function POST(req) {
  try {
    await connect();
    const newTicketData = await req.json(); // Parse the request body to get new ticket data

    // Create a new ticket using the parsed data
    const newTicket = new Ticket(newTicketData);

    // Save the new ticket to the database
    await newTicket.save();

    return NextResponse.json({ message: 'Ticket added successfully', ticket: newTicket }, { status: 201 });
  } catch (err) {
    console.error('Error adding ticket:', err);
    return NextResponse.json({ error: 'Failed to add ticket' }, { status: 500 });
  }
}
