import { DateTime } from 'luxon';
import { Grid, Typography } from '@material-ui/core';
import { TravelPlan } from 'api/types';
import React from 'react';
import { useStyles } from './styles';

import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

interface Props {
  readonly travelPlan: TravelPlan;
}

const localeOptions = { locale: 'hr', ...DateTime.DATE_SHORT };

const TravelPlanCard = ({ travelPlan }: Props) => {
  const classes = useStyles();

  const formattedStartDate = DateTime.fromISO(
    travelPlan.startDate,
  ).toLocaleString(localeOptions);
  const formattedEndDate = DateTime.fromISO(travelPlan.endDate).toLocaleString(
    localeOptions,
  );

  return (
    <Grid container className={classes.card}>
      <Grid container className={classes.cardHeader}>
        <Grid container alignItems="center" spacing={2}>
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
        <Grid container>
          <Grid item></Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2">{formattedStartDate}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2">{formattedEndDate}</Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item>
          <Typography>{travelPlan.carId}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TravelPlanCard;
