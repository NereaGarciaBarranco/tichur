import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import {options} from "./swaggerOptions";

const specs = swaggerJSDoc(options)

import tasksRoutes from './routes/tasks';
import usersRoutes from './routes/users';
import sesionesRoutes from './routes/sesiones';
import gruposRoutes from './routes/grupos';

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use(tasksRoutes);
app.use(usersRoutes);
app.use(sesionesRoutes);
app.use(gruposRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app;