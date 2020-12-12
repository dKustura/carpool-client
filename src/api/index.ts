import axios from 'axios';
import config from './config';
import {
  Car,
  Employee,
  TravelPlan,
  TravelPlanCreateRequest,
  TravelPlanUpdateRequest,
} from './types';

const SERVICE_URL = `${config.HOST}:${config.PORT}/api`;

export const getCars = () => {
  return axios.get<Car[]>(`${SERVICE_URL}/Car`);
};

export const getEmployees = () => {
  return axios.get<Employee[]>(`${SERVICE_URL}/Employee`);
};

export const getTravelPlans = () => {
  return axios.get<TravelPlan[]>(`${SERVICE_URL}/TravelPlan`);
};

export const getTravelPlanById = (id: number) => {
  return axios.get<TravelPlan>(`${SERVICE_URL}/TravelPlan/${id}`);
};

export const createTravelPlan = (travelPlan: TravelPlanCreateRequest) => {
  return axios.post(`${SERVICE_URL}/TravelPlan`, travelPlan);
};

export const updateTravelPlan = (travelPlan: TravelPlanUpdateRequest) => {
  return axios.put(
    `${SERVICE_URL}/TravelPlan/${travelPlan.travelPlanId}`,
    travelPlan,
  );
};

export const deleteTravelPlan = (id: number) => {
  return axios.delete(`${SERVICE_URL}/TravelPlan/${id}`);
};

export * from './types';
