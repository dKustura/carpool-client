import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    carImage: {
      opacity: 0.5,
      position: 'absolute',
      top: '-25%',
      left: '25%',
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
    },
    nameTypography: {
      // fontWeight: 500,
    },
    capacityTypography: {
      fontWeight: 700,
    },
  });
});
