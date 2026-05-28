import express, { Request, Response } from "express";
import { timeStamp } from "node:console";

const app = express();
const PORT = 3333;

//Middleware global: converte o corpo das requisições para json
app.use(express.json());

//Rotas para teste
app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Servidor Online',
        timeStamp: new Date().toISOString()
    });
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Servidor] Ativo na porta ${PORT}`);
});
