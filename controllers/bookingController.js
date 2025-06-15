const express = require('express');
const router = express.Router();
const Booking = require('../modals/booking');

async function registerBooking(req, res)
{
    try {
        const booking=new Booking(req.body);
        await booking.save();

        // Notify driver if connected
        const io = req.app.get('io');
        const drivers = req.app.get('drivers');
        const driverSocketId = drivers[booking.driver.toString()];
        if (driverSocketId) {
        io.to(driverSocketId).emit('newBooking', booking);
        }

        res.status(201).json({ message: 'Booking registered successfully', booking });
    } catch (error) {
        res.status(400).json({ message: 'Error registering booking', error: error.message });
    }
};

async function updateBooking(req, res) {
    try {
        // Accept bookingId and status from body for POST requests
        const id = req.body.bookingId || req.params.id || req.query.bookingid;
        const status_input = req.body.status || req.params.status || req.query.status;

        if (!id || !status_input) {
            return res.status(400).json({ message: 'Missing booking id or status' });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status: status_input },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking status updated', booking });
    } catch (error) {
        res.status(400).json({ message: 'Error updating booking', error: error.message });
    }
}



module.exports = {
registerBooking,
updateBooking
};