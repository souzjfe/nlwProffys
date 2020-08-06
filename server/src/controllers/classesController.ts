import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}


export default class classesControl {
    async create(request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;


        const securityTransaction = await db.transaction();
        try {
            const insertedUsersIds = await securityTransaction('users').insert({
                name,
                avatar,
                whatsapp,
                bio,
            })

            const user_id = insertedUsersIds[0];

            const insertedClassesId = await securityTransaction('classes').insert({
                subject,
                cost,
                user_id,
            })

            const class_id = insertedClassesId[0];

            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),

                };
            });

            await securityTransaction('classes_schedule').insert(classSchedule);

            securityTransaction.commit();

            return response.status(201).send();
        } catch (err) {
            console.log(err);
            await securityTransaction.rollback();
            return response.status(400).json({
                error: 'Unexpected error while creating new class'
            })
        }
    }
    async index(request: Request, response: Response) {
        const filters = request.query;
        if (!filters.subject || !filters.week_day || !filters.time) {
            return response.status(400).json({
                error: "Missing filters to search classes"
            })
        }

        const timesInMinutes = convertHourToMinutes(filters.time as string);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('classes_schedule.*')
                    .from('classes_schedule')
                    .whereRaw('`classes_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`classes_schedule`.`week_day` = ??', [Number(filters.week_day as string)])
                    .whereRaw('`class_schedule`.`from` <= ??',[timesInMinutes])
                    .whereRaw('`class_schedule`.`from` > ??',[timesInMinutes])
                }
            )
            .where('classes.subject', '=', filters.subject as string)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*']);
        return response.json(classes);
    }
}