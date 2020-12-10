import { useEffect, useState } from 'react';

// Components
import { Container, Grid, Typography } from '@material-ui/core';
import TravelPlanCard from 'components/TravelPlanCard';
import TravelPlanForm from 'components/TravelPlanForm';

// Helpers
import {
  Car,
  Employee,
  getCars,
  getEmployees,
  getTravelPlans,
  TravelPlan,
} from 'api';
import { useStyles } from './styles';
import { carsData, employeesData, travelPlansData } from './data';

const Home = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>(travelPlansData);
  const [cars, setCars] = useState<Car[]>(carsData);
  const [employees, setEmployees] = useState<Employee[]>(employeesData);
  const classes = useStyles();

  // const fetchTravelPlans = () => {
  //   getTravelPlans().then((travelPlans) => {
  //     setTravelPlans(travelPlans.data);
  //   });
  // };

  // const fetchCars = () => {
  //   getCars().then((cars) => {
  //     setCars(cars.data);
  //   });
  // };

  // const fetchEmployees = () => {
  //   getEmployees().then((employees) => {
  //     setEmployees(employees.data);
  //   });
  // };

  // useEffect(() => {
  //   fetchTravelPlans();
  //   fetchCars();
  //   fetchEmployees();
  // }, []);

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item className={classes.title}>
          <Typography variant="h1">Carpool Manager</Typography>
        </Grid>
        <Grid container justify="center" className={classes.form}>
          <Grid item xs={12}>
            <TravelPlanForm
              employees={employees}
              cars={cars}
              travelPlans={travelPlans}
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          {travelPlans.map((travelPlan) => (
            <Grid item key={travelPlan.travelPlanId} xs={12} sm={10} md={6}>
              <TravelPlanCard travelPlan={travelPlan} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
