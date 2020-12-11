import { Car, Employee, TravelPlan } from 'api';
import { validateYupSchema, yupToFormErrors } from 'formik';
import { travelPlanSchema } from './schema';
import { TravelPlanSchemaType } from './types';

export const validate = async (
  values: TravelPlanSchemaType,
  cars: Car[],
  employees: Employee[],
  travelPlans: TravelPlan[],
) => {
  try {
    validateYupSchema<TravelPlanSchemaType>(values, travelPlanSchema, true, {
      cars,
      employees,
      travelPlans,
    });
  } catch (err) {
    return yupToFormErrors(err);
  }

  return {};
};
