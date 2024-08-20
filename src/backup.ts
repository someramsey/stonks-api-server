import { setStocks, stocks } from "./stocks";

const backupFile = Bun.file('backup.json');

if(await backupFile.exists()) {
    console.log("BACKUP EXISTS LOADING");

    backupFile.json().then((data) => {
        console.log("LOADED BACKUP", data);
        if(data && data.length > 0) {
            setStocks(data);
        }
    }).catch((err) => {
        console.error("Error loading backup", err);
    });
} else {
    console.log("NO BACKUP FOUND");
}

export async function backupStocks() {
    Bun.write(backupFile, JSON.stringify(stocks));    
}