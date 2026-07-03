import {type Request, type Response} from 'express';
import { fetchCircles } from '../../services/life360.js';

export async function getCircles(req: Request, res: Response) : Promise<void>{
    try{
        const CirclesCleanData = await fetchCircles();
        res.status(200).json(CirclesCleanData);
    } catch (error){
        console.error("Erro no controller [getCircles]", error);
        res.status(500).json({error: 'Falha de comunicação com a API'});
        
    }
};




