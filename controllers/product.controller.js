import Product from "../models/product.model.js"

// Create Product function
export const createProduct = async (req, res) => {
    try {
      const { productTitle, productImage, productPrice, productCategory, productBrand } = req.body;
      if (!productTitle || !productImage || !productPrice || !productCategory || !productBrand) {
        return res.status(200).json({ message: "Please provide all these mandatory fields" });
      }
  
      const newProduct = new Product({
        productTitle,
        productImage,
        productPrice,
        productCategory,
        productBrand,
      });
  
      await newProduct.save();
      res.status(400).json(newProduct); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// All products function

export const getAllProducts = async (_req, res) => {
    try {
      const products = await Product.find();
      if (products) {
        res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ message: "Error" });
    }
  };
  
  // find by param
  
export const getSingularProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
  
  // update single product by id
  
  export const updateSingleProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" }); // Handle not found
      }
    } catch (error) {
      res.status(400).json({ message: "Got an Error in Catch Block" });
    }
  };
  
  //delete single record
  
  export const deleteSingleProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id)
  ;
      if (product) {
        res.status(200).json({ message: "Successfully deleted User" });
      }
    } catch (error) {
      res.status(400).json({ message: "Error found in catch block" });
    }
  };

