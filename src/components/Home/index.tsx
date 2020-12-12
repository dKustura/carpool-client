import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TravelPlanCard from 'components/TravelPlanCard';
import TravelPlanForm from 'components/TravelPlanForm';

// Helpers
import {
  Car,
  createTravelPlan,
  deleteTravelPlan,
  Employee,
  getCars,
  getEmployees,
  getTravelPlans,
  TravelPlan,
  TravelPlanCreateRequest,
} from 'api';
import { useStyles } from './styles';
import { Routes } from 'helpers/contants';

const Home = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const classes = useStyles();

  const getDeleteHandler = (travelPlanId: number) => {
    return async () => {
      try {
        await deleteTravelPlan(travelPlanId);
        fetchTravelPlans();
        toast.success('🗑️ Travel plan deleted.');
      } catch (e) {
        toast.error('❌ Error while deleting the travel plan.');
      }
    };
  };

  const fetchTravelPlans = async () => {
    try {
      const travelPlans = await getTravelPlans();
      setTravelPlans(travelPlans.data);
    } catch (e) {
      toast.error('❌ Error while loading travel plans.');
    }
  };

  const fetchCars = async () => {
    try {
      const cars = await getCars();
      setCars(cars.data);
    } catch (e) {
      toast.error('❌ Error while loading cars.');
    }
  };

  const fetchEmployees = async () => {
    try {
      const employees = await getEmployees();
      setEmployees(employees.data);
    } catch (e) {
      toast.error('❌ Error while loading employees.');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchTravelPlans(), fetchCars(), fetchEmployees()]).then(
      () => {
        setIsLoading(false);
      },
    );
  }, []);

  const onCreationFormSubmit = async (
    createRequest: TravelPlanCreateRequest,
  ) => {
    try {
      await createTravelPlan(createRequest);
      fetchTravelPlans();
      toast.success('✔️ Travel plan created.');
    } catch (e) {
      toast.error('❌ Error while creating the travel plan.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container justify="center">
        <Grid item className={classes.title}>
          <Typography variant="h1" align="center">
            Carpool Manager
          </Typography>
        </Grid>
        {isLoading ? (
          <Grid container justify="center">
            <Grid item className={classes.loadingIndicator}>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          <>
            <Grid container justify="center" className={classes.form}>
              <Grid item xs={12} sm={10}>
                <TravelPlanForm
                  employees={employees}
                  cars={cars}
                  travelPlans={travelPlans}
                  onSubmit={onCreationFormSubmit}
                />
              </Grid>
            </Grid>
            <Grid
              container
              justify="center"
              className={classes.travelPlans}
              spacing={3}
            >
              {travelPlans.map((travelPlan) => (
                <Grid item key={travelPlan.travelPlanId} xs={12} sm={10} md={6}>
                  {console.log('travelPlan', travelPlan)}
                  <TravelPlanCard
                    travelPlan={travelPlan}
                    onEdit={() =>
                      history.push(
                        `${Routes.TRAVEL_PLAN}/${travelPlan.travelPlanId}`,
                      )
                    }
                    onDelete={getDeleteHandler(travelPlan.travelPlanId)}
                  />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
