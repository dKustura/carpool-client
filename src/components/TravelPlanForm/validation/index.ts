import { Employee, TravelPlan } from 'api';
import { validateYupSchema, yupToFormErrors } from 'formik';
import { travelPlanSchema } from './schema';
import { TravelPlanSchemaType } from './types';

export const validate = async (
  values: TravelPlanSchemaType,
  employees: Employee[],
  travelPlans: TravelPlan[],
) => {
  try {
    validateYupSchema<TravelPlanSchemaType>(values, travelPlanSchema, true, {
      employees,
      travelPlans,
    });
  } catch (err) {
    return yupToFormErrors(err);
  }

  return {};
};
