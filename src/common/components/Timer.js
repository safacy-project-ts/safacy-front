/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text, StyleSheet } from "react-native";

import PropTypes from "prop-types";

import COLORS from "../constants/COLORS";
import FONTS from "../constants/FONT";

const Timer = ({ sec, setIsStopped }) => {
  const dispatch = useDispatch();

  const { initial, remaining } = useSelector((state) => state.timer);
  const [second, setSecond] = useState(sec);
  const [delay, setDelay] = useState(1000);

  useEffect(async () => {
    if (second === 0 && typeof setIsStopped === "function") {
      await setIsStopped(true);
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
export default Timer;

Timer.propTypes = {
  sec: PropTypes.number.isRequired,
  setIsStopped: PropTypes.func,
};

const styles = StyleSheet.create({
  text: {
    fontSize: FONTS.M,
    fontFamily: FONTS.BOLD_FONT,
    color: COLORS.PINK,
  },
});
