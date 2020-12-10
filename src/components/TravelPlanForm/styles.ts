import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    formContainer: {
      backgroundColor: theme.palette.card.main,
      // height: '100%',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      // transition: 'box-shadow 0.2s ease-in-out',
      borderRadius: 15,
    },
  });
});
