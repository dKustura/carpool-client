import { TravelPlanSchemaType } from './validation/types';
import { DateTime } from 'luxon';

export const DEFAULT_FORM_VALUES: TravelPlanSchemaType = {
  startLocation: '',
  endLocation: '',
  startDate: DateTime.utc().startOf('day').toJSDate(),
  endDate: DateTime.utc().startOf('day').toJSDate(),
  carId: null,
  employeeIds: [],
};
