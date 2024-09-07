import { serve } from "bun";
import { BACKUP_INTERVAL, loadStockList, saveStockList } from "./sync";
import router from "./router";
import { SIMULATION_INTERVAL } from "./simulation";
import { updateStocks } from "./stocks";

await loadStockList();

const server = serve({ fetch: router.fetch });
console.log(`Server running at http://localhost:${server.port}`);


setInterval(updateStocks, SIMULATION_INTERVAL);
setInterval(saveStockList, BACKUP_INTERVAL);

console.log("Stocks update interval started");
