import { serve } from "bun";
import router from "./router";
import { STOCK_BACKUP_INTERVAL, STOCK_UPDATE_INTERVAL } from "./schemas/stock";
import { updateStocks } from "./stocks";
import { loadStockList, saveStockList } from "./database";

const server = serve({ fetch: router.fetch });
console.log(`Server running at http://localhost:${server.port}`);


await loadStockList();
setInterval(updateStocks, STOCK_UPDATE_INTERVAL);
setInterval(saveStockList, STOCK_BACKUP_INTERVAL);

console.log("Stocks update interval started");
