import express, { Request, Response } from "express";
import connectDB from "./config/database";
import * as dotenv from 'dotenv';
import userRoutes from './routers/userRoutes'
import roleRoutes from './routers/roleRoutes'
import categoryRoutes from './routers/categoryRoutes'
import authorRoutes from './routers/authorRoutes'
import bookRoutes from './routers/bookRoutes'

dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user',userRoutes);
app.use('/api/role',roleRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/author',authorRoutes);
app.use('/api/book', bookRoutes)


connectDB();


app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});


