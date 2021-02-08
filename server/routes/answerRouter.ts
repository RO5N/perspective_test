import express from 'express';
import Users from '../data/user';
import Answers from '../data/answer';

function generateResult(answeredQuestions: any): string[] {
  const resultList = [
    { tag: 'E', count: 0 },
    { tag: 'I', count: 0 },
    { tag: 'S', count: 0 },
    { tag: 'N', count: 0 },
    { tag: 'T', count: 0 },
    { tag: 'F', count: 0 },
    { tag: 'J', count: 0 },
    { tag: 'P', count: 0 },
  ];

  answeredQuestions.map((question: any) => {
    if (question.direction > 0) {
      if (question.answer === 7) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.b) {
            resultList[j].count = resultList[j].count + 5;
          }
        });
      } else if (question.answer === 4) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.a) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      } else if (question.answer > 4) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.b) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      } else {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.a) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      }
    } else {
      if (question.answer === 7) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.a) {
            resultList[j].count = resultList[j].count + 5;
          }
        });
      } else if (question.answer === 4) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.a) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      } else if (question.answer > 4) {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.a) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      } else {
        resultList.map((testAnswer: any, j: any) => {
          if (testAnswer.tag === question.b) {
            resultList[j].count = resultList[j].count + 1;
          }
        });
      }
    }
  });

  var theString: string[] = [];

  for (var i = 0; i < resultList.length; ) {
    if (resultList[i].count >= resultList[i + 1].count) {
      theString.push(resultList[i].tag);
    } else {
      theString.push(resultList[i + 1].tag);
    }

    i = i + 2;
  }

  return theString;
}

export default express
  .Router()
  .get('/:email', async (req: any, res: any, _next: any) => {
    console.log('req.params.email: ', req.params.email);
    if (req.params.email) {
      try {
        const answers: any = await Answers.getAnswer(req.params.email);
        const results: any = generateResult(answers);
        return res.status(200).json({ data: results });
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      return res.status(400).json({ error: 'invalid payload' });
    }
  })
  .post('/', async (req, res) => {
    console.log('Body: ', req.body);

    var answeredQuestions = req.body.questions;

    console.log('resultsArray: ', answeredQuestions);

    if (answeredQuestions.length <= 0 && !req.body.email) {
      return res.status(400).json({ error: 'Invalide payload!' });
    } else {
      const user: any = await Users.getUser(req.body.email);

      console.log('email: ', req.body.email);
      console.log('User: ', user);

      if (user.length > 0) {
        return res.status(409).json({ error: 'You have already taken the test' });
      } else {
        Users.insertUser(req.body.email, (error, rows) => {
          if (error) {
            return res.status(400).json({ error: 'Something went wrong, user creation failed' });
          } else if (rows.affectedRows === 1) {
            let allUploaded = true;
            answeredQuestions.map((question: any) => {
              Answers.insertAnswer(question.id, question.answer, req.body.email, (error, rows) => {
                if (error) {
                  return res.status(400).json({ error: 'Something went wrong, uploading answers failed' });
                } else if (rows.affectedRows !== 1) {
                  // all good
                } else {
                  allUploaded = false;
                }
              });
            });

            if (allUploaded) {
              return res.status(200).json({ results: generateResult(answeredQuestions) });
            } else {
              return res.status(400).json({ error: 'Something went wrong while uploading the answers' });
            }
          } else {
            return res.status(400).json({ error: 'Something went wrong' });
          }
        });
      }
    }
  });
