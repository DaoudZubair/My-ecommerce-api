import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    productTitle:{
        type: String,
        required: true
    },
    productImage:{
        type: String,
        required: true
    },
    productPrice:{
        type: Number,
        required: true
    },
    productCategory:{
        type: String,
        required: true
    },
    productBrand:{
        type: String,
        required: true
    }
})

const schemaP= mongoose.model("Product", productSchema)
export default schemaP;