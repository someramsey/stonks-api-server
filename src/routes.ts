import { zValidator } from '@hono/zod-validator';
import { Hono, type Context } from "hono";
import type { BlankInput, Handler, TypedResponse } from "hono/types";
import { z, ZodSchema } from 'zod';

type TypedHandler<TResponse> = Handler<any, any, BlankInput, TypedResponse<TResponse>>;
type HandlerBuilder<TRoute> = (app: Hono) => TRoute;

export type Route<TResponse> = {
    path: string,
    response: ZodSchema<TResponse>
}

export type PayloadRoute<TBody, TResponse> = Route<TResponse> & {
    body: ZodSchema<TBody>
}

type HttpErrorCodes = 400 | 401 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 418 | 421 | 422 | 423 | 424 | 425 | 426 | 428 | 429 | 431 | 451 | 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

export function createPostRoute<
    TBody,
    TResponseSchema extends ZodSchema,
    TResponse extends z.infer<TResponseSchema>
>(path: string, body: ZodSchema<TBody>, response: TResponseSchema, handler: (context: Context, body: TBody) => TypedResponse<TResponse> | TypedResponse<string, HttpErrorCodes, "text"> ): HandlerBuilder<PayloadRoute<TBody, TResponse>> {
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

