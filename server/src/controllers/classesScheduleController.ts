import { Request, Response } from 'express';
import db from '../database/connection';

export default class classesScheduleControl {
    async create(request: Request,response: Response){
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule 
        } = request.body;

        await db('user').insert({
            name,
            avatar,
            whatsapp,
            bio,
        })

        return response.json();
    }
}