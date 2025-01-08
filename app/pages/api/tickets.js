// /pages/api/tickets.js
import path from 'path';
import fs from 'fs';

const ticketsFilePath = path.join(process.cwd(), 'app', 'data', 'tickets.json');

const readTickets = () => {
  const data = fs.readFileSync(ticketsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeTickets = (tickets) => {
  fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));
};

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const tickets = readTickets();
        res.status(200).json(tickets);
      } catch (error) {
        res.status(500).json({ error: 'Failed to load tickets in api' });
      }
      break;

    case 'POST':
      try {
        const tickets = readTickets();
        const newTicket = req.body;
        tickets.push(newTicket);
        writeTickets(tickets);
        res.status(201).json(newTicket);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create ticket' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        let tickets = readTickets();
        tickets = tickets.filter((ticket) => ticket.id !== id);
        writeTickets(tickets);
        res.status(200).json({ message: 'Ticket deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete ticket' });
      }
      break;

    default:
      res.status(405).json({ error: 'Method Not Allowed' });
  }
}
