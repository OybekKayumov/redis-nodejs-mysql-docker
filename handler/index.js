import { create, deleteRecord, find, findById, update } from "../db/queries.js";
import { getValue, setValue } from "../redis.js";

export const getAllProducts = async (req, res) => {
  //return res.send("getAllProducts");

  try {
    const products = await find();
    return res.status(200).json({ products })
  } catch (error) {
    console.log('getAllProducts error: ', error);
    res.status(500).json({message: "Error occurred while getting all products"})
  }

};

//* uses Redis Cache
export const getProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const value = await getValue(id);
    if (value) {
      console.log('Value exists in Redis Memory: ', value);
      return res.status(200).json({ product: value });
    }

    const product = await findById(id);
    //* cache this value
    await setValue(id, product[0]);

    return res.status(200).json({ product })
    
  } catch (error) {
    console.log('get product by id error: ', error);
    res.status(500).json({message: "Error occurred while getting product by id"})
  }
};

export const createProduct = async (req, res) => {
  const {title, description, price} = req.body;

  if (!title || !description || !price) {
    return res
        .status(403)
        .json({ message: "Input params were not provided"})
  }

  try {
    const product = await create(title, description, price);
           //* created
    res.status(201).json({ product })
  } catch (error) {
    console.log('getAllProducts error: ', error);
    res.status(500).json({message: "Error occurred while creating product"})
  }
};

export const updateProduct = async (req, res) => {
  const {title, description, price} = req.body;
  const id = req.params.id;

  if (!title || !description || !price) {
    return res
        .status(403)
        .json({ message: "Input params were not provided"})
  }

  try {
    const product = await update(title, description, price, id);
           //* created
    res.status(200).json({ product })
  } catch (error) {
    console.log('update Product error: ', error);
    res.status(500).json({message: "Error occurred while updating product"})
  }
};

export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await deleteRecord(id);
           //* created
    res.status(200).json({ product })
  } catch (error) {
    console.log('delete product error: ', error);
    res.status(500).json({message: "Error occurred while deleting product"})
  }
};