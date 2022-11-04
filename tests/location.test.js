/* eslint-disable import/extensions */
import axios from "axios";

import reducer, {
  setCurrentLocation,
  setUserDestination,
  clearDestination,
  updateCount,
} from "../src/store/locationSlice";

jest.mock("axios");

describe("locationSlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      current: [],
      userDestination: [],
      count: 1,
    };
  });

  it("RETURN INITIALSTATE", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("SET CURRENT LOCATION", () => {
    expect(
      reducer(
        initialState,
        setCurrentLocation({ latitude: 111, longitude: 222 }),
      ),
    ).toEqual({ ...initialState, current: [111, 222] });
  });

  it("SET USER DESTINATION", () => {
    expect(
      reducer(
        initialState,
        setUserDestination({ latitude: 111, longitude: 222 }),
      ),
    ).toEqual({ ...initialState, userDestination: [111, 222] });
  });

  it("CELAR DESTINATION", () => {
    expect(reducer(initialState, clearDestination())).toEqual({
      ...initialState,
      userDestination: [],
    });
  });

  it("UPDATE COUNT", () => {
    const current = {
      current: [],
      userDestination: [],
      count: 1,
    };
    expect(reducer(initialState, updateCount())).toEqual({
      ...initialState,
      count: 2,
    });
  });
});
