import { TravelPlanSchemaType } from './validation/types';

export const DEFAULT_FORM_VALUES: TravelPlanSchemaType = {
  startLocation: '',
  endLocation: '',
  startDate: new Date(),
  endDate: new Date(),
  carId: 0,
  employeeIds: [],
};
