import { pool } from "./index.js";

export const find = async () => {
  const QUERY = "select * from products";

  try {
    const client = await pool.getConnection();
    const result = await client.query(QUERY);
    //console.log('select result: ', result);
    return result[0];

  } catch (error) {
    console.log('Error occurred sql query: ', error);
    throw error;
  }  
}

export const findById = async (id) => {
  const QUERY = "select * from products where id = ?";  //! ? = [id]

  try {
    const client = await pool.getConnection();
    const result = await client.query(QUERY, [id]);
    
    return result[0];

  } catch (error) {
    console.log('Error occurred find by id query: ', error);
    throw error;
  }  
}

export const create = async (title, description, price) => {
  const QUERY = `insert into products (title, description, price) values(?,?,?)`;

  try {
    const client = await pool.getConnection();
    const result = await client.query(QUERY, [title, description, price]);
    
    return result;

  } catch (error) {
    console.log('Error occurred creating new product: ', error);
    throw error;
  }  
}

export const update = async (title, description, price, id) => {
  const QUERY = `update products set title = ?, description = ?, price = ? where id = ?`;

  try {
    const client = await pool.getConnection();
    const result = await client.query(QUERY, [title, description, price, id]);
    
    return result[0];

  } catch (error) {
    console.log('Error occurred creating new product: ', error);
    throw error;
  }  
}

export const deleteRecord = async (id) => {
  const QUERY = `delete from products where id = ?`;

  try {
    const client = await pool.getConnection();
    const result = await client.query(QUERY, [id]);
    
    return result[0];

  } catch (error) {
    console.log('Error occurred creating new product: ', error);
    throw error;
  }  
}