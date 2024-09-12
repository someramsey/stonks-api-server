import express from 'express';
import cors from 'cors';

import buildFindStockRoute from './routes/find';
import buildStockListRoute from "./routes/list";

const app = express();

app.use(cors());
app.use(express.json())

buildFindStockRoute(app);
buildStockListRoute(app);

export default app;