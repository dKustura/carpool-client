import { Car, Employee, TravelPlan } from 'api';

export const isEmployeeDriver = (employeeId: number, employees: Employee[]) => {
  return (
    employees.find((employee) => employee.employeeId === employeeId)
      ?.isDriver || false
  );
};

export const isCarAvailable = (
  carId: number,
  startDate: Date | string,
  endDate: Date | string,
  travelPlans: TravelPlan[],
) => {
  const travelPlansForCar = travelPlans.filter(
    (travelPlan) => travelPlan.car.carId === carId,
  );

  const isAvailable = !isOverlappingAnyTravelPlan(
    startDate,
    endDate,
    travelPlansForCar,
  );
  return isAvailable;
};

export const isEmployeeAvailable = (
  employeeId: number,
  startDate: Date | string,
  endDate: Date | string,
  travelPlans: TravelPlan[],
) => {
  const travelPlansForEmployee = travelPlans.filter((travelPlan) =>
    travelPlan.employees.some((employee) => employee.employeeId === employeeId),
  );
  const isAvailable = !isOverlappingAnyTravelPlan(
    startDate,
    endDate,
    travelPlansForEmployee,
  );
  return isAvailable;
};

export const hasEnoughSeats = (
  carId: number,
  cars: Car[],
  passengerCount: number,
) => {
  return (
    (cars.find((car) => car.carId === carId)?.capacity || 0) >= passengerCount
  );
};

const toUtcDate = (d: Date | string) => {
  const date = new Date(d);
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
  );
};

const isDateBewteenDates = (
  date: Date | string,
  start: Date | string,
  end: Date | string,
) => {
  const dateDate = toUtcDate(date);
  const startDate = toUtcDate(start);
  const endDate = toUtcDate(end);
  return dateDate >= startDate && dateDate <= endDate;
};

const isOverlappingAnyTravelPlan = (
  startDate: Date | string,
  endDate: Date | string,
  travelPlans: TravelPlan[],
) => {
  return travelPlans.some(
    (tp) =>
      isDateBewteenDates(startDate, tp.startDate, tp.endDate) ||
      isDateBewteenDates(endDate, tp.startDate, tp.endDate),
  );
};

export const isValidDate = (d: any) =>
  d && d instanceof Date && !isNaN(d.valueOf());
