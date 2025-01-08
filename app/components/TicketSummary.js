export default function TicketSummary({ open, closed, total }) {
    return (
        <section className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 p-6 rounded-lg text-white shadow-md">
          <h2 className="text-2xl font-semibold">Open Tickets</h2>
          <p className="text-3xl">{open}</p>
        </div>
        <div className="bg-green-500 p-6 rounded-lg text-white shadow-md">
          <h2 className="text-2xl font-semibold">Closed Tickets</h2>
          <p className="text-3xl">{closed}</p>
        </div>
        <div className="bg-gray-500 p-6 rounded-lg text-white shadow-md">
          <h2 className="text-2xl font-semibold">All Tickets</h2>
          <p className="text-3xl">{total}</p>
        </div>
      </section>
    );
  }
