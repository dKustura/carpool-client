import { TravelPlanSchemaType } from './validation/types';

export const DEFAULT_FORM_VALUES: TravelPlanSchemaType = {
  startLocation: null,
  endLocation: null,
  startDate: new Date(),
  endDate: new Date(),
  carId: null,
  employeeIds: [],
};
