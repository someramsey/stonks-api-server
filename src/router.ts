import { Hono } from "hono";
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import buildFindStockRoute from './routes/find';
import buildStockListRoute from "./routes/list";

const app = new Hono();

app.use(cors());
app.use(logger());

export const routes = {
    findStock: buildFindStockRoute(app),
    stockList: buildStockListRoute(app)
} as const;

export default app;

