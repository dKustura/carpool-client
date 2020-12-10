import { Car, Employee, TravelPlan } from 'api';

export const employeesData: Employee[] = [
  {
    employeeId: 1,
    isDriver: false,
    name: 'Domagoj Kalmeta',
  },
  {
    employeeId: 2,
    isDriver: false,
    name: 'Sime Malenica',
  },
  {
    employeeId: 3,
    isDriver: true,
    name: 'Ana Vrsaljko',
  },
  {
    employeeId: 4,
    isDriver: true,
    name: 'Franko Horvatincic',
  },
  {
    employeeId: 5,
    isDriver: false,
    name: 'Mihovil Maric',
  },
  {
    employeeId: 6,
    isDriver: true,
    name: 'Lara Vrdoljak',
  },
];

export const carsData: Car[] = [
  {
    capacity: 5,
    carId: 1,
    color: 'Blue',
    licensePlate: 'ZG 5689-GF',
    name: 'Blue VW Tiguan for travel and city rides',
    type: 'VW Tiguan',
  },
  {
    capacity: 5,
    carId: 2,
    color: 'Black',
    licensePlate: 'OS 255-BG',
    name: 'Black BMW X3 for travel',
    type: 'BMW X3',
  },
  {
    capacity: 4,
    carId: 3,
    color: 'Orange',
    licensePlate: 'ST 837-OT',
    name: 'Orange Renault Captur for travel',
    type: 'Renault Captur',
  },
  {
    capacity: 5,
    carId: 4,
    color: 'Red',
    licensePlate: 'ST 325-BA',
    name: 'Red Citroen C3 for travel and quick support',
    type: 'Citroen C3',
  },
  {
    capacity: 5,
    carId: 5,
    color: 'Gray',
    licensePlate: 'ZD 742-DF',
    name: 'Gray Skoda Octavia for travel',
    type: 'Skoda Octavia',
  },
  {
    capacity: 5,
    carId: 6,
    color: 'White',
    licensePlate: 'ZD 258-DR',
    name: 'White Honda Civic city rides',
    type: 'Honda Civic',
  },
  {
    capacity: 5,
    carId: 7,
    color: 'Yellow',
    licensePlate: 'OS 565-KA',
    name: 'Yellow Peugeot 208 for travel and city rides',
    type: 'Peugeot 208',
  },
  {
    capacity: 4,
    carId: 8,
    color: 'Yellow',
    licensePlate: 'DA 715-DF',
    name: 'Yellow VW Golf for travel and city rides',
    type: 'VW Golf',
  },
  {
    capacity: 5,
    carId: 9,
    color: 'Black',
    licensePlate: 'PU 165-TR',
    name: 'Black Mercedes-Benz C-Class for travel',
    type: 'Mercedes-Benz C-Class',
  },
  {
    capacity: 5,
    carId: 10,
    color: 'Gray',
    licensePlate: 'PU 872-PA',
    name: 'Gray Audi A5 for travel',
    type: 'Audi A5',
  },
  {
    capacity: 5,
    carId: 11,
    color: 'Red',
    licensePlate: 'ZG 9674-HB',
    name: 'Red Nissan Qashqai for travel',
    type: 'Nissan Qashqai',
  },
  {
    capacity: 4,
    carId: 12,
    color: 'Blue',
    licensePlate: 'DA 889-LT',
    name: 'Blue Ford Fiesta for quick support',
    type: 'Ford Fiesta',
  },
];

export const travelPlansData: TravelPlan[] = [
  {
    endDate: '2020-12-29T00:00:00',
    endLocation: 'Zadar',
    startDate: '2020-12-19T00:00:00',
    startLocation: 'Zagreb',
    travelPlanId: 1,
    car: {
      capacity: 5,
      carId: 1,
      color: 'Blue',
      licensePlate: 'ZG 5689-GF',
      name: 'Blue VW Tiguan for travel and city rides',
      type: 'VW Tiguan',
    },
    employees: [
      {
        employeeId: 1,
        isDriver: false,
        name: 'Domagoj Kalmeta',
      },
      {
        employeeId: 2,
        isDriver: false,
        name: 'Sime Malenica',
      },
      {
        employeeId: 3,
        isDriver: true,
        name: 'Ana Vrsaljko',
      },
    ],
  },
];
