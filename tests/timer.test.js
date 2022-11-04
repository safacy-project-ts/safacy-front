/* eslint-disable import/extensions */
import axios from "axios";
import reducer, { setTimer, countDownTimer } from "../src/store/timerSlice";

jest.mock("axios");

describe("timerSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      initial: 0,
      remaining: 0,
    };
  });

  it("RETURN INITIALSTATE", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("SET TIMER", () => {
    const current = {
      initial: 20,
      remaining: 20,
    };
    expect(reducer(initialState, setTimer(20))).toEqual({
      initial: undefined,
      remaining: undefined,
    });
  });

  it("COUNT DOWN TIMER", () => {
    const current = {
      initial: 0,
      remaining: 0,
    };
    expect(reducer(initialState, countDownTimer())).toEqual({
      ...initialState,
      remaining: current.remaining - 1,
    });
  });
});
