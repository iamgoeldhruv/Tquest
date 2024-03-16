const express = require('express');
const {connectToDatabase} = require('./database/connection');
const authRoutes = require('./routes/authroutes');
const userRoutes=require('./routes/uploadroutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/',userRoutes)
console.log("routes registered")


connectToDatabase()
    .then(() => {
       
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to database:', error);
    });
