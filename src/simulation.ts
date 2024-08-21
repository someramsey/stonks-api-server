import type { StockDefinition } from "./schemas/definition";
import type { Stock } from "./schemas/stock";

export const STOCK_HISTORY_LENGTH = 180;
export const SIMULATION_INTERVAL = 10 * 1000;

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

export function simulateStock(stock: Stock) {
    const volatility = stock.definition.volatility;
    const interest = stock.definition.interest;
    const basePrice = stock.definition.basePrice;

    stock.instance.headPrice = computeNextPrice(stock.instance.headPrice, basePrice, volatility, interest);
    stock.instance.tailPrice = computeNextPrice(stock.instance.tailPrice, basePrice, volatility, interest);
}