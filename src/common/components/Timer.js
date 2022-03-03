/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, stopPublic } from '../../store/userSlice';
import { setTimer, countDownTimer } from '../../store/timerSlice';

import COLORS from '../constants/COLORS';

const Timer = ({ sec }) => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.user);
  const { id: safacyId } = useSelector((state) => state.safacy);
  const { initial, remaining } = useSelector((state) => state.timer);

  const [second, setSecond] = useState(sec);
  const [delay, setDelay] = useState(1000);

  useEffect(async () => {
    await dispatch(countDownTimer());

    if (second === 0) {
      await dispatch(
        stopPublic({
          id,
          safacyId,
        }),
      );
      await dispatch(getUserInfo(id));
    }
  }, [second]);

  useInterval(
    () => {
      setSecond(second - 1);
    },
    second >= 1 ? delay : null,
  );

  return (
    <Text style={styles.text}>
      {Math.floor(second / 60 / 60)} :
      {Math.floor(second / 60) > 9
        ? Math.floor((second / 60) % 60)
        : `0${Math.floor((second / 60) % 60)}`}
      :{second % 60 > 9 ? second % 60 : `0${second % 60}`}
    </Text>
  );
};

const useInterval = (remainingSecFunc, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = remainingSecFunc;
  }, [remainingSecFunc]);

  useEffect(() => {
    if (delay !== null) {
      const timerId = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(timerId);
    }
  }, [delay]);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    color: COLORS.PINK,
  },
});

export default Timer;

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
};
