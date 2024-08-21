import { z } from 'zod';

export const stockDefinitionSchema = z.object({
    name: z.string(),
    abbreviation: z.string(),
    description: z.string(),
    fees: z.number(),
    volatility: z.number(),
    interest: z.number(),
    basePrice: z.number()
});

export type StockDefinition = z.infer<typeof stockDefinitionSchema>;