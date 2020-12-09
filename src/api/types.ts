export interface Car {
  readonly carId: number;
  readonly name: string;
  readonly type: string;
  readonly color: string;
  readonly licensePlate: string;
  readonly capacity: number;
}

export interface Employee {
  readonly employeeId: number;
  readonly name: string;
  readonly isDriver: boolean;
}

export interface TravelPlan {
  readonly travelPlanId: number;
  readonly startLocation: string;
  readonly endLocation: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly car: Car;
  readonly employees: Employee[];
}

interface TravelPlanRequest {
  startLocation: string;
  endLocation: string;
  startDate: string;
  endDate: string;
  carId: number;
  employeeIds: number[];
}

export interface TravelPlanCreateRequest extends TravelPlanRequest {}

export interface TravelPlanUpdateRequest extends TravelPlanRequest {}