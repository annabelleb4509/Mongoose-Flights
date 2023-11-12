const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const destinationSchema = new Schema({
    destAirport: {
      type: String,
      enum: ['AUS', 'SIN', 'HKG', 'PEK', 'DXB', 'CDG', 'LHR', 'FRA', 'IST', 'JFK'],
    },
    arrival: {
      type: Date,
    }
  }, {
    timestamps: true
  });


const flightSchema = new Schema({
    airline: { 
        type: String, 
        enum: ['American', 'Southwest', 'United', 'Qantas', 'Singapore Airlines'], 
    },
    airport: { 
        type: String, 
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN',
    },
    flightNo: { 
        type: Number,
        min: 10,
        max: 9999
    },
    departure: { 
        type: Date, 
        default: new Date,
    },
    destinations: [destinationSchema],
    tickets: [{
      type: Schema.Types.ObjectId,
      ref: 'Ticket'
    }],
    }, {
    timestamps: true
    });

    module.exports = mongoose.model('Flight', flightSchema);