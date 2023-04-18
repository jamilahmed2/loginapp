import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./Database/conn.js";
import router from "./routes/route.js";
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); // less hacker know about our stack


const PORT = 5000;

// HTTP GET Request
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request")
});

// api routes
app.use('/api', router);

// start server only when have a valid connection
connect().then(() => {
    try {
        // start server
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`);
        })
    } catch (error) {
        console.log("Cannot connect to the server")
    }
}).catch(error => {
    console.log("Invalid database connection")
})

