import { computeNextPrice, type Stock } from "./schemas/stock";

export const stocks: Stock[] = [];
export let busyUpdating = false;

export function updateStocks() {
    if (busyUpdating) {
        console.warn("WARNING: Stock update pileup");
        return;
    }

    busyUpdating = true;

    stocks.forEach(stock => {
        const volatility = stock.definition.volatility;
        const interest = stock.definition.interest;
        const basePrice = stock.definition.basePrice;

        stock.instance.headPrice = computeNextPrice(stock.instance.headPrice, basePrice, volatility, interest);
        stock.instance.tailPrice = computeNextPrice(stock.instance.tailPrice, basePrice, volatility, interest);
    });

    busyUpdating = false;
}