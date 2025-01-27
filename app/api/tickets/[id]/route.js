// app/api/tickets/[id]/route.js

import clientPromise from '../../../lib/mongoose';

// app/api/tickets/[id]/route.js
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';  // Ensure mongoose is imported
import { NextResponse } from 'next/server';

// Define a schema and model for your 'tickets' collection if not already defined
const ticketSchema = new mongoose.Schema({
  // Your ticket schema definition here
});
const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);


// PUT: Update a specific ticket by ID
export async function PUT(req, context) {
  const { params } = context; // Extract `params` from `context`
  const { id } = await params; // Await `params` explicitly

  if (!id) {
    return NextResponse.json({ message: "Ticket ID is required" }, { status: 400 });
  }

  // Ensure the id is a valid ObjectId string
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Ticket ID" }, { status: 400 });
  }

  const updatedData = await req.json(); // Parse the request body

  try {
    await mongoose.connect(process.env.MONGODB_URI);  // Ensure mongoose is connected

    const result = await Ticket.updateOne(
      { _id: new ObjectId(id) }, // Convert id to ObjectId
      { $set: updatedData } // Update with the new data
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket updated successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error updating ticket:", err);
    return NextResponse.json({ error: "Failed to update ticket" }, { status: 500 });
  }
}

// DELETE: Delete a specific ticket by ID
export async function DELETE(req, context) {
  const { params } = context;
  const { id } = await params; // Await `params` explicitly

  if (!id) {
    return NextResponse.json({ message: "Ticket ID is required" }, { status: 400 });
  }

  // Ensure the id is a valid ObjectId string
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid Ticket ID" }, { status: 400 });
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);  // Ensure mongoose is connected

    const result = await Ticket.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ticket deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
