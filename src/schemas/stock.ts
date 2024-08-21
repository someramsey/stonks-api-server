import { z } from "zod";
import { stockDefinitionSchema } from "./definition";
import { stockInstanceSchema, type StockInstance } from "./instance";

export const stockSchema = z.object({
    id: z.string(),
    definition: stockDefinitionSchema,
    instance: stockInstanceSchema,
});

export type Stock = z.infer<typeof stockSchema>;

export const STOCK_HISTORY_LENGTH = 180;
export const STOCK_UPDATE_INTERVAL = 10 * 1000;
export const STOCK_BACKUP_INTERVAL = 5 * 60 * 1000;

const generatePseudo = (current: number) => {
    const seed = current * 1000;
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
}

export function computeNextPrice(value: number, initialValue: number, volatility: number, interest: number) {
    const step = generatePseudo(value);

    const magnitude = (2 * step - 1) * volatility;

    const priceDelta = value * magnitude;
    const updatedPrice = Math.max(0, value + priceDelta);

    return lerp(updatedPrice, initialValue, 0.001 * initialValue * interest);
}
