import express from "express";
import appRouter from "./routes/index.js";
import { connectToDB } from "./db/index.js";
import { initRedisClient } from "./redis.js";

const app = express();

app.use(express.json());

app.use("/api/v1/products", appRouter);

const PORT = process.env.PORT || 5000;

const initApp = async () => {
  await connectToDB();
  await initRedisClient();
}

initApp()
.then(() => {
  app.listen(PORT, () => console.log("Server Open At Port: ", PORT));

}).catch((err) => {
  console.log('Error occurred with mysql connection. Error: ', err);
  process.exit(0);
});

// connectToDB()
// .then(() => {
//   app.listen(PORT, () => console.log("Server Open At Port: ", PORT));

// }).catch((err) => {
//   console.log('Error occurred with mysql connection. Error: ', err);
//   process.exit(0);
// });