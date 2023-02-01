import express from 'express';
import dotenv from 'dotenv';
import { dBConnection } from './config/db-connect.js';
import userRoute from './routes/user-route.js';

dotenv.config();
dBConnection();

const port = process.env.PORT || 9000;
const app = express();

// middleware and conversion for express to json
app.use(express.json())

app.use("/api/v1/users", userRoute) // app.use is middleware


app.listen(port, () => console.log(`Server is running at ${port}`))