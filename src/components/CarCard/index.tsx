import { Grid, Typography } from '@material-ui/core';
import { Car } from 'api';

// Components
import CarSvg from './CarSvg';

// Helpers
import { useStyles } from './styles';

interface Props {
  readonly car: Car;
}

const CarCard = ({ car }: Props) => {
  const classes = useStyles();

  return (
    <div style={{ position: 'relative', height: '14rem' }}>
      <Grid
        container
        direction="column"
        justify="space-evenly"
        style={{ height: '100%' }}
      >
        <Grid container justify="center">
          <Grid item className={classes.licensePlate}>
            {car.licensePlate}
          </Grid>
        </Grid>
        <Grid item className={classes.nameContainer}>
          <Typography
            variant="h6"
            align="center"
            className={classes.nameTypography}
          >
            {car.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            align="center"
            className={classes.capacityTypography}
          >
            Number of seats: {car.capacity}
          </Typography>
        </Grid>
        <div className={classes.carImage}>
          <Grid container justify="center">
            <Grid item style={{ width: '100%' }}>
              <CarSvg color={car.color} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default CarCard;
