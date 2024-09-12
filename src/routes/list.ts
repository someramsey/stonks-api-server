import { Express } from 'express';
import { StockState } from '../schemas/state';
import { stocks } from '../stocks';

export default (app: Express) => {
    app.get("/list", (req, res) => {
        res.send(stocks.map<StockState>(stock => ({
            id: stock.id,
            name: stock.definition.name,
            abbreviation: stock.definition.abbreviation,
            description: stock.definition.description,
            fees: stock.definition.fees,
            price: stock.instance.headPrice
        })));
    });
}