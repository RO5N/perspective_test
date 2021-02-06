import React from 'react';
import styled from 'styled-components';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const Border = styled.div`
  width: 1179px;
  height: 270px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 26px;
  line-height: 30px;
  color: #113264;
`;

const Description = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #343a40;
`;

const Status = styled.div`
  width: 218.33px;
  height: 14.46px;
  background: #e9ecef;
  border-radius: 3px;
`;

const StatusEnabledLeft = styled.div`
  width: 110px;
  height: 14.46px;
  background: #a920cb;
  border-radius: 3px 0px 0px 3px;
`;

const StatusDissabledLeft = styled.div`
  width: 110px;
  height: 14.46px;
  background: #e9ecef;
  border-radius: 3px 0px 0px 3px;
`;

const StatusEnabledRight = styled.div`
  width: 110px;
  height: 14.46px;
  background: #a920cb;
  border-radius: 0px 3px 3px 0px;
`;

const StatusDissabledRight = styled.div`
  width: 110px;
  height: 14.46px;
  background: #e9ecef;
  border-radius: 0px 3px 3px 0px;
`;

const StatusText = styled.p`
  width: 145.56px;
  height: 18.32px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 146.16%;
  /* or 20px */

  color: #878787;
`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
    },

    border: {
      display: 'flex',
      flexDirection: 'row',
      //justifyContent: 'center',
      alignItems: 'center',
    },

    content: {
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    sectionLeft: {
      display: 'flex',
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: 43,
    },

    sectionRight: {
      display: 'flex',
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: 43,
    },

    status: {
      display: 'flex',
      flexDirection: 'row',
    },

    statusTextLeft: {
      marginRight: 18,
    },

    statusTextRight: {
      marginLeft: 18,
    },
  }),
);

interface progressBarProps {
  enable: string;
}

function ProgressBar({ enable }: progressBarProps): JSX.Element {
  const classes = useStyles();

  if (enable === 'right') {
    return (
      <Status className={classes.status}>
        <StatusDissabledLeft />
        <StatusEnabledRight />
      </Status>
    );
  } else if (enable === 'left') {
    return (
      <Status className={classes.status}>
        <StatusEnabledLeft />
        <StatusDissabledRight />
      </Status>
    );
  }

  return <Status></Status>;
}

export default function Index(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Border className={classes.border}>
        <div className={classes.content}>
          <div className={classes.sectionLeft}>
            <Title>Your Perspective</Title>
            <Description>Your Perspective Type is ENTJ</Description>
          </div>

          <div className={classes.sectionRight}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <StatusText className={classes.statusTextLeft}>Introversion (I)</StatusText>
              <ProgressBar enable={'left'}></ProgressBar>
              <StatusText className={classes.statusTextRight}>Extraversion (E)</StatusText>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <StatusText className={classes.statusTextLeft}>Sensing (S)</StatusText>
              <ProgressBar enable={'left'}></ProgressBar>
              <StatusText className={classes.statusTextRight}>Intuition (N)</StatusText>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <StatusText className={classes.statusTextLeft}>Thinking (T)</StatusText>
              <ProgressBar enable={'right'}></ProgressBar>
              <StatusText className={classes.statusTextRight}>Feeling (F)</StatusText>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <StatusText className={classes.statusTextLeft}>Judging (J)</StatusText>
              <ProgressBar enable={'left'}></ProgressBar>
              <StatusText className={classes.statusTextRight}>Perceiving (P)</StatusText>
            </div>
          </div>
        </div>
      </Border>
    </div>
  );
}
