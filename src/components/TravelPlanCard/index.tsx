import { DateTime } from 'luxon';
import {
  Button,
  Grid,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { TravelPlan } from 'api/types';

// Components
import CarCard from 'components/CarCard';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Helpers
import { useStyles } from './styles';
import React from 'react';

interface Props {
  readonly travelPlan: TravelPlan;
  readonly onDelete: () => void;
}

const localeOptions = { locale: 'hr', ...DateTime.DATE_SHORT };

const TravelPlanCard = ({ travelPlan, onDelete }: Props) => {
  const classes = useStyles();

  const formattedStartDate = DateTime.fromISO(
    travelPlan.startDate,
  ).toLocaleString(localeOptions);
  const formattedEndDate = DateTime.fromISO(travelPlan.endDate).toLocaleString(
    localeOptions,
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs'),
  );

  return (
    <Grid container className={classes.card}>
      <Grid container item xs={12} sm={6}>
        <Grid container className={classes.cardHeader}>
          <Grid
            container
            item
            justify={isSmallScreen ? 'center' : 'flex-start'}
            spacing={2}
          >
            <Grid item>
              <Typography variant="h6">{travelPlan.startLocation}</Typography>
            </Grid>
            <Grid item>
              <ArrowRightAltIcon />
            </Grid>
            <Grid item>
              <Typography variant="h6">{travelPlan.endLocation}</Typography>
            </Grid>
          </Grid>

          <Grid
            container
            justify={isSmallScreen ? 'center' : 'flex-start'}
            spacing={2}
          >
            <Grid item>
              <Typography variant="body2">{formattedStartDate}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">{formattedEndDate}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          alignItems={isSmallScreen ? 'center' : 'flex-start'}
          direction="column"
        >
          {travelPlan.employees.map((employee) => (
            <Grid
              item
              key={employee.employeeId}
              className={classes.typographyWithIcon}
            >
              <Typography>{employee.name}</Typography>
              {employee.isDriver && (
                <Tooltip title="Driver">
                  <DriveEtaIcon />
                </Tooltip>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid
        container
        justify={isSmallScreen ? 'center' : 'flex-start'}
        item
        xs={12}
        sm={6}
      >
        <Grid item>
          <CarCard car={travelPlan.car} />
        </Grid>
        <Grid container justify="space-around">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TravelPlanCard;
