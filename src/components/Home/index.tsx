import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components
import {
  CircularProgress,
  Container,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import TravelPlanForm from 'components/TravelPlanForm';
import TravelPlanList from 'components/TravelPlanList';

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
import { filterTravelPlans } from './helpers';
import { Routes } from 'helpers/contants';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { getStartOf } from 'helpers/date';

const initialFilterDate = getStartOf(new Date(), 'month');

const Home = () => {
  const [allTravelPlans, setAllTravelPlans] = useState<TravelPlan[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<Date | undefined>(
    initialFilterDate,
  );
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

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

  const getEditHandler = (travelPlanId: number) => {
    return () => history.push(`${Routes.TRAVEL_PLAN}/${travelPlanId}`);
  };

  const fetchTravelPlans = async () => {
    try {
      const travelPlansResponse = await getTravelPlans();
      const travelPlans = travelPlansResponse.data;
      setAllTravelPlans(travelPlans);
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

  const onFilterToggle = () => {
    setIsFilterEnabled((prevState) => !prevState);
  };

  const onFilterDateChange = (date: MaterialUiPickersDate) => {
    const filterDate = date?.toJSDate();
    setFilterDate(filterDate);
  };

  const filteredTravelPlans = useMemo(
    () => filterTravelPlans(allTravelPlans, filterDate),
    [allTravelPlans, filterDate],
  );

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
                  travelPlans={allTravelPlans}
                  onSubmit={onCreationFormSubmit}
                />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.filter}
              spacing={2}
              alignItems="center"
            >
              <Grid item>
                <Typography display="inline">Filter</Typography>
                <Switch checked={isFilterEnabled} onChange={onFilterToggle} />
              </Grid>
              <Grid
                item
                style={!isFilterEnabled ? { visibility: 'hidden' } : undefined}
              >
                <DatePicker
                  autoOk
                  variant="inline"
                  format="MM/yyyy"
                  openTo="year"
                  inputVariant="outlined"
                  views={['year', 'month']}
                  label="Filter by Month"
                  value={filterDate}
                  onChange={onFilterDateChange}
                />
              </Grid>
            </Grid>
            <Grid container className={classes.travelPlansList}>
              <TravelPlanList
                travelPlans={
                  isFilterEnabled ? filteredTravelPlans : allTravelPlans
                }
                getEditHandler={getEditHandler}
                getDeleteHandler={getDeleteHandler}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
