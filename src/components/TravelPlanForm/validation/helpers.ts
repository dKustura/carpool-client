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
