import * as yup from 'yup';
import { travelPlanSchema } from './schema';

type Nullable<T> = {
  [P in keyof T]: T[P] | null | undefined;
};

export type TravelPlanSchemaType = Nullable<
  yup.InferType<typeof travelPlanSchema>
>;
