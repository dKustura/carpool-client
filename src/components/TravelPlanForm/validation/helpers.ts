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

  const isAvailable = !travelPlansForCar.some(
    (tp) =>
      isDateBewteenDates(startDate, tp.startDate, tp.endDate) ||
      isDateBewteenDates(endDate, tp.startDate, tp.endDate),
  );
  return isAvailable;
};

const isDateBewteenDates = (
  date: Date | string,
  start: Date | string,
  end: Date | string,
) => {
  const dateDate = new Date(date);
  const startDate = new Date(start);
  const endDate = new Date(end);
  return dateDate >= startDate && dateDate <= endDate;
};
