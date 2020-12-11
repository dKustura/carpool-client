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
      <Grid container justify="center">
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
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '25%',
            width: '100%',
          }}
          className={classes.carImage}
        >
          <Grid container justify="center">
            <Grid item>
              <CarSvg color={car.color} />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </div>
  );
};

export default CarCard;
