const { client, connectToDatabase } = require('../database/connection');

// Ensure the database connection is established
connectToDatabase();

async function getBookingsByBookingId(req, res) {
    console.log('Request Query:', req.query);
    const bookingId = req.query.booking_id;
    console.log(bookingId);

    try {
        // Get the MongoDB database instance from the client
        const db = client.db('tquest');
        
        // Check if the 'customer' collection exists
        const collectionExists = await db.listCollections({ name: 'customer' }).hasNext();

        if (!collectionExists) {
            return res.status(404).json({ error: 'Customer collection not found' });
        }

        // Get the 'customer' collection
        const collection = db.collection('customer');

        // Find bookings based on the booking_id
        const bookings = await collection.find({ booking_id: bookingId }).toArray();
        
        // Send the bookings data as a JSON response
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getBookingsByBookingId };
