import { Express } from 'express';
import { stocks } from '../stocks';

export default (app: Express) => {
    app.post("/find", (req, res) => {
        const stockId = req.body.stockId;

        if (typeof stockId !== 'string') {
            res.status(400).send('Invalid stock id');
            return;
        }

        for (const stock of stocks) {
            if (stock.id === stockId) {
                res.send(stock);
                return;
            }
        }

        res.status(404).send('Stock not found');
    });
}