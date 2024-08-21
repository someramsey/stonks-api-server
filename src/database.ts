import Airtable, { Record, type FieldSet } from "airtable";
import { computeNextPrice, STOCK_HISTORY_LENGTH } from "./schemas/stock";
import { stocks } from "./stocks";

if (!process.env.DB_API_KEY) {
    throw new Error("Missing DB_API_KEY");
}

if (!process.env.DB_BASE_ID) {
    throw new Error("Missing DB_BASE_ID");
}

const base = new Airtable({ apiKey: process.env.DB_API_KEY }).base(process.env.DB_BASE_ID);
const table = base("Stocks");

function readKey<T>(record: Record<FieldSet>, key: string): T {
    return record.get(key) as T;
}

export function saveStockList() {
    console.log("Started saving stock list");

    const chunkSize = 10;
    const chunks = [];

    for (let i = 0; i < stocks.length; i += chunkSize) {
        chunks.push(stocks.slice(i, i + chunkSize));
    }

    chunks.forEach(chunk => {
        table.update(chunk.map(stock => ({
            id: stock.id,
            fields: {
                name: stock.definition.name,
                abbreviation: stock.definition.abbreviation,
                description: stock.definition.description,
                fees: stock.definition.fees,
                interest: stock.definition.interest,
                volatility: stock.definition.volatility,
                base: stock.definition.basePrice,
                tail: stock.instance.tailPrice,
                head: stock.instance.headPrice
            }
        })));
    });

    console.log("Finished saving stock list");
}

const loadStock = (record: Record<FieldSet>): boolean => {
    const volatility = readKey<number>(record, "volatility");
    const interest = readKey<number>(record, "interest");

    const basePrice = readKey<number>(record, "base");
    const tailPrice = readKey<number>(record, "tail") || basePrice;

    let mutated = false;
    let headPrice = readKey<number>(record, "head");

    if (!headPrice) {
        console.log(`Head price for ${record.id} is missing, regenerating head from foot`);

        headPrice = tailPrice;

        for (let i = 0; i < STOCK_HISTORY_LENGTH; i++) {
            headPrice = computeNextPrice(headPrice, basePrice, volatility, interest);
        }

        mutated = true;
    }

    stocks.push({
        id: record.id,
        definition: {
            name: readKey<string>(record, "name"),
            abbreviation: readKey<string>(record, "abbreviation"),
            description: readKey<string>(record, "description"),
            fees: readKey<number>(record, "fees"),
            interest,
            volatility,
            basePrice
        },
        instance: {
            tailPrice,
            headPrice
        }
    });

    return mutated;
};

export function loadStockList(): Promise<void> {
    console.log("Started loading stock list");
    let mutated = false;

    return new Promise((resolve, reject) => {
        table.select({ pageSize: 10 }).eachPage((records, fetchNextPage) => {
            records.forEach((record) => {
                if (loadStock(record)) {
                    mutated = true;
                }
            });

            fetchNextPage();
        }, async (error) => {
            if (error) {
                reject(error);
                return;
            }

            console.log("Finished loading stock list");

            if (mutated) {
                console.log("Stock list was mutated, updating database");
                await saveStockList();
            }

            resolve();
        });
    });
}