import { z } from 'zod';
import { createGetRoute } from "../router";
import { stocks } from '../stocks';
import { stockStateSchema } from '../schemas/state';

export default createGetRoute("/list", z.array(stockStateSchema), context => {
    return context.json(stocks.map(stock => ({
        id: stock.id,
        name: stock.definition.name,
        abbreviation: stock.definition.abbreviation,
        description: stock.definition.description,
        price: stock.instance.headPrice
    })));
});

