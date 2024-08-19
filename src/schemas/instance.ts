import { z } from "zod";

export const stockInstanceSchema = z.object({
    initialPrice: z.number(),
    price: z.number(),
    growth: z.number(),
    lowest: z.number(),
    highest: z.number(),
    history: z.object({
        ticks: z.array(z.number()),
        values: z.array(z.number())
    })
});

export type StockInstance = z.infer<typeof stockInstanceSchema>;