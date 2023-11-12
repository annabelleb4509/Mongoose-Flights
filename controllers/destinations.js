const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  index,
  create
};

async function index(req, res) {
    const destinations = await Flight.findById(req.params.id);
    res.render('flight.destinations/index', { 
        title: 'All Destinations', destinations
       });
  }

async function create(req, res) {
  const flight = await Flight.findById(req.params.id);
  // We can push (or unshift) subdocs into Mongoose arrays
  flight.destinations.push(req.body);
  try {
    // Save any changes made to the movie doc
    await flight.destinations.save();
  } catch (err) {
    console.log(err);
  }

  const newFlight = new Flight();
  // Obtain the default date
  const dt = newFlight.departure;
  // Format the date for the value attribute of the input
  let arrivalDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
  arrivalDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
  const tickets = flight.tickets
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.render('flights/show', { title: 'Flight Details', flight , tickets, arrivalDate });
}

