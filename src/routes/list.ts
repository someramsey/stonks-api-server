import { z } from 'zod';
import { createGetRoute } from "../router";
import { stocks } from '../stocks';
import { stockStateSchema } from '../schemas/state';

export default createGetRoute("/list", z.array(stockStateSchema), context => {
    return context.json(stocks.map(stock => ({
        name: stock.definition.name,
        abbreviation: stock.definition.abbreviation,
        description: stock.definition.description,
        value: stock.instance.price,
        growth: stock.instance.growth
    })));
});

