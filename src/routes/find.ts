import { z } from 'zod';
import { createPostRoute } from "../routes";
import { stockSchema } from '../schemas/stock';
import { stocks } from '../stocks';

export default createPostRoute("/find", z.string(), stockSchema, (context, stockId) => {
    for (const stock of stocks) {
        if (stock.id === stockId) {
            return context.json(stock, 200);
        }
    }

    return context.text("Not found, invalid stock id", 400);
})