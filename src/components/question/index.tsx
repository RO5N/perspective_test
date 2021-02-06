import React from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Rectangle = styled.div`
  width: 740px;
  height: 155px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #113264;
`;

const Description = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #495057;
`;

const QuestionTitle = styled.h2`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #495057;
`;

const DisagreeText = styled.h2`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  text-align: right;
  color: #fa4344;
`;

const AgreeText = styled.h2`
  font-family: 'Nunito';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #00a079;
`;

const AnswerRadio = withStyles({
  root: {
    color: '##AAAAAA',
    '&$checked': {
      color: '#727272',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 48,
    },

    title: {
      marginBottom: 18,
    },

    questionWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 27,
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

    agreeText: {
      marginLeft: 24,
    },

    disagreeText: {
      marginRight: 24,
    },

    emailTextField: {
      width: 570,
      height: 48,
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

    submitButtonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
  }),
);

function Question(): JSX.Element {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={classes.questionWrapper}>
      <QuestionTitle>You consider yourself more practical than creative.</QuestionTitle>
      <div className={classes.answerWrapper}>
        <DisagreeText className={classes.disagreeText}>Disagree</DisagreeText>
        <AnswerRadio
          checked={value === 'a'}
          onChange={handleRadioChange}
          value="a"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'A' }}
        />
        <AnswerRadio
          checked={value === 'b'}
          onChange={handleRadioChange}
          value="b"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <AnswerRadio
          checked={value === 'c'}
          onChange={handleRadioChange}
          value="c"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <AnswerRadio
          checked={value === 'd'}
          onChange={handleRadioChange}
          value="d"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <AnswerRadio
          checked={value === 'e'}
          onChange={handleRadioChange}
          value="e"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <AnswerRadio
          checked={value === 'f'}
          onChange={handleRadioChange}
          value="f"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />
        <AnswerRadio
          checked={value === 'g'}
          onChange={handleRadioChange}
          value="g"
          name="radio-button-demo"
          inputProps={{ 'aria-label': 'B' }}
        />

        <AgreeText className={classes.agreeText}>Agree</AgreeText>
      </div>
    </div>
  );
}

export default function Index(): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <Title className={classes.title}>Discover Your Perspective</Title>
      <Description>Complete the 7 min test and get a detailed report of your lenses on the world.</Description>
      <div className={classes.form}>
        <div>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <Question />
          </Rectangle>
          <Rectangle>
            <div className={classes.emailSubmitWrapper}>
              <QuestionTitle>Your Email</QuestionTitle>
              <div className={classes.answerWrapper}>
                <TextField
                  id="outlined-basic"
                  placeholder="you@example.com"
                  variant="outlined"
                  className={classes.emailTextField}
                />
              </div>
            </div>
          </Rectangle>
          <div className={classes.submitButtonWrapper}>
            <Button className={classes.submitButton}> {'Save & Continue'} </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
