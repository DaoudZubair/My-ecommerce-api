import express from "express"

const routerP = express.Router();

// Create users
import {createProduct, getAllProducts, getSingularProduct, updateSingleProduct, deleteSingleProduct} from "../controllers/product.controller.js"


// Routes for products controller
routerP.post("/product", createProduct)
routerP.get("/product", getAllProducts)
routerP.get("/product/:id", getSingularProduct)
routerP.put("/product/:id", updateSingleProduct)
routerP.delete("/product/:id", deleteSingleProduct)

export {routerP}