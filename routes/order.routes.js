import express from "express";
const routerO = express.Router();
import { createOrder, updateOrderStatus, getOrders } from "../controllers/order.controller.js";

routerO.post("/order", createOrder);
routerO.put("/order:userId", updateOrderStatus);
routerO.get("/order:userId", getOrders);

export {routerO};