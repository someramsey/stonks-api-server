import { setStocks, stocks } from "./stocks";

const backupFile = Bun.file('backup.json');

if(await backupFile.exists()) {
    backupFile.json().then((data) => {
        if(data && data.length > 0) {
            setStocks(data);
        }
    });
}

export async function backupStocks() {
    Bun.write(backupFile, JSON.stringify(stocks));    
}