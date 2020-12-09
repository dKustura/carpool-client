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
    <Grid container justify="center">
      <Grid item xs={12}>
        <div className={classes.carImage}>
          <CarSvg color={car.color} />
        </div>
      </Grid>
      <Grid item className={classes.licensePlate}>
        {car.licensePlate}
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center">
          {car.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="center">
          Number of seats: {car.capacity}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CarCard;
