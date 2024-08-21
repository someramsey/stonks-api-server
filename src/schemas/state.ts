import { z } from 'zod';

export const stockStateSchema = z.object({
    name: z.string(),
    abbreviation: z.string(),
    description: z.string(),
    price: z.number()
});

export type StockState = z.infer<typeof stockStateSchema>;
