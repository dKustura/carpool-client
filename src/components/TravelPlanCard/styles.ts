import { createStyles, Theme, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    card: {
      backgroundColor: theme.palette.card.main,
      height: '100%',
      padding: '2rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      transition: 'box-shadow 0.2s ease-in-out',
      borderRadius: 15,

      '&:hover': {
        boxShadow: '0 14px 28px rgba(0,0,0,0.22), 0 10px 10px rgba(0,0,0,0.20)',
      },
    },
    infoContainer: {
      zIndex: 100,
    },
    cardHeader: {
      paddingBottom: '1rem',
    },
    typographyWithIcon: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  });
});
