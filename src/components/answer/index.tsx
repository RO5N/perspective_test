import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Answer from '@components/answer/Answer';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { answerSVC } from '@services';
import validator from 'validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Rectangle = styled.div`
  width: 740px;
  height: 155px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Title = styled.h2`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #495057;
`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },

    emailSubmitWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    answerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    emailTextField: {
      width: 570,
      height: 48,
    },

    submitButtonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    submitButton: {
      width: 155,
      height: 36,
      backgroundColor: '#3d59fa',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#2a3eaf',
      },
      marginTop: 64,
    },
  }),
);

export default function Index(): JSX.Element {
  const classes = useStyles();
  const [email, setEmail] = React.useState('');
  const [results, setResults] = React.useState<string[] | undefined>(undefined);
  const [error, setError] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeText = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === 'email') {
      setEmail(event.target.value);
    }
  };

  return (
    <div className={classes.root}>
      {results ? (
        <div>
          <Answer result={results} />
          <div className={classes.submitButtonWrapper}>
            <Button
              className={classes.submitButton}
              onClick={() => {
                window.location.reload();
              }}
            >
              {'Check another'}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Rectangle>
            <div className={classes.emailSubmitWrapper}>
              <Title>Your Email</Title>
              <div className={classes.answerWrapper}>
                <TextField
                  id="outlined-basic"
                  placeholder="you@example.com"
                  variant="outlined"
                  className={classes.emailTextField}
                  value={email}
                  onChange={handleChangeText('email')}
                />
              </div>
            </div>
          </Rectangle>
          <div className={classes.submitButtonWrapper}>
            <Button
              className={classes.submitButton}
              onClick={() => {
                if (validator.isEmail(email)) {
                  answerSVC
                    .getAnswersByEmail(email)
                    .then((res) => {
                      console.log('res.data: ', res.data.data);
                      setResults(res.data.data);
                    })
                    .catch((error) => {
                      setError(error);
                      handleClickOpen();
                    });
                } else {
                  setError('Invalid email');
                  handleClickOpen();
                }
              }}
            >
              {'Check result'}
            </Button>
          </div>
        </div>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Warning!'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
