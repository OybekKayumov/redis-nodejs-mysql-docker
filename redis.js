//import { createClient } from "redis"; // 6379 port
import { createClient } from "redis";

let client;

const initRedisClient = async () => {
  if (!client) {
    client = createClient();
    client.on("error", () => console.log('Error creating redis client'));
  }

  try {
    await client.connect();
    
  } catch (error) {
    console.log('Error while initializing redis ');
    throw error;
  }
};

const getValue = async (key) => {
  try {
    const value = await client.json.get(`user:${key}`);  //* /user:key
    return value;
  } catch (error) {
    console.log('Error while getting value for key ', key);
    throw error;
  }
}

const setValue = async (key, value) => {
  try {
    const data = await client.json.set(`user:${key}`, "$", value);
    return data;                        //* $ -> from root directory
  } catch (error) {
    console.log('Error while setting value for key ', key);
    throw error;
  }
}

export { initRedisClient, getValue, setValue }
