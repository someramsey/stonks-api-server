import { z } from "zod";

export const stockInstanceSchema = z.object({
    headPrice: z.number(),
    tailPrice: z.number()
});

export type StockInstance = z.infer<typeof stockInstanceSchema>;