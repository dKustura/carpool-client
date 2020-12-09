import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    carImage: {
      opacity: 0.5,
    },
    title: {
      paddingBottom: '1rem',
    },
    licensePlate: {
      backgroundColor: '#fff',
      borderRadius: 15,
      border: '1px solid black',
      padding: '0.3rem 1rem',
    },
  });
});
