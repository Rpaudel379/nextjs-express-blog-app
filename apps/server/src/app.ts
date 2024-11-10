import express from "express";
import path from "path";

import routes from "@/routes";
import {
  globalError,
  mongoError,
  mutlerError,
  zodError
} from "@middlewares/errors";
 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", routes);

// console.log(path.join(__dirname, "../", "./uploads"));
app.use("/uploads", express.static(path.resolve("./uploads")));

// middlewares
app.use(mutlerError);
app.use(zodError);
app.use(mongoError);
app.use(globalError);

export default app;
