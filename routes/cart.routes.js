import express from "express";
const routerC = express.Router();

import { addToCart, createCart, deleteCart, getCart } from "../controllers/cart.controller.js";

routerC.post("/cart", addToCart);
routerC.get("/cart:userId", createCart);
routerC.delete("/cart:userId", deleteCart);
routerC.get("/cart:userId", getCart);



export {routerC};