const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (server) => {
    const corsOptions = {
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credential: true,
    }
    server.use(cors(corsOptions));
};