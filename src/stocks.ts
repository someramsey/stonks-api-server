import type { Stock } from "./schemas/stock";
import { simulateStock } from "./simulation";

export const stocks: Stock[] = [];
export let busyUpdating = false;

export function updateStocks() {
    if (busyUpdating) {
        console.warn("WARNING: Stock update pileup");
        return;
    }

    busyUpdating = true;

    stocks.forEach(simulateStock);

    busyUpdating = false;
}