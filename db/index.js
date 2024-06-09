//import { createConnection } from "mysql2";
import { createPool } from "mysql2/promise";

const pool = createPool({
  // port: process.env.MYSQL_PORT,
  // password: process.env.MYSQL_PASSWORD,
  // host: process.env.MYSQL_HOST,
  // database: process.env.MYSQL_DB_NAME,
  // user: process.env.MYSQL_USER,

  port: 3306,
  password: "testtest",
  host: "localhost",
  database: "ecom",
  user: "root",
});

const connectToDB = async () => {
  try {
    await pool.getConnection();
    console.log('MySQL Connection Successful...');
  } catch (error) {
    console.log('DB Connection Error: ', error);
    throw error;
  }  
};

export { connectToDB, pool };