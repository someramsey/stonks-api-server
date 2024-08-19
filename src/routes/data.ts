import { z } from 'zod';
import { createPostRoute } from "../router";
import { stocks } from '../stocks';
import { stockSchema } from '../schemas/stock';

export default createPostRoute("/data", z.number(), stockSchema, (context, stockId) => {
    return context.json(stocks[stockId]);
})