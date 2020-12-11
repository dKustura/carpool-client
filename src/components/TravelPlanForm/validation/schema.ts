import * as yup from 'yup';
import { MAX_LOCATION_LENGTH } from './constants';
import {
  hasEnoughSeats,
  isCarAvailable,
  isEmployeeAvailable,
  isEmployeeDriver,
  isValidDate,
} from './helpers';

export const travelPlanSchema = yup.object({
  startLocation: yup
    .string()
    .nullable()
    .max(
      MAX_LOCATION_LENGTH,
      `Start location must be at most ${MAX_LOCATION_LENGTH} characters long.`,
    )
    .required('Start location is required.'),
  endLocation: yup
    .string()
    .nullable()
    .max(
      MAX_LOCATION_LENGTH,
      `End location must be at most ${MAX_LOCATION_LENGTH} characters long.`,
    )
    .required('End location is required.'),
  startDate: yup
    .date()
    .nullable()
    .typeError('Invalid date format.')
    .required('Start date is required.'),
  endDate: yup
    .date()
    .nullable()
    .typeError('Invalid date format.')
    .when('startDate', (startDate: Date, schema: any) => {
      if (!isValidDate(startDate)) return schema;

      return schema.min(
        startDate,
        'End date must be greater than or equal to start date.',
      );
    })
    .required('End date is required.'),
  carId: yup
    .number()
    .nullable()
    .required('Car is required.')
    .when(
      ['startDate', 'endDate'],
      // @ts-ignore
      (startDate: any, endDate: any, schema: any) => {
        if (!isValidDate(startDate) || !isValidDate(endDate)) return schema;

        return schema.test(
          'is-car-available',
          'Car is not available during selected dates.',
          (id: number | undefined, context: any) => {
            if (!id) return false;

            return isCarAvailable(
              id,
              startDate,
              endDate,
              context.options.context.travelPlans,
            );
          },
        );
      },
    ),
  employeeIds: yup
    .array()
    .of(yup.number().required())
    .required('Employees are required.')
    .when('carId', (carId: number, schema: any) => {
      if (!carId) return schema;

      return schema.test(
        'has-enough-capacity',
        'Car does not have enough seats for the number of employees.',
        (ids: number[] | undefined, context: any) => {
          if (!ids) return false;

          return hasEnoughSeats(
            carId,
            context.options.context.cars,
            ids.length,
          );
        },
      );
    })
    .when(
      ['startDate', 'endDate'],
      // @ts-ignore
      (startDate: any, endDate: any, schema: any) => {
        if (!isValidDate(startDate) || !isValidDate(endDate)) return schema;

        return schema.test(
          'are-employees-available',
          'All employees must be available during selected dates.',
          (ids: number[] | undefined, context: any) => {
            if (!ids) return false;

            return ids.every(
              (id) =>
                id &&
                isEmployeeAvailable(
                  id,
                  startDate,
                  endDate,
                  context.options.context.travelPlans,
                ),
            );
          },
        );
      },
    )
    .test(
      'has-driver',
      'Employees must have at least one driver.',
      (ids: number[] | undefined, context: any) => {
        return (
          ids?.some(
            (id) =>
              id && isEmployeeDriver(id, context.options.context.employees),
          ) || false
        );
      },
    ),
});
