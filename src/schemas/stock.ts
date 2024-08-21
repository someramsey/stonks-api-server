import { z } from "zod";
import { stockDefinitionSchema } from "./definition";
import { stockInstanceSchema } from "./instance";

export const stockSchema = z.object({
    id: z.string(),
    definition: stockDefinitionSchema,
    instance: stockInstanceSchema,
});

export type Stock = z.infer<typeof stockSchema>;
