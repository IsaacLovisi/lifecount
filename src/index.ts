//Server - Life360 - index.ts

import { config } from "dotenv";
config();
import express, { type Request, type Response } from "express";
import { timeStamp } from "node:console";
import circlesRoutes from './routes/circlesget/get-circles-routes.js';



const app = express();
const port = Number(process.env.PORT) || 8000;

//Middleware global: converte o corpo das requisições para json
app.use(express.json());


app.use("/api/circles", circlesRoutes);

app.listen(port, "127.0.0.1", () => {
  console.log(`[Servidor] Ativo na porta ${port}`);
});
