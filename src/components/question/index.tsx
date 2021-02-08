import React from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles, withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { questionSVC, answerSVC } from '@services';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Answer from '@components/answer/Answer';
import validator from 'validator';

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

interface QuestionProps {
  question: Question;
  setAnswer(value: number, index: number): void;
}

function Question({ question, setAnswer }: QuestionProps): JSX.Element {
  const classes = useStyles();
  const answers: number[] = [0, 1, 2, 3, 4, 5, 6];

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(+(event.target as HTMLInputElement).value, question.id);
  };

  return (
    <div className={classes.questionWrapper}>
      <QuestionTitle>{question.title}</QuestionTitle>
      <div className={classes.answerWrapper}>
        <DisagreeText className={classes.disagreeText}>Disagree</DisagreeText>

        {answers.map((_: number, index: number) => {
          console.log('Answers rotate');
          return (
            <AnswerRadio
              checked={question.answer === index + 1}
              onChange={handleRadioChange}
              value={(index + 1).toString()}
              name="radio-button-answer"
              inputProps={{ 'aria-label': (index + 1).toString() }}
              key={index}
            />
          );
        })}

        <AgreeText className={classes.agreeText}>Agree</AgreeText>
      </div>
    </div>
  );
}

interface Question {
  id: number;
  title: string;
  a: string;
  b: string;
  direction: number;
  answer: number;
}

interface RawQuestion {
  id: number;
  title: string;
  a: string;
  b: string;
  direction: number;
}

export default function Index(): JSX.Element {
  const classes = useStyles();
  const [questions, setQuestions] = React.useState<Question[] | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [answer, setAnswer] = React.useState<string[] | undefined>(undefined);

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

  React.useEffect(() => {
    questionSVC
      .getAllQuestions()
      .then((res) => {
        console.log('Data', res.data.data);
        const temp: Question[] = [];
        res.data.data.map((value: RawQuestion) => {
          temp.push({
            id: value.id,
            title: value.title,
            a: value.a,
            b: value.b,
            direction: value.direction,
            answer: 0,
          });
        });

        setQuestions(temp);
      })
      .catch((res) => {
        console.log('error: ', res);
      });
  }, []);

  const handleAnswerChange = (value: number, questionID: number) => {
    const tempArray: Question[] = [];

    questions?.map((currentQuestion: Question) => {
      if (questionID === currentQuestion.id) {
        tempArray.push({
          id: currentQuestion.id,
          title: currentQuestion.title,
          a: currentQuestion.a,
          b: currentQuestion.b,
          direction: currentQuestion.direction,
          answer: value,
        });
      } else {
        tempArray.push(currentQuestion);
      }
    });

    setQuestions(tempArray);
  };

  const validateAnswers = (): boolean => {
    let isValid = true;

    questions?.map((value: Question) => {
      if (value.answer === 0) {
        isValid = false;
        setError('You must answer all the questions before submit.');
      }
    });

    return isValid;
  };

  return (
    <div>
      {answer ? (
        <Answer result={answer}></Answer>
      ) : (
        <div>
          <Title className={classes.title}>Discover Your Perspective</Title>
          <Description>Complete the 7 min test and get a detailed report of your lenses on the world.</Description>
          <div className={classes.form}>
            {
              <div>
                {questions &&
                  questions.map((value: Question, index: number) => {
                    return (
                      <Rectangle key={index}>
                        <Question question={value} setAnswer={handleAnswerChange} />
                      </Rectangle>
                    );
                  })}
                <Rectangle>
                  <div className={classes.emailSubmitWrapper}>
                    <QuestionTitle>Your Email</QuestionTitle>
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
                      //console.log('Answer: ', questions);
                      if (!validateAnswers()) {
                        handleClickOpen();
                      } else if (!validator.isEmail(email)) {
                        setError('invalid email address, check your email and try again.');
                        handleClickOpen();
                      } else {
                        answerSVC
                          .results({ questions: questions, email: email })
                          .then((res) => {
                            setAnswer(res.data.results);
                            console.log('Result: ', res.data.results);
                          })
                          .catch((res) => {
                            console.log('error: ', res);
                          });
                      }
                    }}
                  >
                    {'Save & Continue'}
                  </Button>
                </div>
              </div>
            }
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
