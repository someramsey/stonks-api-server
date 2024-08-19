import { z } from 'zod';

export const stockStateSchema = z.object({
    name: z.string(),
    abbreviation: z.string(),
    description: z.string(),
    value: z.number(),
    growth: z.number()
});

export type StockState = z.infer<typeof stockStateSchema>;
