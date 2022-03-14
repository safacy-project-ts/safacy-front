import axios from "axios";
import reducer, { clearCurrentSafacy } from "../src/store/safacySlice";

jest.mock("axios");

describe("safacySlice", () => {
  let initialState;
  beforeEach(() => {
    initialState = {
      id: "",
      user: "",
      destination: [],
      radius: "",
      time: "",
      invitedFriendList: [],
      safacyBotMsg: [],
      originLocation: [],
      desLocation: [],
      userDestination: [],
    };
  });

  it("RETURN INITIALSTATE", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("CLEAR CURRENT SAFACY", () => {
    expect(reducer(initialState, clearCurrentSafacy())).toEqual(initialState);
  });
});
