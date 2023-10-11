import express from "express";
import bodyParser from "body-parser"
import mongoose from "mongoose"
import {router} from "./routes/user.routes.js"
import {routerP} from "./routes/product.routes.js"
import {routerC} from "./routes/cart.routes.js"
import {routerO} from "./routes/order.routes.js"
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/api",router);
app.use("/api",routerP);
app.use("/api",routerC);
app.use("/api",routerO);

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", ()=>{
    console.log("Database connected");
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is connected on ${process.env.PORT}`);
})