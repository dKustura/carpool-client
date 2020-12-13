import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Components
import TravelPlanForm, { FormValuesType } from 'components/TravelPlanForm';
import { CircularProgress, Container, Fab, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Helpers
import { Routes } from 'helpers/contants';
import { RouteParams } from './types';
import {
  Car,
  Employee,
  getCars,
  getEmployees,
  getTravelPlanById,
  getTravelPlans,
  TravelPlan,
  TravelPlanRequest,
  TravelPlanUpdateRequest,
  updateTravelPlan,
} from 'api';
import { toast } from 'react-toastify';
import { useStyles } from './styles';
import { toUtcDate } from 'helpers/date';

const TravelPlanEdit = () => {
  const [travelPlan, setTravelPlan] = useState<TravelPlan>();
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const classes = useStyles();

  const fetchTravelPlan = async (id: number) => {
    try {
      const travelPlan = await getTravelPlanById(id);
      setTravelPlan(travelPlan.data);
    } catch (e) {
      toast.error('❌ Error while loading edited travel plan.');
    }
  };

  const fetchTravelPlans = useCallback(async () => {
    try {
      const travelPlansResponse = await getTravelPlans();
      let travelPlans = travelPlansResponse.data;

      // Filter out the diting travel plan from collection of travel plans
      if (id) {
        travelPlans = travelPlans.filter((tp) => {
          const editId = +id;
          return tp.travelPlanId !== editId;
        });
      }
      setTravelPlans(travelPlans);
    } catch (e) {
      toast.error('❌ Error while loading travel plans.');
    }
  }, [id]);

  const fetchCars = async () => {
    try {
      const carsResponse = await getCars();
      setCars(carsResponse.data);
    } catch (e) {
      toast.error('❌ Error while loading cars.');
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeesResponse = await getEmployees();
      setEmployees(employeesResponse.data);
    } catch (e) {
      toast.error('❌ Error while loading employees.');
    }
  };

  const onEditSubmit = async (request: TravelPlanRequest) => {
    if (!id || isNaN(id as any)) return;

    const idNumber = +id;
    const updateRequest: TravelPlanUpdateRequest = {
      ...request,
      travelPlanId: idNumber,
    };

    try {
      await updateTravelPlan(updateRequest);
      toast.success('✔️ Travel plan updated.');
      redirectToHome();
    } catch (e) {
      toast.error('❌ Error while updating the travel plan.');
    }
  };

  const redirectToHome = useCallback(() => {
    history.push(`${Routes.HOME}`);
  }, [history]);

  useEffect(() => {
    if (!id || isNaN(id as any)) {
      redirectToHome();
      return;
    }

    setIsLoading(true);
    Promise.all([
      fetchTravelPlans(),
      fetchCars(),
      fetchEmployees(),
      fetchTravelPlan(+id),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [history, id, fetchTravelPlans, redirectToHome]);

  const initialFormValues: FormValuesType | undefined = useMemo(() => {
    if (!travelPlan) return undefined;

    const startDate = toUtcDate(travelPlan.startDate);
    const endDate = toUtcDate(travelPlan.endDate);

    return {
      startLocation: travelPlan.startLocation,
      endLocation: travelPlan.endLocation,
      startDate,
      endDate,
      carId: travelPlan.car.carId,
      employeeIds: travelPlan.employees.map((employee) => employee.employeeId),
    };
  }, [travelPlan]);

  return isLoading ? (
    <Grid container justify="center">
      <Grid item className={classes.loadingIndicator}>
        <CircularProgress />
      </Grid>
    </Grid>
  ) : (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item className={classes.backButton}>
          <Fab variant="extended" color="primary" onClick={redirectToHome}>
            <ArrowBackIcon />
            Home
          </Fab>
        </Grid>
        <Grid container justify="center" className={classes.form}>
          <Grid item xs={12} sm={10}>
            <TravelPlanForm
              employees={employees}
              cars={cars}
              travelPlans={travelPlans}
              onSubmit={onEditSubmit}
              initialValues={initialFormValues}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TravelPlanEdit;
