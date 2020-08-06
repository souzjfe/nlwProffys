import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();


app.use(cors()); // liberando requisicoes json
app.use(express.json()); //fazendo o express entender json
app.use(routes);


app.listen(3333);