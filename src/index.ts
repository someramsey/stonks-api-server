import { serve } from "bun";
import router from "./router";
import { STOCK_BACKUP_INTERVAL, STOCK_UPDATE_INTERVAL } from "./schemas/stock";
import { updateStocks } from "./stocks";
import { backupStocks } from "./backup";


const server = serve({ fetch: router.fetch });
console.log(`Server running at http://localhost:${server.port}`);

setInterval(updateStocks, STOCK_UPDATE_INTERVAL);
setInterval(backupStocks, STOCK_BACKUP_INTERVAL);
console.log("Stocks update started");
