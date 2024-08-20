import { z } from "zod";
import { stockDefinitionSchema } from "./definition";
import { stockInstanceSchema, type StockInstance } from "./instance";

export const stockSchema = z.object({
    definition: stockDefinitionSchema,
    instance: stockInstanceSchema,
});

export type Stock = z.infer<typeof stockSchema>;

export const MAX_STOCK_HISTORY = 180;
export const STOCK_UPDATE_INTERVAL = 5000;
export const STOCK_BACKUP_INTERVAL = 20000;

const generatePseudo = (current: number) => {
    const seed = current * 1000;
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
}

export function update(instance: StockInstance, volatility: number, interest: number) {
    if (instance.history.values.length >= MAX_STOCK_HISTORY) {
        instance.history.ticks.shift();
        instance.history.values.shift();
    }

    const rnd = generatePseudo(instance.price);

    const size = 2 * volatility;
    let magnitude = size * rnd;

    if (magnitude > volatility) {
        magnitude -= size;
    }

    const changeAmount = instance.price * magnitude;
    let newPrice = Math.max(0, instance.price + changeAmount);

    newPrice = lerp(newPrice, instance.initialPrice, 0.001 * instance.initialPrice * interest);

    instance.growth = (newPrice - instance.price) / instance.price;
    instance.lowest = Math.min(instance.lowest, newPrice);
    instance.highest = Math.max(instance.highest, newPrice);

    instance.history.ticks.push(Date.now());
    instance.history.values.push(newPrice);

    instance.price = newPrice;
}