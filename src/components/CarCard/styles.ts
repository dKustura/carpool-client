import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    carImage: {
      position: 'absolute',
      top: '-30%',
      left: '30%',
      width: '15rem',
      zIndex: 1,
    },
    title: {
      paddingBottom: '1rem',
    },
    licensePlate: {
      backgroundColor: '#fff',
      borderRadius: 15,
      border: '1px solid black',
      padding: '0.3rem 1rem',
      zIndex: 100,
    },
    nameContainer: {
      paddingTop: '2rem',
      zIndex: 100,
    },
    nameTypography: {},
    capacityTypography: {
      fontWeight: 700,
    },
  });
});
