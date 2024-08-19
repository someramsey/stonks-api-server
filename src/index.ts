import { serve } from "bun";
import router from "./router";
import { updateStocks, stocks } from "./stocks";
import { STOCK_UPDATE_INTERVAL, update } from "./schemas/stock";


const server = serve({ fetch: router.fetch });
console.log(`Server running at http://localhost:${server.port}`);

setInterval(updateStocks, STOCK_UPDATE_INTERVAL);
console.log("Stocks update started");
