import express from 'express';

export default express
  .Router()
  .get('/', (_, res) => {
    res.status(200).json({
      message: 'API OK',
    });
  })
  .post('/get_results', (req, res) => {
    console.log('Body: ', req.body);
    const answerList = [
      {
        pair: {
          a: 'E',
          b: 'I',
        },
        direction: 1,
        selected: 'E',
      },
      {
        pair: {
          a: 'S',
          b: 'N',
        },
        direction: -1,
        selected: 'S',
      },
      {
        pair: {
          a: 'T',
          b: 'F',
        },
        direction: 1,
        selected: 'T',
      },
      {
        pair: {
          a: 'E',
          b: 'I',
        },
        direction: -1,
        selected: 'E',
      },
      {
        pair: {
          a: 'S',
          b: 'N',
        },
        direction: 1,
        selected: 'S',
      },
      {
        pair: {
          a: 'J',
          b: 'P',
        },
        direction: 1,
        selected: 'J',
      },
      {
        pair: {
          a: 'T',
          b: 'F',
        },
        direction: -1,
        selected: 'T',
      },
      {
        pair: {
          a: 'J',
          b: 'P',
        },
        direction: -1,
        selected: 'J',
      },
      {
        pair: {
          a: 'E',
          b: 'I',
        },
        direction: -1,
        selected: 'E',
      },
      {
        pair: {
          a: 'J',
          b: 'P',
        },
        direction: 1,
        selected: 'J',
      },
    ];

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

    var resultsArray = req.body.results;

    console.log('resultsArray: ', req.body.results);

    if (resultsArray.length !== 10) {
      return res.status(400).json({ error: 'Invalide payload!' });
    } else {
      resultsArray.map((answer: any, index: any) => {
        if (answerList[index].direction > 0) {
          if (answer === 7) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.b) {
                resultList[j].count = resultList[j].count + 5;
              }
            });
          } else if (answer === 4) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.a) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          } else if (answer > 4) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.b) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          } else {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.a) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          }
        } else {
          if (answer === 7) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.a) {
                resultList[j].count = resultList[j].count + 5;
              }
            });
          } else if (answer === 4) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.a) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          } else if (answer > 4) {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.a) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          } else {
            resultList.map((testAnswer: any, j: any) => {
              if (testAnswer.tag === answerList[index].pair.b) {
                resultList[j].count = resultList[j].count + 1;
              }
            });
          }
        }
      });
    }

    var theString = '';

    for (var i = 0; i < resultList.length; ) {
      if (resultList[i].count >= resultList[i + 1].count) {
        theString = theString + resultList[i].tag;
      } else {
        theString = theString + resultList[i + 1].tag;
      }

      i = i + 2;
    }

    return res.status(200).json({ results: theString });
  });
