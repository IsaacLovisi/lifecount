import {type Request, type Response} from 'express';
import { fetchCircles } from '../../services/life360';

export async function getCircles(req: Request, res: Response){
    try{
        const data = await fetchCircles();
        res.status(200).json(data);
    } catch (error){
        res.status(500).json({error: 'Falha de comunicação com a API'});
        console.error("esse é o erro", error);
    }
};




