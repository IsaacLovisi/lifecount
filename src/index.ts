import express, { type Request, type Response } from "express";
import { timeStamp } from "node:console";
import { config } from "dotenv";

config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.listen(port, () => console.log(`listening on port ${port}!`));
//Middleware global: converte o corpo das requisições para json
app.use(express.json());

//Rotas para teste
app.get("/ping", (req: Request, res: Response) => {
  res.send("salve");
  res.status(200).json({
    message: "Servidor Online",
    timeStamp: new Date().toISOString(),
  });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`[Servidor] Ativo na porta ${port}`);
});
