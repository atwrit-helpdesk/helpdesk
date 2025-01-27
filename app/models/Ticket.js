import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  ticket_id : { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  created_by: { type: String, default: 'System' }, // Default value can be set to 'System'
  created_date: { type: Date, default: Date.now }, // Default value to current date/time
  category: { type: String, required: true },
  assigned_to: { type: String, required: true }, // Can be assigned to a user
  history: [{
    date: { type: Date, default: Date.now },
    change: String
  }]
});

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);
export default Ticket;
