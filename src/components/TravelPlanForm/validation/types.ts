import * as yup from 'yup';
import { travelPlanSchema } from './schema';

export type TravelPlanSchemaType = yup.InferType<typeof travelPlanSchema>;
