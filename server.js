import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./Database/conn.js";
import router from "./routes/route.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import GeoIP from "geoip-lite";
import requestIp from "request-ip";
import UserVisit from "./model/UserVisit.js";
import dotenv from 'dotenv'
dotenv.config()
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less information about our stack

// IP tracking middleware
app.use((req, res, next) => {
    const ipAddress = requestIp.getClientIp(req);
    const location = GeoIP.lookup(ipAddress);
  
    const userVisit = new UserVisit({
      ipAddress: ipAddress,
      location: location ? `${location.city}, ${location.country}` : 'Unknown',
      timestamp: new Date()
    });
  
    userVisit.save()
      .then(() => next())
      .catch((error) => {
        console.error('Error saving user visit:', error);
        res.sendStatus(500);
      });
  });

const PORT = process.env.PORT || 5000;

// HTTP GET Request
// app.get('/', (req, res) => {
//     res.status(201).json("Home GET Request");
// });

// API routes
app.use('/api', router);

// static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start server only when there is a valid connection
connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Invalid database connection");
    });
