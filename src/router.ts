import { zValidator } from '@hono/zod-validator';
import { Hono, type Context } from "hono";
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { BlankInput, Handler, TypedResponse } from "hono/types";
import { z, ZodSchema } from 'zod';

import buildStockDataRoute from './routes/data';
import buildStockListRoute from "./routes/list";

const app = new Hono();

app.use(cors());
app.use(logger());

export const routes = {
    stockData: buildStockDataRoute(app),
    stockList: buildStockListRoute(app)
} as const;

export default app;


type TypedHandler<TResponse> = Handler<any, any, BlankInput, TypedResponse<TResponse>>;
type HandlerBuilder<TRoute> = (app: Hono) => TRoute;

export type Route<TResponse> = {
    path: string,
    response: ZodSchema<TResponse>
}

export type PayloadRoute<TBody, TResponse> = Route<TResponse> & {
    body: ZodSchema<TBody>
}

export function createPostRoute<
    TBody,
    TResponseSchema extends ZodSchema,
    TResponse extends z.infer<TResponseSchema>
>(path: string, body: ZodSchema<TBody>, response: TResponseSchema, handler: (context: Context, body: TBody) => TypedResponse<TResponse>): HandlerBuilder<PayloadRoute<TBody, TResponse>> {
    return (app: Hono) => {
        app.post(path, zValidator("json", body), context =>
            handler(context, context.req.valid("json"))
        );

        return { path, body, response };
    }
}

export function createGetRoute<
    TResponseSchema extends ZodSchema,
    TResponse extends z.infer<TResponseSchema>
>(path: string, response: TResponseSchema, handler: TypedHandler<TResponse>): HandlerBuilder<Route<TResponse>> {
    return (app: Hono) => {
        app.get(path, handler);

        return {
            path, response
        };
    }
}

