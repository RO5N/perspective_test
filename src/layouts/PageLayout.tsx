import React from 'react';
import Head from 'next/head';
import PrimaryAppBar from '@components/appbars/AppBar';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Container from '@material-ui/core/Container';

interface props {
  children: JSX.Element;
  title: string;
  description: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    appbar: {},
    content: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  }),
);

export default function Index({ children, title, description }: props): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Head>
        <title id="title">{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={description} />
      </Head>

      <CssBaseline />

      <div className={classes.appbar}>
        <PrimaryAppBar />
      </div>

      <div className={classes.content}>
        <Container maxWidth="xl">{children}</Container>
      </div>
    </div>
  );
}
