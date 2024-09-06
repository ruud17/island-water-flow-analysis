import express from "express";
import cors from "cors";
import routes from "./routes";
import { config } from "./config/envVarHandler";
import { errorMiddleware } from "./middleware/errorMiddleware";

const PORT = config.PORT;

const app = express();

app.use(cors());
app.use("/api/", routes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
