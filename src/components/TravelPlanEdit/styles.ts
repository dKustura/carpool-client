import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    title: {
      padding: '2rem',
    },
    form: {
      padding: '2rem',
    },
    loadingIndicator: {
      marginTop: theme.spacing(10),
    },
    backButton: {
      padding: '2rem',
    },
  });
});
