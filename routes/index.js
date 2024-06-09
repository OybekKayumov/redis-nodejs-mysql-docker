import { Router } from "express";

import { 
  createProduct, 
  deleteProduct, 
  getAllProducts, 
  getProduct, 
  updateProduct 
} from "../handler/index.js";

//* endpoint
const appRouter = Router();

//* det all products using handler function
appRouter.get("/",getAllProducts);  // api/products =. [...]

appRouter.get("/:id", getProduct);  // api/product/3

appRouter.post("/create", createProduct);

appRouter.put("/update/:id", updateProduct); // :id => req.params.id

appRouter.delete("/delete/:id", deleteProduct);


export default appRouter;