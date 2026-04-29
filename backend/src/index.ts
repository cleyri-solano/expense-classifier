import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./presentation/routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));