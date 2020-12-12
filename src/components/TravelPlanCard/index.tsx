import React, { useState } from 'react';
import { DateTime } from 'luxon';

// Components
import {
  Button,
  CircularProgress,
  Grid,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import CarCard from 'components/CarCard';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Helpers
import { TravelPlan } from 'api/types';
import { useStyles } from './styles';

interface Props {
  readonly travelPlan: TravelPlan;
  readonly onEdit: () => Promise<void> | void;
  readonly onDelete: () => Promise<void>;
}

const localeOptions = { locale: 'hr', ...DateTime.DATE_SHORT };

const TravelPlanCard = ({ travelPlan, onEdit, onDelete }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const classes = useStyles();

  const formattedStartDate = DateTime.fromISO(
    travelPlan.startDate,
  ).toLocaleString(localeOptions);
  const formattedEndDate = DateTime.fromISO(travelPlan.endDate).toLocaleString(
    localeOptions,
  );

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const onEditClick = () => {
    onEdit();
  };

  const onDeleteClick = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <Grid container className={classes.card}>
      <Grid container item xs={12} md={6} className={classes.infoContainer}>
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
        md={6}
      >
        <Grid item>
          <CarCard car={travelPlan.car} />
        </Grid>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onEditClick}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onDeleteClick}
              startIcon={<DeleteIcon />}
            >
              {isDeleting ? (
                <CircularProgress color="secondary" size={24} thickness={6} />
              ) : (
                'Delete'
              )}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TravelPlanCard;
