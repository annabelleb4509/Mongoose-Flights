const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
  new: newTicket,
  create,
  addToFlight
};


async function addToFlight(req, res) {
    const flightTicket = await Flight.findById(req.params.id);
    // The flight array holds the tickets's ObjectId (referencing)
    flightTicket.tickets.push(req.body.ticketId);

    const flight = await Flight.findById(req.params.id).populate('tickets');
    const tickets = await Ticket.find({flight: flight._id}).sort('seat');
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departure;
    // Format the date for the value attribute of the input
    let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/show', { title: 'Flight Details', flight, tickets, arrivalDate }); 
  }

async function newTicket(req, res) {
  const tickets = await Ticket.find({}).sort('seat');
  res.render(`flights/${flight._id}`, { title: 'Add Ticket', tickets });
}

async function create(req, res) {
    const newTicket = await Ticket.create(req.body);
    const flightTicket = await Flight.findById(req.params.id);
    flightTicket.tickets.push(newTicket);
    try {
        
        await flightTicket.save();
    } catch (err) {
        console.log(err);
    }
    const flight = await Flight.findById(req.params.id).populate('tickets');
    const tickets = flight.tickets
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departure;
    // Format the date for the value attribute of the input
    let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/show', { title: 'Flight Details', flight, tickets, arrivalDate }); 
}




