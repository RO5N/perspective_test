import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Router from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      //flexGrow: 1,
    },

    button: {
      marginLeft: 20,
    },
  }),
);

export default function ButtonAppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MBTI
          </Typography>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              Router.push('/').then(() => window.scrollTo(0, 0));
            }}
          >
            Test
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => {
              Router.push('/result').then(() => window.scrollTo(0, 0));
            }}
          >
            Results
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
