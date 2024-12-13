export default function Statistics() {
  const ticketData = {
    id: 5,
    entities_id: 1,
    name: "Teste Wilka 4",
    date_creation: "2022-04-20T15:56:53.000Z",
    date_mod: "2023-01-26T19:56:43.000Z",
    solvedate: null,
    closedate: null,
    users_id_recipient: 2,
    status: 2,
    priority: 3,
    itilcategories_id: 0,
    type: 2,
    locations_id: 0,
  };

  return (
    <section className="m-2">
      <div className="flex justify-center items-center bg-slate-100">
        <div className="bg-white p-8 rounded-lg w-full ">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Ticket Details
          </h2>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Name:</span> {ticketData.name}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Status:</span> {ticketData.status}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Priority:</span>{" "}
              {ticketData.priority}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Type:</span> {ticketData.type}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Date Created:</span>{" "}
              {new Date(ticketData.date_creation).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">Last Modified:</span>{" "}
              {new Date(ticketData.date_mod).toLocaleDateString()}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              <span className="font-semibold">User ID Recipient:</span>{" "}
              {ticketData.users_id_recipient}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
