import "dotenv/config";

import router from "./router";

import { SIMULATION_INTERVAL } from "./simulation";
import { updateStocks } from "./stocks";
import { BACKUP_INTERVAL, loadStockList, saveStockList } from "./sync";

(async () => {
    await loadStockList();

    const port = parseInt(process.env.PORT || "3000");

    router.listen(port).on("listening", () => {
        console.log(`Server running at http://localhost:${port}`);
        
        setInterval(updateStocks, SIMULATION_INTERVAL);
        setInterval(saveStockList, BACKUP_INTERVAL);

        console.log("Stocks update interval started");
    }).on("error", (err) => {
        console.error(err);
        process.exit(1);
    });
})();