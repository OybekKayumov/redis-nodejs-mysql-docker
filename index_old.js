console.log('Hello ');

import express from "express";
import appRouter from "./routes/index.js";
import { connectToDB } from "./db/index.js";
import{ config } from "dotenv";

const app = express();

config()

//* attache middlewares to make "POST" request
//* will parse incoming data to json
app.use(express.json());  //! undefined

/* simple requests examples
app.get("/", (req, res, next) => {
    console.log('request method: ', req.method);
    //res.send("Hi");
    res.send("<h1>Hello Redis</h1>");
});

//* post
app.post("/", (req, res, next) => {
    //console.log('request method: ', req.method);
    console.log('request body: ', req.body);
    res.send("Post");
});
*/

//* use middleware for req
app.use("/api/v1/products", appRouter);

//* create basic server
const PORT = process.env.PORT || 5000;

//* connect to mysql
//connectToDB();
// .then(() => {
//   app.listen(PORT, () => console.log("Server Open At Port: ", PORT));

// }).catch((err) => {
//   console.log('Error occurred with mysql connection. Error: ', err);
//   process.exit(0);
// });

app.listen(PORT, () => console.log("Server Open At Port: ", PORT));
