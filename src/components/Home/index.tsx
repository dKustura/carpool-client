import { useEffect, useState } from 'react';

// Components
import { Container, Grid, Typography } from '@material-ui/core';
import { Car, getCars, getTravelPlans, TravelPlan } from 'api';

//
import TravelPlanCard from 'components/TravelPlanCard';

// Helpers
import { useStyles } from './styles';

const Home = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const classes = useStyles();

  const fetchTravelPlans = () => {
    getTravelPlans().then((travelPlans) => {
      setTravelPlans(travelPlans.data);
    });
  };

  const fetchCars = () => {
    getCars().then((cars) => {
      setCars(cars.data);
    });
  };

  useEffect(() => {
    fetchTravelPlans();
    fetchCars();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item className={classes.title}>
          <Typography variant="h1">Carpool</Typography>
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
