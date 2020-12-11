import * as yup from 'yup';
import { travelPlanSchema } from './schema';

export type TravelPlanSchemaType = Partial<
  yup.InferType<typeof travelPlanSchema>
>;
