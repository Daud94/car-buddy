import express from 'express';
import {errorHandler} from "./middleware/error-handler";
import {notFound} from "./middleware/not-found";


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// not found handler
app.use(notFound)

// error handler
// @ts-ignore
app.use(errorHandler)

export default app;