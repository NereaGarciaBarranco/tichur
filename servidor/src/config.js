import {config as dotenv} from 'dotenv'
dotenv();

export const config = {
    host: 'localhost',
    user: 'root',
    password: 'sgz7MHM8@',
    database: 'tasks_db',
    timezone: 'utc'  //<-here this line was missing
}