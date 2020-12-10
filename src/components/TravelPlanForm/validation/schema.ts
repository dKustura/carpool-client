import * as yup from 'yup';
import { Props as TravelPlanFormProps } from '..';
import { MAX_LOCATION_LENGTH } from './constants';
import { isCarAvailable, isEmployeeDriver } from './helpers';

export const travelPlanSchema = yup.object({
  startLocation: yup
    .string()
    .max(
      MAX_LOCATION_LENGTH,
      `Start location must be at most ${MAX_LOCATION_LENGTH} characters long.`,
    )
    .required('Start location is required.'),
  endLocation: yup
    .string()
    .max(
      MAX_LOCATION_LENGTH,
      `End location must be at most ${MAX_LOCATION_LENGTH} characters long.`,
    )
    .required('End location is required.'),
  startDate: yup.date().required('Start date is required.'),
  endDate: yup
    .date()
    .when('startDate', (startDate: Date) => {
      return yup
        .date()
        .min(startDate, 'End date must be after or equal to start date.');
    })
    .required('End date is required.'),
  carId: yup
    .number()
    .required('Car is required.')
    .when(
      ['startDate', 'endDate'],
      // @ts-ignore
      (startDate: any, endDate: any, schema: any) => {
        return (
          startDate &&
          endDate &&
          schema.test(
            'is-car-available',
            'Car is not available during selected dates.',
            (id: number | undefined, context: any) => {
              if (id) {
                return isCarAvailable(
                  id,
                  startDate,
                  endDate,
                  context.options.context.travelPlans,
                );
              }

              return false;
            },
          )
        );
      },
    ),
  employeeIds: yup
    .array()
    .of(yup.number().required())
    .required('Employees are required.')
    .test(
      'has-driver',
      'Employees must have at least one driver.',
      (ids: number[], context: any) => {
        if (ids) {
          return ids.some(
            (id) =>
              id && isEmployeeDriver(id, context.options.context.employees),
          );
        }
        return false;
      },
    ),
  // TODO: Add missing validations
  // check if employees are available
  // check if number of employees is <= car capacity
});
