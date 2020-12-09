import { useEffect, useState } from 'react';

// Components
import { Container, Grid, Typography } from '@material-ui/core';
import { getTravelPlans, TravelPlan } from 'api';

//
import TravelPlanCard from 'components/TravelPlanCard';

// Helpers
import { useStyles } from './styles';
import { DateTime } from 'luxon';

const Home = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const classes = useStyles();

  const fetchTravelPlans = async () => {
    const travelPlans = await getTravelPlans();
    setTravelPlans(travelPlans.data);
  };

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item className={classes.title}>
          <Typography variant="h1">Carpool</Typography>
        </Grid>
        <Grid container>
          {travelPlans.map((travelPlan) => (
            <Grid item key={travelPlan.travelPlanId} xs={12} md={6}>
              <TravelPlanCard travelPlan={travelPlan} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
